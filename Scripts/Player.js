let previousPosition = null;
const ground = WORLD.getObject("Ground");
const controlAreaSize = 10; // 플레이어의 구역 (해당 구역을 넘어서면 ground 오브젝트가 이동됨).
const moveDistance = 2; // ground 오브젝트의 이동 간격.

let player;

class Player {
    constructor(hp = 10, sp = 10, level = 0, exp = 0, maxExp = 10, money = 0) {
        this.hp = hp;
        this.sp = sp;
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

    player = new Player(10, 10, 0, 0, 10, 100);
}


REDBRICK.Signal.addListener("CHECK_PLAYER_STATUS", function(params) {
    if(params.action == "addExp"){
        player.addExp(params.amount);
    }
})


// Send status of player to GUIManager|
REDBRICK.Signal.addListener("CHECK_PLAYER_STATUS_REQUEST", function(params) {
    REDBRICK.Signal.send("CHECK_PLAYER_STATUS_REPLY", {
        hp: player.hp,
        sp: player.sp,
        level: player.level,
        exp: player.exp,
        maxExp: player.maxExp,
        money: player.money 
    });
})


function Update(dt) {
    ground.position.set(PLAYER.position.x, 0, PLAYER.position.z);
    ground.body.needUpdate = true;
}


// Not using now

// function getPlayerMovementDirection() {
//     let currentPosition = PLAYER.position;
//     let directionVector = currentPosition.clone().sub(previousPosition);
//     let direction;

//     if (directionVector.length() > 0) {
//         directionVector.normalize();

//         // vector를 기반으로 방향을 결정함.
//         if (directionVector.z > 0.5 && Math.abs(directionVector.x) <= 0.5) {
//             direction = "South";
//         } else if (directionVector.z < -0.5 && Math.abs(directionVector.x) <= 0.5) {
//             direction = "North";
//         } else if (directionVector.x > 0.5 && Math.abs(directionVector.z) <= 0.5) {
//             direction = "East";
//         } else if (directionVector.x < -0.5 && Math.abs(directionVector.z) <= 0.5) {
//             direction = "West";
//         } else if (directionVector.x > 0.5 && directionVector.z > 0.5) {
//             direction = "South-East";
//         } else if (directionVector.x > 0.5 && directionVector.z < -0.5) {
//             direction = "North-East";
//         } else if (directionVector.x < -0.5 && directionVector.z > 0.5) {
//             direction = "South-West";
//         } else if (directionVector.x < -0.5 && directionVector.z < -0.5) {
//             direction = "North-West";
//         }

//         console.log("Player Movement Direction:", direction);
//         checkAndMoveGround(direction, currentPosition);
//     }

//     // previous position 업데이트.
//     previousPosition.copy(currentPosition);
// }

// function checkAndMoveGround(direction, currentPosition) {
//     // controalArea 영역을 벗어 났는지 확인하기.
//     if (Math.abs(currentPosition.x - ground.position.x) > controlAreaSize / 2 ||
//         Math.abs(currentPosition.z - ground.position.z) > controlAreaSize / 2) {
        
//         // Player가 controalArea를 벗어 났으면 ground 오브젝트를 이동하기.
//         moveGroundObject(direction);
//     }
// }

// function moveGroundObject(direction) {
//     let groundPosition = ground.position.clone();
//     groundPosition.x = 0;
//     groundPosition.z = 0;
//     switch (direction) {
//         case "North":
//             groundPosition.z = -moveDistance;
//             break;
//         case "South":
//             groundPosition.z = moveDistance;
//             break;
//         case "East":
//             groundPosition.x = moveDistance;
//             break;
//         case "West":
//             groundPosition.x = -moveDistance;
//             break;
//         case "North-East":
//             groundPosition.x += moveDistance / Math.sqrt(2);
//             groundPosition.z -= moveDistance / Math.sqrt(2);
//             break;
//         case "South-East":
//             groundPosition.x += moveDistance / Math.sqrt(2);
//             groundPosition.z += moveDistance / Math.sqrt(2);
//             break;
//         case "North-West":
//             groundPosition.x -= moveDistance / Math.sqrt(2);
//             groundPosition.z -= moveDistance / Math.sqrt(2);
//             break;
//         case "South-West":
//             groundPosition.x -= moveDistance / Math.sqrt(2);
//             groundPosition.z += moveDistance / Math.sqrt(2);
//             break;
//     }

//     console.log(`Moving ground to position: (${groundPosition.x}, ${ground.position.y}, ${groundPosition.z})`);
//     // Player의 이동 방향에 맞춰 ground 오브젝트를 이동 시키기.
//     ground.go(groundPosition.x, ground.position.y, groundPosition.z);
// }
