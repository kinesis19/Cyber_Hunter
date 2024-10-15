GLOBAL.gameRound = 1;
GLOBAL.isRoundClear = true;
GLOBAL.mobSpawnSpeed = 3000;

GLOBAL.playerKillCount = 0;
GLOBAL.enemyMaxCount = 10;

// 게임 최초 실행 처리
function Start(){

}


// New (Refactoring)
// GOAL: Making a one cycle

// Using the Update Method to Update GUI
function Update(dt){
    // GLOBAL.guiBoardEnemyCnt.setText("Enemy : " + GLOBAL.playerKillCount + " / " + GLOBAL.enemyMaxCount);
    // Need to Changing the text and show
    GLOBAL.guiBoardEnemyCnt.setText("Enemy Killed: " + GLOBAL.playerKillCount);
    GLOBAL.guiBoardStage.setText("Round : " + GLOBAL.gameRound);
    GLOBAL.guiProgressBarFront.size.x.value = GLOBAL.player.exp / GLOBAL.player.maxExp * GLOBAL.MAX_LENGTH_PB_FRONT;
    GLOBAL.guiLevel.setText("Lv." + GLOBAL.player.level + "\n\n" + "(exp: " + GLOBAL.player.exp + "/" + GLOBAL.player.maxExp + ")");
}

REDBRICK.Signal.addListener("UPDATE_NEXT_ROUND", function(params) {
    if(GLOBAL.playerKillCount == GLOBAL.enemyMaxCount){
        GLOBAL.gameRound++;
    }
})
