const guiBoardStage = GUI.getObject("GUI_Board_Round");

REDBRICK.Signal.addListener("CHECK_GUI_ROUND", function(params) {
    if(params.round == 1){
        guiBoardStage.setText("Round : 1");
    }else if(params.round == 2){
        guiBoardStage.setText("Round : 2");
    }else if(params.round == 3){
        guiBoardStage.setText("Round : 3");
    }
})