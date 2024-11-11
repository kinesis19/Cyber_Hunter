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
        this.dist = 2;

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
                    this.takeDamage(enemyList[i].damage);
                    this.lastHitTime = currentTime; // Update Time
                }
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
        this.nowHp -= damage;
        if (this.nowHp < 0){
            this.nowHp = 0;
            GLOBAL.isPaused = true;
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
    }

    levelUpSpeed() {
        this.speed = this.speed + 0.1;
        this.speedLv++;
        PLAYER.changePlayerSpeed(this.speed); // PLAYER 객체의 속도 업데이트
    }

    levelUpBullet() {
        GLOBAL.player.atk = GLOBAL.player.atk + 2;
        this.bulletLv++;
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