class Enemy{
    constructor(object, player, hp, dmg, dropExp){
        this.object = object;
        this.player = player;
        
        // Enemy Health
        this.health = hp;
        // Enemy move Vector
        this.moveVector = new THREE.Vector3();
        // Enemy move speed
        this.speed = 0.02;
        // Define the radius for collision
        this.radius = 1; // Setting the radius of Enemy

        this.damage = dmg;
        
        this.dropExp = dropExp;
    }
    update(dt, enemyList) {
        const direction = new THREE.Vector3().subVectors(this.player.position, this.object.position);
        direction.y = 0;

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

            // Enemy lookAt Player, But position Y is staying current position
            const lookAtPosition = new THREE.Vector3(this.player.position.x, this.object.position.y, this.player.position.z);
            this.object.lookAt(lookAtPosition);
        }
    }

    dispose() {
        WORLD.remove(this.object);
    }
}

GLOBAL.enemyList = [];

function Start(){
    REDBRICK.Signal.addListener("CHECK_ENEMY_HIT", function(params) {
        for(let i = 0; i < GLOBAL.enemyList.length; i++){
            const dist = GLOBAL.enemyList[i].object.position.distanceTo(params.bullet.object.position);
            
            if(dist < 5){
                params.bullet.life = 0;
                GLOBAL.enemyList[i].health -= GLOBAL.player.atk;
            }
            
            // Enemy Kill Processing
            if(GLOBAL.enemyList[i].health <= 0){ 
                GLOBAL.playerKillCount = GLOBAL.playerKillCount + 1;
                GLOBAL.player.addExp(GLOBAL.enemyList[i].dropExp);
                
                REDBRICK.Signal.send("UPDATE_NEXT_ROUND");

                GLOBAL.enemyList[i].dispose();
                GLOBAL.enemyList.splice(i, 1);
                i--;
            }
        }
    })
    
    setInterval(() => {

        // Temp Debugging: Loop Respawn -> Need to changing Object pooling
        spawnEnemyRandomly();
        // if (GLOBAL.playerKillCount < GLOBAL.enemyMaxCount) {
        //     spawnEnemyRandomly();
        // }
    }, GLOBAL.mobSpawnSpeed);
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

    const enemy = new Enemy(clone, PLAYER, 10, 5, 1);
    GLOBAL.enemyList.push(enemy);
}