GLOBAL.MAX_LENGTH_PLAYER_LV_PB_FRONT = 11;
GLOBAL.MAX_LENGTH_PLAYER_HP_PB_FRONT = 11;

// InGame-Others
GLOBAL.guiBoardKill = GUI.getObject("GUI_Board_Kill");
GLOBAL.guiBtnPause = GUI.getObject("GUI_Btn_Pause");

GLOBAL.guiProgressBarPlayerHpBg = GUI.getObject("GUI_Progress_Bar_Player_Hp_Bg");
GLOBAL.guiProgressBarPlayerLvBg = GUI.getObject("GUI_Progress_Bar_Player_Lv_Bg");
GLOBAL.guiProgressBarPlayerHp = GUI.getObject("GUI_Progress_Bar_Player_Hp");
GLOBAL.guiProgressBarPlayerLv = GUI.getObject
("GUI_Progress_Bar_Player_Lv");

GLOBAL.guiBoardLobby = GUI.getObject("GUI_Board_Lobby"); 
GLOBAL.guiBtnGameStart = GUI.getObject("GUI_Btn_GameStart");
GLOBAL.guiBtnRank = GUI.getObject("GUI_Rank_Button");


// InGame-Round
GLOBAL.guiRound_1 = GUI.getObject("GUI_Round_1");
GLOBAL.guiRound_2 = GUI.getObject("GUI_Round_2");
GLOBAL.guiRound_3 = GUI.getObject("GUI_Round_3");
GLOBAL.guiRound_4 = GUI.getObject("GUI_Round_4");
GLOBAL.guiRound_5 = GUI.getObject("GUI_Round_5");
GLOBAL.guiRound_Infinite = GUI.getObject("GUI_Round_Infinite");
GLOBAL.guiBoardRoundTitle = GUI.getObject("GUI_Board_Round_Title");

GLOBAL.guiBoardStatus = GUI.getObject("GUI_Status");  

// InGame-Skill-Select
GLOBAL.guiBoardSkillSelect = GUI.getObject("GUI_Board_Skill_Select");
GLOBAL.guiBtnSkillSpeed = GUI.getObject("GUI_Btn_Skill_Speed");
GLOBAL.guiBtnSkillBullet = GUI.getObject("GUI_Btn_Skill_Bullet");
GLOBAL.guiBtnSkillHp = GUI.getObject("GUI_Btn_Skill_Hp");

// Game-Over
GLOBAL.guiBoardGameOver = GUI.getObject("GUI_Board_GameOver");
GLOBAL.guiGameOverRound = GUI.getObject("GUI_GameOver_Round");
GLOBAL.guiGameOverLevel = GUI.getObject("GUI_GameOver_Level");
GLOBAL.guiBtnGameOverHome = GUI.getObject("GUI_GameOver_Home");
GLOBAL.guiBtnGameOverReplay = GUI.getObject("GUI_GameOver_Replay");

// Game-Pause
GLOBAL.guiBoardGamePause = GUI.getObject("GUI_Board_GamePause");



