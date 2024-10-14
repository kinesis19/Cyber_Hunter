const guiBoardStage = GUI.getObject("GUI_Board_Round");
const guiBoardEnemyCnt = GUI.getObject("GUI_Board_EnemyCnt");
const guiProgressBarBack = GUI.getObject("GUI_Progress_Bar_Back");
const guiProgressBarFront = GUI.getObject("GUI_Progress_Bar_Front");

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

REDBRICK.Signal.addListener("CHECK_GUI_ALL", function(params) {
    guiBoardEnemyCnt.setText("Enemy : " + GLOBAL.enemyNowCount + " / " + GLOBAL.enemyMaxCount);
})