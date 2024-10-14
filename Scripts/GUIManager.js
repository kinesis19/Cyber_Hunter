const MAX_LENGTH_PB_FRONT = 27.5;

const guiBoardStage = GUI.getObject("GUI_Board_Round");
const guiBoardEnemyCnt = GUI.getObject("GUI_Board_EnemyCnt");
const guiProgressBarBack = GUI.getObject("GUI_Progress_Bar_Back");
const guiProgressBarFront = GUI.getObject("GUI_Progress_Bar_Front");

const playerStatus = {
    hp: 0,
    sp: 0,
    level: 0,
    exp: 0,
    maxExp: 0,
    money: 0
};

REDBRICK.Signal.addListener("CHECK_GUI_ROUND", function(params) {
    if(params.round == 1){
        guiBoardStage.setText("Round : 1");
    }else if(params.round == 2){
        guiBoardStage.setText("Round : 2");
    }else if(params.round == 3){
        guiBoardStage.setText("Round : 3");
    }
})

REDBRICK.Signal.addListener("CHECK_GUI_ENEMYCNT", function(params) {
    guiBoardEnemyCnt.setText("Enemy : " + GLOBAL.enemyNowCount + " / " + GLOBAL.enemyMaxCount);
})


// Send status of player to GUIManager|
REDBRICK.Signal.addListener("CHECK_PLAYER_STATUS_REPLY", function(params) {
    playerStatus.hp = params.hp;
    playerStatus.sp = params.sp;
    playerStatus.level = params.level;
    playerStatus.exp = params.exp;
    playerStatus.maxExp = params.maxExp;
    playerStatus.money = params.money;
})

// Send status of player to GUIManager|
REDBRICK.Signal.addListener("CHECK_GUI_PROGRESSBAR", function(params) {
    UpdateProgressBar();
})


function UpdateProgressBar(){
    guiProgressBarFront.size.x.value = playerStatus.exp / playerStatus.maxExp * MAX_LENGTH_PB_FRONT;
    guiProgressBarBack.setText(playerStatus.exp + "\n" + playerStatus.maxExp);
}