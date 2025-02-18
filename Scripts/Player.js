let previousPosition = null;
const controlAreaSize = 10; // Player's Area (The ground object is moved when the player crosses the area)
const moveDistance = 2; // ground Moving distance

GLOBAL.player;

class Player {
    constructor(maxHp = 10, nowHp = 10, sp = 10, atk = 2, level = 0, exp = 0, maxExp = 10, money = 0, speed = 1, speedLv = 0, bulletLv = 0, hpLv = 0) {
        this.maxHp = maxHp;
        this.nowHp = nowHp;
        this.sp = sp;
        this.atk = atk;
        this.level = level;
        this.exp = exp;
        this.maxExp = maxExp;
        this.money = money;
        this.speed = speed;
        this.speedLv = speedLv;
        this.bulletLv = bulletLv;
        this.hpLv = hpLv;
        this.dist = 4;

        this.MAX_MONEY = 999;


        this.lastHitTime = 0; // init: 0
        this.hitCooldown = 2000; // CoolTime: (2000ms)
    }

    detectEnemies(enemyList) {
        const currentTime = Date.now(); // 현재 시간을 밀리초로 가져옴

        for (let i = 0; i < enemyList.length; i++) {
            const enemy = enemyList[i];
            const distance = PLAYER.position.distanceTo(enemy.object.position);

            if (distance < this.dist) {
                // Check take damage Cool Time
                if (currentTime - this.lastHitTime >= this.hitCooldown) {
                    // GLOBAL.enemyList[i].stopMovement();
                    GLOBAL.enemyList[i].action.stop();
                    GLOBAL.enemyList[i].attack_action.play();

                    // issue: Enemy가 공격시에는 제자리에서 멈춰서 공격하게 하고 싶은데 딜레이 되면서 마지막에 공격이 한꺼번에 몰려서 공격함.
                    // setTimeout(() => {
                    //     this.takeDamage(enemyList[i].damage);
                    //     this.lastHitTime = currentTime; // Update Time
                    //     GLOBAL.enemyList[i].resumeMovement();
                    // }, 1000); // 1초 지연
                    // if (!GLOBAL.enemyList[i].attack_action) {
                    //     this.takeDamage(enemyList[i].damage);
                    //     this.lastHitTime = currentTime;
                    // }
                    if (this.nowHp > 0 && GLOBAL.enemyList[i].is_alive) {    
                        this.takeDamage(enemyList[i].damage);
                    }
                    this.lastHitTime = currentTime;
                }
            } else {
                GLOBAL.enemyList[i].action.play();
                GLOBAL.enemyList[i].attack_action.stop();
            }
        }
    }

    // Methods to modify player's stats
    addExp(amount) {
        this.exp += amount;
        if(this.exp >= this.maxExp){
            this.exp = this.exp - this.maxExp;
            this.levelUp();
        }
    }

    addMoney(amount) {
        if (this.money === this.MAX_MONEY){
            return;
        }else{
            this.money += amount;
        }
        if (this.money > this.MAX_MONEY){
            this.money = this.MAX_MONEY;
        } 
    }

    takeDamage(damage) {

        const worldPosition = new THREE.Vector3();
        PLAYER.getWorldPosition(worldPosition);

        GLOBAL.EFFECT.ShowEffectHitPlayer(worldPosition, 500, 60);

        this.nowHp -= damage;
        if (this.nowHp <= 0){
            this.nowHp = 0;
            GLOBAL.isPaused = true;
            GLOBAL.isGameOver = true;
            REDBRICK.Rank.saveScore({ score : GLOBAL.playerKillCount, order: "DESC" });
            GLOBAL.fnShowGameOverGUIs();
        }
    }

    useSkillPoints(points) {
        if (this.sp >= points) {
            this.sp -= points;
        }
    }

    levelUp() {
        this.level = this.level + 1;
        
        REDBRICK.Signal.send("UPDATE_SKILL_SELECT");
        REDBRICK.Signal.send("UPDATE_NEXT_ROUND");
        
        const worldPosition = new THREE.Vector3();
        PLAYER.getWorldPosition(worldPosition);

        GLOBAL.EFFECT.ShowEffectLevelUp(worldPosition, 500, 60);
    }

    levelUpSpeed() {
        this.speed = this.speed + 0.2;
        this.speedLv++;
        PLAYER.changePlayerSpeed(this.speed); // PLAYER 객체의 속도 업데이트
    }

    levelUpBullet() {
        if (GLOBAL.bulletDuration > 200 && !GLOBAL.isLobby) { // 최소 발사 속도 제한 (0.2초)
            GLOBAL.bulletDuration -= 250; // 1초 → 0.75초 → 0.5초 → 0.25초 (업그레이드마다 0.25초 단축)
        }
        this.bulletLv++;
    
        console.log("New bullet duration:", GLOBAL.bulletDuration); // 디버깅 로그
    
        // 🔥 새로운 발사 속도 적용
        if (GLOBAL.restartBulletSpawn) {
            GLOBAL.restartBulletSpawn(); // 전역 함수 호출
        } else {
            console.error("restartBulletSpawn is not defined!");
        }
    }

    levelUpHp() {
        this.maxHp = this.maxHp + 5;
        this.hpLv++;
    }

}


function Start() {
    // Clone the Player's position
    previousPosition = PLAYER.position.clone();

    GLOBAL.player = new Player(10, 10, 10, 10, 0, 0, 10, 100, 1, 0, 0, 0);
}

function resetPlayerState() {
    GLOBAL.bulletDuration = 600;
    GLOBAL.player = new Player(10, 10, 10, 10, 0, 0, 10, 100, 1, 0, 0, 0);
}

GLOBAL.fnResetPlayerState = resetPlayerState;