// When Game Start first, Setting the All of GUIs Offset and Size -> Working Bad
REDBRICK.Signal.addListener("UPDATE_GUI_SETTING_FIRST", function(params) {
    // [Lobby]
    // GUI_Board_Lobby 
    GLOBAL.guiBoardLobby.offset.x.value = 0;
    GLOBAL.guiBoardLobby.offset.y.value = 0;
    GLOBAL.guiBoardLobby.size.x.value = 100;
    GLOBAL.guiBoardLobby.size.y.value = 100;

    GLOBAL.guiBtnGameStart.offset.x.value = 35;
    GLOBAL.guiBtnGameStart.offset.y.value = -40;
    GLOBAL.guiBtnGameStart.size.x.value = 30;
    GLOBAL.guiBtnGameStart.size.y.value = 10;


    // [InGame]
    GLOBAL.guiBoardSkillSelect.offset.x.value = 0;
    GLOBAL.guiBoardSkillSelect.offset.y.value = 0;
    GLOBAL.guiBoardSkillSelect.size.x.value = 80;
    GLOBAL.guiBoardSkillSelect.size.y.value = 80;
    
    GLOBAL.guiBtnSkillSpeed.offset.x.value = -20;
    GLOBAL.guiBtnSkillSpeed.offset.y.value = -5;
    GLOBAL.guiBtnSkillSpeed.size.x.value = 25;
    GLOBAL.guiBtnSkillSpeed.size.y.value = 50;

    GLOBAL.guiBtnSkillBullet.offset.x.value = -0;
    GLOBAL.guiBtnSkillBullet.offset.y.value = -5;
    GLOBAL.guiBtnSkillBullet.size.x.value = 25;
    GLOBAL.guiBtnSkillBullet.size.y.value = 50;
    
    GLOBAL.guiBtnSkillHp.offset.x.value = 20;
    GLOBAL.guiBtnSkillHp.offset.y.value = -5;
    GLOBAL.guiBtnSkillHp.size.x.value = 25;
    GLOBAL.guiBtnSkillHp.size.y.value = 50;

    // Bottom
    GLOBAL.guiBoardStatus.offset.x.value = 0;
    GLOBAL.guiBoardStatus.offset.y.value = -45;
    GLOBAL.guiBoardStatus.size.x.value = 30;
    GLOBAL.guiBoardStatus.size.y.value = 7; 
    
    GLOBAL.guiProgressBarPlayerHpBg.offset.x.value = -3.5;
    GLOBAL.guiProgressBarPlayerHpBg.offset.y.value = -44;
    GLOBAL.guiProgressBarPlayerHpBg.size.x.value = 11;
    GLOBAL.guiProgressBarPlayerHpBg.size.y.value = 1;
    
    GLOBAL.guiProgressBarPlayerLvBg.offset.x.value = -3.5;
    GLOBAL.guiProgressBarPlayerLvBg.offset.y.value = -47;
    GLOBAL.guiProgressBarPlayerLvBg.size.x.value = 11;
    GLOBAL.guiProgressBarPlayerLvBg.size.y.value = 1;
    
    GLOBAL.guiProgressBarPlayerHp.offset.x.value = -9;
    GLOBAL.guiProgressBarPlayerHp.offset.y.value = -44;
    GLOBAL.guiProgressBarPlayerHp.size.x.value = 11;
    GLOBAL.guiProgressBarPlayerHp.size.y.value = 1;
    
    GLOBAL.guiProgressBarPlayerLv.offset.x.value = -9;
    GLOBAL.guiProgressBarPlayerLv.offset.y.value = -47;
    GLOBAL.guiProgressBarPlayerLv.size.x.value = 11;
    GLOBAL.guiProgressBarPlayerLv.size.y.value = 1;

    // Top

    GLOBAL.guiBtnPause.offset.x.value = -46;
    GLOBAL.guiBtnPause.offset.y.value = -45;
    GLOBAL.guiBtnPause.size.x.value = 4.5;
    GLOBAL.guiBtnPause.size.y.value = 8;

    GLOBAL.guiBoardRoundTitle.offset.x.value = -5;
    GLOBAL.guiBoardRoundTitle.offset.y.value = 45;
    GLOBAL.guiBoardRoundTitle.size.x.value = 18;
    GLOBAL.guiBoardRoundTitle.size.y.value = 5;
    
    GLOBAL.guiRound_1.offset.x.value = 5;
    GLOBAL.guiRound_1.offset.y.value = 45;
    GLOBAL.guiRound_1.size.x.value = 5;
    GLOBAL.guiRound_1.size.y.value = 5;
    
    GLOBAL.guiRound_2.offset.x.value = 5;
    GLOBAL.guiRound_2.offset.y.value = 45;
    GLOBAL.guiRound_2.size.x.value = 5;
    GLOBAL.guiRound_2.size.y.value = 5;

    GLOBAL.guiRound_3.offset.x.value = 5;
    GLOBAL.guiRound_3.offset.y.value = 45;
    GLOBAL.guiRound_3.size.x.value = 5;
    GLOBAL.guiRound_3.size.y.value = 5;
    
    GLOBAL.guiRound_4.offset.x.value = 5;
    GLOBAL.guiRound_4.offset.y.value = 45;
    GLOBAL.guiRound_4.size.x.value = 5;
    GLOBAL.guiRound_4.size.y.value = 5;
    
    GLOBAL.guiRound_5.offset.x.value = 5;
    GLOBAL.guiRound_5.offset.y.value = 45;
    GLOBAL.guiRound_5.size.x.value = 5;
    GLOBAL.guiRound_5.size.y.value = 5;

    GLOBAL.guiRound_Infinite.offset.x.value = 5;
    GLOBAL.guiRound_Infinite.offset.y.value = 45;
    GLOBAL.guiRound_Infinite.size.x.value = 5;
    GLOBAL.guiRound_Infinite.size.y.value = 5;

    // Game-Over
    GLOBAL.guiBoardGameOver.offset.x.value = 0;
    GLOBAL.guiBoardGameOver.offset.y.value = 0;
    GLOBAL.guiBoardGameOver.size.x.value = 90;
    GLOBAL.guiBoardGameOver.size.y.value = 90;

    GLOBAL.guiGameOverRound.offset.x.value = -10;
    GLOBAL.guiGameOverRound.offset.y.value = 15;
    GLOBAL.guiGameOverRound.size.x.value = 20;
    GLOBAL.guiGameOverRound.size.y.value = 10;

    GLOBAL.guiGameOverLevel.offset.x.value = -10;
    GLOBAL.guiGameOverLevel.offset.y.value = 0;
    GLOBAL.guiGameOverLevel.size.x.value = 20;
    GLOBAL.guiGameOverLevel.size.y.value = 10;

    GLOBAL.guiBtnGameOverHome.offset.x.value = -5;
    GLOBAL.guiBtnGameOverHome.offset.y.value = -25;
    GLOBAL.guiBtnGameOverHome.size.x.value = 10;
    GLOBAL.guiBtnGameOverHome.size.y.value = 10;

    GLOBAL.guiBtnGameOverReplay.offset.x.value = 5;
    GLOBAL.guiBtnGameOverReplay.offset.y.value = -25;
    GLOBAL.guiBtnGameOverReplay.size.x.value = 10;
    GLOBAL.guiBtnGameOverReplay.size.y.value = 10;


    GLOBAL.guiBoardSkillSelect.hide();
    GLOBAL.guiBtnSkillSpeed.hide();
    GLOBAL.guiBtnSkillBullet.hide();
    GLOBAL.guiBtnSkillHp.hide();

    GLOBAL.guiBoardGameOver.hide();
    GLOBAL.guiGameOverRound.hide();
    GLOBAL.guiGameOverLevel.hide();
    GLOBAL.guiBtnGameOverHome.hide();
    GLOBAL.guiBtnGameOverReplay.hide();
    
    GLOBAL.guiBoardGamePause.hide();
    GLOBAL.guiBtnRank.hide();

})

