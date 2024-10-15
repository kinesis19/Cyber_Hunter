let previousPosition = null;
const controlAreaSize = 10; // 플레이어의 구역 (해당 구역을 넘어서면 ground 오브젝트가 이동됨).
const moveDistance = 2; // ground 오브젝트의 이동 간격.

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
        this.MAX_MONEY = 999;
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
    // 플레이어의 시작 좌표를 복사함 -> 플레이어의 이동 방향을 알아내기 위함.
    previousPosition = PLAYER.position.clone();

    GLOBAL.player = new Player(10, 10, 5, 0, 0, 10, 100);
}