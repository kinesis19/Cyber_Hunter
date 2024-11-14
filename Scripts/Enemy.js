class Enemy{
    constructor(object, player, hp, num, dmg, dropExp){
        this.object = object;
        this.player = player;
        
        // Enemy Health
        this.health = hp;
        this.num = num;
        // Enemy move Vector
        this.moveVector = new THREE.Vector3();
        // Enemy move speed
        this.speed = 0.02;
        // Define the radius for collision
        this.radius = 1; // Setting the radius of Enemy

        this.damage = dmg;
        
        this.dropExp = dropExp;

        this.is_alive = true;

        this.mixer = new THREE.AnimationMixer(this.object);
        this.action = this.mixer.clipAction(this.object.animations[1]);
        this.death_action = this.mixer.clipAction(this.object.animations[0]);
        this.attack_action = this.mixer.clipAction(this.object.animations[3]);
        this.action.play();
    }
    update(dt, enemyList) {
        if (GLOBAL.isPaused) return;  // 게임이 일시 정지 상태이면 동작 중지

        const direction = new THREE.Vector3().subVectors(this.player.position, this.object.position);
        direction.y = 0;

        // 애니메이션 재생 업데이트
        if(this.mixer){this.mixer.update(dt);} 

        if (this.is_alive) {
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
    }

    // dispose() {
    //     WORLD.remove(this.object);
    // }
    dispose() {
        this.is_alive = false;
        this.action.stop();
        this.death_action.play();

        // 1초 후 splice 실행
        setTimeout(() => {
            this.death_action.stop();
            list_splice(this.num);
        }, 1000); // 1초 지연
    }
}

function list_splice(num) {
    console.log(2);
    GLOBAL.enemyList.forEach((enemy, index) => {
        if (enemy.num === num) {
            WORLD.remove(enemy.object);
            GLOBAL.enemyList.splice(index, 1);
            return;
        }
    })
}


GLOBAL.enemyList = [];
let spawnInterval = null; // Save spawn Interval ID
let listenersInitialized = false; // Check listener is Initialized
GLOBAL.isPaused = false;  // 게임 일시 정지 여부를 확인하는 변수
GLOBAL.enemyHp = 10;
let spawn_num = 0;

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
            
            if (GLOBAL.enemyList[i].health <= 0 && GLOBAL.enemyList[i].is_alive) {
                GLOBAL.enemyList[i].is_alive = false;

                // 공격 애니메이션 실행 중이면 정지
                if (GLOBAL.enemyList[i].attack_action) {
                    GLOBAL.enemyList[i].attack_action.stop();
                }

                GLOBAL.playerKillCount += 1;
                GLOBAL.player.addExp(GLOBAL.enemyList[i].dropExp);
                GLOBAL.enemyList[i].action.stop();
                GLOBAL.enemyList[i].death_action.play();
                GLOBAL.sfxEnemyDie.play();
                GLOBAL.enemyList[i].dispose();
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


const enemyObject = WORLD.getObject("robot");

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
    // const clone = THREEADDON.SkeletonUtils.clone(enemyObject);
    enemyObject.animations.forEach((item) => {
        clone.animations.push(item);
    }) 
    clone.position.set(x, y, z);
    WORLD.add(clone);

    // const enemy = new Enemy(clone, PLAYER, GLOBAL.enemyHp, 5, 1);
    // GLOBAL.enemyList.push(enemy);
    const enemy = new Enemy(clone, PLAYER, GLOBAL.enemyHp, spawn_num, 5, 1);
    GLOBAL.enemyList.push(enemy);
    spawn_num++;
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