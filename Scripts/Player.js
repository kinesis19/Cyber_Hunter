let previousPosition = null;
const controlAreaSize = 10; // Player's Area (The ground object is moved when the player crosses the area)
const moveDistance = 2; // ground Moving distance

GLOBAL.player;

class Player {
    constructor(hp = 10, sp = 10, atk = 5, level = 0, exp = 0, maxExp = 10, money = 0) {
        this.hp = hp;
        this.sp = sp;
        this.atk = atk;
        this.level = level;
        this.exp = exp;
        this.maxExp = maxExp;
        this.money = money;
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
        this.hp -= damage;
        if (this.hp < 0){
            this.hp = 0;
        }
    }

    useSkillPoints(points) {
        if (this.sp >= points) {
            this.sp -= points;
        }
    }

    levelUp(){
        this.level = this.level + 1;
    }

}



function Start() {
    // Clone the Player's position
    previousPosition = PLAYER.position.clone();

    GLOBAL.player = new Player(10, 10, 5, 0, 0, 10, 100);
}