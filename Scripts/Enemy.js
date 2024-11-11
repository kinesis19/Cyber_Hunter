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
        if (GLOBAL.isPaused) return;  // 게임이 일시 정지 상태이면 동작 중지

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
let spawnInterval = null; // Save spawn Interval ID
let listenersInitialized = false; // Check listener is Initialized
GLOBAL.isPaused = false;  // 게임 일시 정지 여부를 확인하는 변수
GLOBAL.enemyHp = 10;

function Start(){
    REDBRICK.Signal.addListener("CHECK_ENEMY_HIT", function(params) {
        for(let i = 0; i < GLOBAL.enemyList.length; i++){
            const dist = GLOBAL.enemyList[i].object.position.distanceTo(params.bullet.object.position);
            
            if(dist < 5){
                // 생성될 때 소리를 강제로 다시 재생
                if (GLOBAL.sfxBulletHit.isPlaying) {
                    GLOBAL.sfxBulletHit.stop(); // 현재 재생 중이면 중지
                }
                GLOBAL.sfxBulletHit.play();
                params.bullet.life = 0;
                GLOBAL.enemyList[i].health -= GLOBAL.player.atk;
            }
            
            // Enemy Kill Processing
            if(GLOBAL.enemyList[i].health <= 0){ 
                GLOBAL.sfxEnemyDie.play();

                GLOBAL.playerKillCount = GLOBAL.playerKillCount + 1;
                GLOBAL.player.addExp(GLOBAL.enemyList[i].dropExp);
                
                // Check is meet the Next Game Round condition
                // if(GLOBAL.playerKillCount == GLOBAL.enemyMaxCount){
                //     REDBRICK.Signal.send("UPDATE_SKILL_SELECT");
                //     REDBRICK.Signal.send("UPDATE_NEXT_ROUND");
                // }
                // if(GLOBAL.player.exp >= GLOBAL.player.maxExp){
                //     GLOBAL.player.exp = 0;
                // }
                GLOBAL.enemyList[i].dispose();
                GLOBAL.enemyList.splice(i, 1);
                i--;
            }
        }
    })

    setupSignalListeners(); // Setup Signal Listeners 
    startEnemySpawn(); // Start Enemy spawn
}


function setupSignalListeners() {
    if (listenersInitialized) return;

    REDBRICK.Signal.addListener("GAME_RESTART", () => {
        stopEnemySpawn();
        resetPlayerState();
        PLAYER.changePlayerSpeed(1);
        startEnemySpawn();
    });

    listenersInitialized = true;
}

function startEnemySpawn() {
    // Lobby일 때는 미실행
    // if(GLOBAL.isLobby == true) return;

    if (spawnInterval) return;  // 이미 생성 타이머가 실행 중이면 중복 호출 방지

    spawnInterval = setInterval(() => {
        if (GLOBAL.isPaused || GLOBAL.player.hp <= 0) { // 게임이 일시 정지 상태 또는 플레이어 사망 시 적 생성 중지
            PLAYER.changePlayerSpeed(0);
            stopEnemySpawn();
            return;
        }
        spawnEnemyRandomly();
    }, GLOBAL.mobSpawnSpeed);
}

function stopEnemySpawn() {
    if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
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

    // const clone = enemyObject.clone();
    const clone = THREEADDON.SkeletonUtils.clone(enemyObject);
    clone.position.set(x, y, z);
    WORLD.add(clone);

    const enemy = new Enemy(clone, PLAYER, GLOBAL.enemyHp, 5, 1);
    GLOBAL.enemyList.push(enemy);
}

// GLOBAL.isPaused 상태에 따라 적 생성/중지를 제어하는 새로운 리스너 추가
REDBRICK.Signal.addListener("UPDATE_TOGGLE_PAUSE", () => {
    GLOBAL.isPaused = !GLOBAL.isPaused;

    if (GLOBAL.isPaused) {
        stopEnemySpawn();
        PLAYER.changePlayerSpeed(0); // PLAYER 객체의 속도 업데이트
    } else {
        startEnemySpawn();
        PLAYER.changePlayerSpeed(GLOBAL.player.speed); // PLAYER 객체의 속도 업데이트
    }
});