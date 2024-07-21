class Enemy{
    constructor(object, player){
        this.object = object;
        this.player = player;
        
        // Enemy Health
        this.health = 100;
        // Enemy move Vector
        this.moveVector = new THREE.Vector3();
        // Enemy move speed
        this.speed = 0.02;
        // Define the radius for collision
        this.radius = 1; // 각 적의 반경을 설정.
    }
    update(dt, enemyList) {
        const direction = new THREE.Vector3().subVectors(new THREE.Vector3(this.player.position.x, this.object.position.y, this.player.position.z), this.object.position);

        if (direction.length() > 0.1) {
            direction.normalize();
            this.moveVector.copy(direction).multiplyScalar(this.speed);
            const newPosition = this.object.position.clone().add(this.moveVector);

            // Check for potential collisions before moving
            let collision = false;
            for (let other of enemyList) {
                if (other !== this && newPosition.distanceTo(other.object.position) < (this.radius + other.radius)) {
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                this.object.position.add(this.moveVector);
            }

            // 오브젝트가 플레이어를 바라보게 하되, y축은 현재 오브젝트의 높이를 유지함.
            const lookAtPosition = new THREE.Vector3(this.player.position.x, this.object.position.y, this.player.position.z);
            this.object.lookAt(lookAtPosition);
        }
    }

    dispose() {
        this.object.removeFromParent();
    }
}

const enemyList = [];
let damage = 50;
GLOBAL.enemyNowCount = 0;
GLOBAL.enemyMaxCount = 10;

function Start(){
    REDBRICK.Signal.addListener("CHECK_ENEMY_HIT", function(params) {
        for(let i = 0; i < enemyList.length; i++){
            const dist = enemyList[i].object.position.distanceTo(params.bullet.object.position);
            
            if(dist < 5){
                params.bullet.life = 0;
                enemyList[i].health -= damage;
            }
            if(enemyList[i].health <= 0){
                GLOBAL.enemyNowCount = GLOBAL.enemyNowCount + 1;
                enemyList[i].dispose();
                enemyList.splice(i, 1);
                i--;
            }
        }
    })
    
    setInterval(() => {
        if (GLOBAL.enemyNowCount < GLOBAL.enemyMaxCount) {
            spawnEnemyRandomly();
        }
    }, GLOBAL.mobSpawnSpeed);
}


function Update(dt){
    for(let i = 0; i < enemyList.length; i++){
        enemyList[i].update(dt, enemyList);
    }
    if(GLOBAL.enemyNowCount == GLOBAL.enemyMaxCount && GLOBAL.isRoundClear){
        GLOBAL.isRoundClear = false;
        REDBRICK.Signal.send("CHECK_NEXT_ROUND");
    }
    
}

const enemyObject = WORLD.getObject("Enemy");

function spawnEnemyRandomly() {
    const areas = {
        'AreaA': { xRange: [PLAYER.position.x - 20, PLAYER.position.x - 30], zRange: [PLAYER.position.z - 20, PLAYER.position.z - 30], y: 2 },
        'AreaB': { xRange: [PLAYER.position.x + 20, PLAYER.position.x + 30], zRange: [PLAYER.position.z - 20, PLAYER.position.z - 30], y: 2 },
        'AreaC': { xRange: [PLAYER.position.x - 20, PLAYER.position.x - 30], zRange: [PLAYER.position.z + 20, PLAYER.position.z + 30], y: 2 },
        'AreaD': { xRange: [PLAYER.position.x + 20, PLAYER.position.x + 30], zRange: [PLAYER.position.z + 20, PLAYER.position.z + 30], y: 2 }
    };

    // Select a random area
    const areaKeys = Object.keys(areas);
    const randomArea = areas[areaKeys[Math.floor(Math.random() * areaKeys.length)]];

    // Random position within the selected area
    const x = Math.random() * (randomArea.xRange[1] - randomArea.xRange[0]) + randomArea.xRange[0];
    const z = Math.random() * (randomArea.zRange[1] - randomArea.zRange[0]) + randomArea.zRange[0];
    const y = randomArea.y;

    const clone = enemyObject.clone();
    clone.position.set(x, y, z);
    WORLD.add(clone);

    const enemy = new Enemy(clone, PLAYER);
    enemyList.push(enemy);
}