function showGameOverGUIs() {
    if (GLOBAL.gameRound > 5) {
        GLOBAL.guiGameOverRound.setText("                     Infinite");
    } else {
        GLOBAL.guiGameOverRound.setText("                     " + GLOBAL.gameRound);
    }
    setTimeout(() => {
        GLOBAL.guiGameOverLevel.setText("                     " + GLOBAL.player.level);
        GLOBAL.guiBoardGameOver.show();
        GLOBAL.guiGameOverRound.show();
        GLOBAL.guiGameOverLevel.show();
        GLOBAL.guiBtnGameOverHome.show();
        GLOBAL.guiBtnGameOverReplay.show();
        GLOBAL.guiBtnRank.show();
    }, 1000); //wait 1 seconds

    // Pause Btn 클릭시의 처리
    if (!GLOBAL.isClickedPauseBtn && !GLOBAL.isGameOver) {
        GLOBAL.guiBoardGameOver.hide();
        GLOBAL.guiBtnGameOverHome.hide();
        GLOBAL.guiBtnGameOverReplay.hide();
        GLOBAL.guiBoardGamePause.show();
    } else if (GLOBAL.isClickedPauseBtn && !GLOBAL.isGameOver) {
        GLOBAL.guiBoardGameOver.hide();
        GLOBAL.guiGameOverRound.hide();
        GLOBAL.guiGameOverLevel.hide();
        GLOBAL.guiBtnGameOverHome.hide();
        GLOBAL.guiBtnGameOverReplay.hide();
        GLOBAL.guiBoardGamePause.hide();
    }
}

function showLobbyGUIs() {
    GLOBAL.guiBoardLobby.show();
    GLOBAL.guiBtnGameStart.show();
    GLOBAL.guiBtnRank.hide();
}


GLOBAL.fnShowGameOverGUIs = showGameOverGUIs;
GLOBAL.fnShowLobbyGUIs = showLobbyGUIs;