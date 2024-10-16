GLOBAL.gameRound = 1;
GLOBAL.isRoundClear = true;
GLOBAL.mobSpawnSpeed = 3000;

GLOBAL.playerKillCount = 0;
GLOBAL.enemyMaxCount = 10;


let frameCount = 0;

const guiUpdate = (dt) => { 
    // GUI Update
    GLOBAL.guiBoardEnemyCnt.setText("Kill: " + GLOBAL.playerKillCount);
    GLOBAL.guiBoardStage.setText("Round : " + GLOBAL.gameRound);
    GLOBAL.guiProgressBarFront.size.x.value = GLOBAL.player.exp / GLOBAL.player.maxExp * GLOBAL.MAX_LENGTH_PB_FRONT;
    GLOBAL.guiLevel.setText("Lv." + GLOBAL.player.level + "\n\n" + "(exp: " + GLOBAL.player.exp + "/" + GLOBAL.player.maxExp + ")");
}


const enemyUpdate = (dt) => { 

    // Enemy Update
    // Update enemies every frame
    for (let i = 0; i < GLOBAL.enemyList.length; i++) {
        GLOBAL.enemyList[i].update(dt, GLOBAL.enemyList);
    }

    // Check if enemies are out of player range every 10 frames
    if (frameCount % 10 === 0) {
        for (let i = 0; i < GLOBAL.enemyList.length; i++) {
            const enemy = GLOBAL.enemyList[i];
            const playerPos = PLAYER.position;
            const enemyPos = enemy.object.position;

            if ((enemyPos.x > playerPos.x + 60 || enemyPos.x < playerPos.x - 60) ||
                (enemyPos.z > playerPos.z + 60 || enemyPos.z < playerPos.z - 60)) {
                enemy.dispose();
                GLOBAL.enemyList.splice(i, 1); // Enemy delete
                i--; // Adjusting indexes
            }
        }
    }

    // Check Rount clear
    if (GLOBAL.playerKillCount == GLOBAL.enemyMaxCount && GLOBAL.isRoundClear) {
        GLOBAL.isRoundClear = false;
    }

    frameCount++; // Add frameCount

}



const objUpdate = (dt) => { 
    // Obj Update
    GLOBAL.ground.position.set(PLAYER.position.x, 0, PLAYER.position.z);
    GLOBAL.ground.body.needUpdate = true;
}



function Start(){

}

// Using the Update Method to Update GUI
function Update(dt){
    guiUpdate(dt);
    enemyUpdate(dt);
    objUpdate(dt);
}


REDBRICK.Signal.addListener("UPDATE_NEXT_ROUND", function(params) {
    if(GLOBAL.playerKillCount == GLOBAL.enemyMaxCount){
        GLOBAL.gameRound++;
    }
})