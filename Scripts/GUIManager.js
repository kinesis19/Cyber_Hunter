GLOBAL.MAX_LENGTH_PLAYER_LV_PB_FRONT = 11;
GLOBAL.MAX_LENGTH_PLAYER_HP_PB_FRONT = 11;

// InGame-Others
GLOBAL.guiBoardRoundTitle = GUI.getObject("GUI_Board_Round_Title");
GLOBAL.guiBoardKill = GUI.getObject("GUI_Board_Kill");
GLOBAL.guiBtnPause = GUI.getObject("GUI_Btn_Pause");
GLOBAL.guiProgressBarPlayerHp = GUI.getObject("GUI_Progress_Bar_Player_Hp");
GLOBAL.guiProgressBarPlayerLv = GUI.getObject
("GUI_Progress_Bar_Player_Lv"); 
GLOBAL.guiBoardLobby = GUI.getObject("GUI_Board_Lobby"); 
GLOBAL.guiBtnGameStart = GUI.getObject("GUI_Btn_GameStart"); 


// InGame-Round
GLOBAL.guiRound_1 = GUI.getObject("GUI_Round_1");
GLOBAL.guiRound_2 = GUI.getObject("GUI_Round_2");
GLOBAL.guiRound_3 = GUI.getObject("GUI_Round_3");
GLOBAL.guiRound_4 = GUI.getObject("GUI_Round_4");
GLOBAL.guiRound_5 = GUI.getObject("GUI_Round_5");
GLOBAL.guiRound_Infinite = GUI.getObject("GUI_Round_Infinite");

// InGame-Skill-Select
GLOBAL.guiBoardSkillSelect = GUI.getObject("GUI_Board_Skill_Select");
GLOBAL.guiBtnSkillSpeed = GUI.getObject("GUI_Btn_Skill_Speed");
GLOBAL.guiBtnSkillBullet = GUI.getObject("GUI_Btn_Skill_Bullet");
GLOBAL.guiBtnSkillHp = GUI.getObject("GUI_Btn_Skill_Hp");


// When Game Start first, Setting the All of GUIs Offset and Size -> Working Bad
REDBRICK.Signal.addListener("UPDATE_GUI_SETTING_FIRST", function(params) {
    // GLOBAL.guiBoardRoundTitle.size.x = "18%";
    // GLOBAL.guiBoardRoundTitle.size.y = "5%";

    GLOBAL.guiBoardSkillSelect.hide();
    GLOBAL.guiBtnSkillSpeed.hide();
    GLOBAL.guiBtnSkillBullet.hide();
    GLOBAL.guiBtnSkillHp.hide();
})
