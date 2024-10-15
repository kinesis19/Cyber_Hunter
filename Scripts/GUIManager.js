GLOBAL.MAX_LENGTH_PB_FRONT = 27.5;

GLOBAL.guiBoardStage = GUI.getObject("GUI_Board_Round");
GLOBAL.guiBoardEnemyCnt = GUI.getObject("GUI_Board_EnemyCnt");
GLOBAL.guiProgressBarBack = GUI.getObject("GUI_Progress_Bar_Back");
GLOBAL.guiProgressBarFront = GUI.getObject("GUI_Progress_Bar_Front");

const playerStatus = {
    hp: 0,
    sp: 0,
    level: 0,
    exp: 0,
    maxExp: 0,
    money: 0
};

// REDBRICK.Signal.addListener("CHECK_GUI_ROUND", function(params) {
//     if(params.round == 1){
//         GLOBAL.guiBoardStage.setText("Round : 1");
//     }else if(params.round == 2){
//         GLOBAL.guiBoardStage.setText("Round : 2");
//     }else if(params.round == 3){
//         GLOBAL.guiBoardStage.setText("Round : 3");
//     }
// })

// REDBRICK.Signal.addListener("CHECK_GUI_ENEMYCNT", function(params) {
//     GLOBAL.guiBoardEnemyCnt.setText("Enemy : " + GLOBAL.enemyNowCount + " / " + GLOBAL.enemyMaxCount);
// })


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
    // UpdateProgressBar();
})


// function UpdateProgressBar(){
//     GLOBAL.guiProgressBarFront.size.x.value = playerStatus.exp / playerStatus.maxExp * MAX_LENGTH_PB_FRONT;
//     GLOBAL.guiProgressBarBack.setText(playerStatus.exp + "\n" + playerStatus.maxExp);
// }