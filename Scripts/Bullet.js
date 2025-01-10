class Bullet {
    constructor(player, gunObject, bulletSize, bulletTemplate) {
        this.player = player;
        this.gunObject = gunObject;
        this.bulletSize = bulletSize;
        this.bulletTemplate = bulletTemplate;

        // Mesh for the bullet
        this.object = null;
        // Velocity vector for movement
        this.velocity = null;
        // Bullet life duration
        this.life = 0.4;

        this.init();
    }

    init() {
        // "Bullet" 오브젝트를 클론하여 사용
        this.object = this.bulletTemplate.clone();

        // 총구 위치와 방향 가져오기
        const gunPosition = new THREE.Vector3();
        const gunDirection = new THREE.Vector3();

        this.gunObject.getWorldPosition(gunPosition);
        this.gunObject.getWorldDirection(gunDirection);

        // 총구 앞에 생성될 위치 설정
        const offsetDistance = 2;
        const spawnPosition = gunPosition.clone().add(gunDirection.clone().multiplyScalar(offsetDistance));
        this.object.position.copy(spawnPosition);

        // 총구의 회전을 복제하여 총알의 회전 설정
        this.object.quaternion.copy(PLAYER.quaternion);

        // 총알의 이동 방향 설정
        this.velocity = gunDirection.clone().multiplyScalar(0.5);

        // 복제된 Bullet을 WORLD에 추가
        WORLD.add(this.object);
    }

    update(dt) {
        if (!this.object || !this.velocity) return;
        // Move the bullet according to its velocity
        this.object.position.add(this.velocity);

        // Decrease bullet life over time
        this.life -= dt;

        // Remove the bullet if its life runs out
        if (this.life < 0) {
            this.object.removeFromParent();
        }
    }
}


// Bullet 관련 변수들
let bulletSize = 1;
const bullets = [];
const gunObject = WORLD.getObject("Gun");
let bulletInterval = null; // Bullet 생성 타이머
let duration = 500;

// Bullet 생성 함수
const fireProjectile = () => {
    if (GLOBAL.isPaused || !gunObject.equipped) return; // 일시 정지 상태면 총알 생성 중지

    // Bullet 생성 시 bulletTemplate 전달
    const bullet = new Bullet(PLAYER, gunObject, bulletSize, GLOBAL.bulletTemplate);
    bullets.push(bullet);
    
    // 총알이 생성될 때 소리를 강제로 다시 재생
    if (GLOBAL.sfxGunFire.isPlaying) {
        GLOBAL.sfxGunFire.stop(); // 현재 재생 중이면 중지
    }
    GLOBAL.sfxGunFire.play(); // 소리 재생
};

// Bullet 타이머 시작
function startBulletSpawn() {

    if (bulletInterval) return; // 이미 실행 중이면 중복 방지
    bulletInterval = setInterval(fireProjectile, duration);
}

// Bullet 타이머 정지
function stopBulletSpawn() {
    if (bulletInterval) {
        clearInterval(bulletInterval);
        bulletInterval = null;
    }
}

// Start 함수에서 초기화 및 타이머 시작
function Start() {

    // Lobby일 때는 미실행
    // if(GLOBAL.isLobby == true) return;
    console.log("aaaaaaa");

    // "Bullet" 템플릿 오브젝트 가져오기
    GLOBAL.bulletTemplate = WORLD.getObject("Bullet");
    if (!GLOBAL.bulletTemplate) {
        console.error("Bullet template not found in WORLD.");
        return; // bulletTemplate이 없으면 종료
    }
    // // Game Start 버튼 클릭 시, bullet 생성으로 변경
    // if (GLOBAL.isGameStart) {
    //     startBulletSpawn(); // 게임 시작 시 Bullet 생성 타이머 시작
    // } else {
    //     stopBulletSpawn(); // 총알 생성 멈춤
    // }

    REDBRICK.Signal.addListener("TOGGLE_PAUSE", () => {
        GLOBAL.isPaused = !GLOBAL.isPaused;

        if (GLOBAL.isPaused) {
            stopEnemySpawn();  // 적 생성 멈춤
            stopBulletSpawn(); // 총알 생성 멈춤
        } else {
            startEnemySpawn();  // 적 생성 재개
            startBulletSpawn(); // 총알 생성 재개
        }
    });

    
}

// 로비 상태 변화를 감지하는 리스너 추가
// REDBRICK.Signal.addListener("UPDATE_CHECK_INGAME", (state) => {
//     console.log("BBB");
//     if (state === false) {
//         startBulletSpawn(); // 로비가 아니면 스폰 시작
//     } else {
//         stopBulletSpawn();  // 로비일 경우 스폰 중지
//     }
// });

function Update(dt){
    // Lobby일 때는 미 실행
    // if(GLOBAL.isLobby == true) return;
    
    // Game Start 버튼 클릭 시, bullet 생성으로 변경
    if (GLOBAL.isGameStart) {
        startBulletSpawn(); // 게임 시작 시 Bullet 생성 타이머 시작
    } else {
        stopBulletSpawn(); // 총알 생성 멈춤
    }

    for(let i = 0; i < bullets.length; i++){
        bullets[i].update(dt);
        
        if(bullets[i].life < 0){
            bullets.splice(i, 1);
            i--;
        }else{
            REDBRICK.Signal.send("CHECK_ENEMY_HIT", {bullet: bullets[i]});
        }
    }
}

