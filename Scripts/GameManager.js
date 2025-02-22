GLOBAL.gameRound = 1;
GLOBAL.isRoundClear = true;
GLOBAL.mobSpawnSpeed = 1000;

GLOBAL.playerKillCount = 0;
GLOBAL.enemyMaxCount = 10;

// Game System
GLOBAL.isLobby = true;
GLOBAL.isGameStart = false;
GLOBAL.isGameOver = false;
GLOBAL.isClickedPauseBtn = false;


let frameCount = 0;

const guiUpdate = (dt) => { 
    // GUI Update
    GLOBAL.guiBoardKill.setText("   x" + GLOBAL.playerKillCount);
    guiRoundUpdate();
    GLOBAL.guiProgressBarPlayerLv.size.x.value = GLOBAL.player.exp / GLOBAL.player.maxExp * GLOBAL.MAX_LENGTH_PLAYER_LV_PB_FRONT;
    GLOBAL.guiProgressBarPlayerHp.size.x.value = GLOBAL.player.nowHp / GLOBAL.player.maxHp * GLOBAL.MAX_LENGTH_PLAYER_HP_PB_FRONT;
}

function guiRoundUpdate(){
    GLOBAL.guiRound_1.hide();
    GLOBAL.guiRound_2.hide();
    GLOBAL.guiRound_3.hide();
    GLOBAL.guiRound_4.hide();
    GLOBAL.guiRound_5.hide();
    GLOBAL.guiRound_Infinite.hide();

    if(GLOBAL.gameRound == 1) GLOBAL.guiRound_1.show();
    else if(GLOBAL.gameRound == 2) GLOBAL.guiRound_2.show();
    else if(GLOBAL.gameRound == 3) GLOBAL.guiRound_3.show();
    else if(GLOBAL.gameRound == 4) GLOBAL.guiRound_4.show();
    else if(GLOBAL.gameRound == 5) GLOBAL.guiRound_5.show();
    else if(GLOBAL.gameRound == 6) GLOBAL.guiRound_Infinite.show();
}


const enemyUpdate = (dt) => { 
    if (GLOBAL.isPaused) return;  // 게임이 일시 정지 상태이면 업데이트 중지
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
                // enemy.dispose();
                GLOBAL.enemyList.splice(i, 1); // Enemy delete
                WORLD.remove(enemy.object);
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



const playerUpdate = (dt) => { 
    // Player Update
    GLOBAL.player.detectEnemies(GLOBAL.enemyList);


    // Player's Obj Update
    // GLOBAL.ground.position.set(PLAYER.position.x, 0, PLAYER.position.z);
    GLOBAL.ground.body.needUpdate = true;
}



function Start(){
    // When Game Start first, Setting the All of GUIs Offset and Size
    REDBRICK.Signal.send("UPDATE_GUI_SETTING_FIRST");

    // Skill onClick Process
    GLOBAL.guiBtnSkillSpeed.onClick(() => {
        REDBRICK.Signal.send("UPDATE_TOGGLE_PAUSE");
        GLOBAL.player.levelUpSpeed();
        hideSkillSelectGUI();

        let pos = new THREE.Vector2();
        pos.x = GLOBAL.guiBtnSkillSpeed.offset.x.value;
        pos.y = GLOBAL.guiBtnSkillSpeed.offset.y.value;

        GLOBAL.EFFECT.ShowEffectSkillSelect(pos, 500, 70);
    });

    GLOBAL.guiBtnSkillBullet.onClick(() => {
        REDBRICK.Signal.send("UPDATE_TOGGLE_PAUSE");
        GLOBAL.player.levelUpBullet();
        hideSkillSelectGUI();

        let pos = new THREE.Vector2();
        pos.x = GLOBAL.guiBtnSkillBullet.offset.x.value;
        pos.y = GLOBAL.guiBtnSkillBullet.offset.y.value;

        GLOBAL.EFFECT.ShowEffectSkillSelect(pos, 500, 70);
    });

    GLOBAL.guiBtnSkillHp.onClick(() => {
        REDBRICK.Signal.send("UPDATE_TOGGLE_PAUSE");
        GLOBAL.player.levelUpHp();
        GLOBAL.player.nowHp = GLOBAL.player.maxHp;
        hideSkillSelectGUI();

        let pos = new THREE.Vector2();
        pos.x = GLOBAL.guiBtnSkillHp.offset.x.value;
        pos.y = GLOBAL.guiBtnSkillHp.offset.y.value;

        GLOBAL.EFFECT.ShowEffectSkillSelect(pos, 500, 70);
    });

    GLOBAL.guiBtnPause.onClick(() => {
        REDBRICK.Signal.send("UPDATE_TOGGLE_PAUSE");

        if (!GLOBAL.isClickedPauseBtn) {
            GLOBAL.fnShowPauseGUIs();
            GLOBAL.isClickedPauseBtn = true;
        } else {
            GLOBAL.fnShowPauseGUIs();
            GLOBAL.isClickedPauseBtn = false;
        }

    });

    GLOBAL.guiBtnRank.onClick(() => {
        REDBRICK.Rank.show();
    });

    GLOBAL.guiBtnGameStart.onClick(() => {
        // REDBRICK.Signal.send("UPDATE_CHECK_INGAME", GLOBAL.isLobby);
        GLOBAL.bgmLobby.stop();
        GLOBAL.isLobby = false;
        GLOBAL.isGameStart = true;
        GLOBAL.isPaused = false;
        GLOBAL.guiBoardLobby.hide();
        GLOBAL.guiBtnGameStart.hide();
        GLOBAL.guiBtnRank.hide();
        GLOBAL.guiBoardGamePause.hide();
        GLOBAL.fnStartEnemySpawn();
        PLAYER.changePlayerSpeed(GLOBAL.player.speed);

        // [Game Data Reset]
        PLAYER.move(0, 0, 0);
        GLOBAL.fnResetPlayerState();
        GLOBAL.gameRound = 1;
        GLOBAL.isRoundClear = true;

        GLOBAL.playerKillCount = 0;
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.fnRemoveAllEnemies();

        GLOBAL.isClickedPauseBtn = false;
        GLOBAL.bulletDuration = 600; // 기본 총알 발사 간격은 1초 (시작)
        GLOBAL.enemyHp = 10;
        GLOBAL.enemyAtkDmg = 1;
        GLOBAL.mobSpawnSpeed = 1000;

        GLOBAL.player.maxHp = 10;
        GLOBAL.player.nowHp = 10;
        GLOBAL.player.sp = 10;
        GLOBAL.player.atk = 10;
        GLOBAL.player.level = 0;
        // GLOBAL.player.exp = 0;
        // GLOBAL.player.maxExp = 100;
        GLOBAL.player.money = 1;
        GLOBAL.player.speed = 1;
        GLOBAL.player.speedLv = 0;
        GLOBAL.player.bulletLv = 0;
        GLOBAL.player.hpLv = 0;
        GLOBAL.player.dist = 4;
        PLAYER.changePlayerSpeed(1);
    });

    GLOBAL.guiBtnGameOverHome.onClick(() => {
        GLOBAL.bgmInGame.stop();
        GLOBAL.bgmLobby.play();
        GLOBAL.isLobby = true;
        GLOBAL.isGameStart = false;
        GLOBAL.guiBoardGameOver.hide();
        GLOBAL.guiGameOverRound.hide();
        GLOBAL.guiGameOverLevel.hide();
        GLOBAL.guiBtnGameOverHome.hide();
        GLOBAL.guiBtnGameOverReplay.hide();
        GLOBAL.guiBtnRank.hide();
        GLOBAL.fnShowLobbyGUIs();

        
        // [Game Data Reset]
        PLAYER.move(0, 0, 0);
        GLOBAL.fnResetPlayerState();
        GLOBAL.gameRound = 1;
        GLOBAL.isRoundClear = true;

        GLOBAL.playerKillCount = 0;
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.fnRemoveAllEnemies();

        GLOBAL.isClickedPauseBtn = false;
        GLOBAL.bulletDuration = 600; // 기본 총알 발사 간격은 1초 (시작)
        GLOBAL.enemyHp = 10;
        GLOBAL.enemyAtkDmg = 1;
        GLOBAL.mobSpawnSpeed = 1000;
        
        GLOBAL.player.maxHp = 10;
        GLOBAL.player.nowHp = 10;
        GLOBAL.player.sp = 10;
        GLOBAL.player.atk = 10;
        GLOBAL.player.level = 0;
        // GLOBAL.player.exp = 0;
        // GLOBAL.player.maxExp = 100;
        GLOBAL.player.money = 1;
        GLOBAL.player.speed = 1;
        GLOBAL.player.speedLv = 0;
        GLOBAL.player.bulletLv = 0;
        GLOBAL.player.hpLv = 0;
        GLOBAL.player.dist = 4;
        PLAYER.changePlayerSpeed(1);
    });
    
    GLOBAL.guiBtnGameOverReplay.onClick(() => {
        // REDBRICK.Signal.send("UPDATE_CHECK_INGAME", GLOBAL.isLobby);

        // [Game Data Reset]
        // PLAYER.move(0, 0, 0);
        // GLOBAL.bulletDuration = 600; // 기본 총알 발사 간격은 1초 (시작)
        // GLOBAL.enemyHp = 10;
        // GLOBAL.enemyAtkDmg = 1;
        // GLOBAL.mobSpawnSpeed = 1000;

        PLAYER.position.set(0, 2, 0);
        
        if (PLAYER.body) {
            PLAYER.body.needUpdate = true;
        }

        // GLOBAL.fnResetPlayerState();
        GLOBAL.gameRound = 1;
        GLOBAL.isRoundClear = true;

        GLOBAL.playerKillCount = 0;
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.fnRemoveAllEnemies();

        GLOBAL.guiBoardGameOver.hide();
        GLOBAL.guiBtnGameOverHome.hide();
        GLOBAL.guiBtnGameOverReplay.hide();
        GLOBAL.guiGameOverRound.hide();
        GLOBAL.guiGameOverLevel.hide();
        GLOBAL.guiBtnRank.hide();
        GLOBAL.guiBoardGamePause.hide();
        GLOBAL.isClickedPauseBtn = false;
        
        // [Game Data Reset]
        PLAYER.move(0, 0, 0);
        GLOBAL.fnResetPlayerState();
        GLOBAL.gameRound = 1;
        GLOBAL.isRoundClear = true;

        GLOBAL.playerKillCount = 0;
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.fnRemoveAllEnemies();

        GLOBAL.isClickedPauseBtn = false;
        GLOBAL.bulletDuration = 600; // 기본 총알 발사 간격은 1초 (시작)
        GLOBAL.enemyHp = 10;
        GLOBAL.enemyAtkDmg = 1;
        GLOBAL.mobSpawnSpeed = 1000;
        
        GLOBAL.player.maxHp = 10;
        GLOBAL.player.nowHp = 10;
        GLOBAL.player.sp = 10;
        GLOBAL.player.atk = 10;
        GLOBAL.player.level = 0;
        // GLOBAL.player.exp = 0;
        // GLOBAL.player.maxExp = 100;
        GLOBAL.player.money = 1;
        GLOBAL.player.speed = 1;
        GLOBAL.player.speedLv = 0;
        GLOBAL.player.bulletLv = 0;
        GLOBAL.player.hpLv = 0;
        GLOBAL.player.dist = 4;
        PLAYER.changePlayerSpeed(1);


        GLOBAL.bgmLobby.stop();
        GLOBAL.isLobby = false;
        GLOBAL.isGameStart = true;
        GLOBAL.isPaused = false;
        GLOBAL.fnStartEnemySpawn();
        PLAYER.changePlayerSpeed(GLOBAL.player.speed);
    })

}

// Using the Update Method to Update GUI
function Update(dt){
    // Lobby
    // Lobby일 때는 미실행
    if(GLOBAL.isLobby == true){
        GLOBAL.fnStopEnemySpawn();
        GLOBAL.bgmLobby.play();
        GLOBAL.guiBoardKill.setText(" ");
        PLAYER.changePlayerSpeed(0);
        PLAYER.changePlayerJumpHeight(0);
        return;
    } 
    // InGame
    guiUpdate(dt);
    enemyUpdate(dt);
    playerUpdate(dt);
    GLOBAL.bgmInGame.play();
}

// Skill Select or Upgrade
REDBRICK.Signal.addListener("UPDATE_SKILL_SELECT", function(params) {
    REDBRICK.Signal.send("UPDATE_TOGGLE_PAUSE");
    GLOBAL.guiBoardSkillSelect.show();
    GLOBAL.guiBtnSkillSpeed.show();
    GLOBAL.guiBtnSkillBullet.show();
    GLOBAL.guiBtnSkillHp.show();
});

function hideSkillSelectGUI(){
    GLOBAL.guiBoardSkillSelect.hide();
    GLOBAL.guiBtnSkillSpeed.hide();
    GLOBAL.guiBtnSkillBullet.hide();
    GLOBAL.guiBtnSkillHp.hide();
}



REDBRICK.Signal.addListener("UPDATE_NEXT_ROUND", function(params) {
    frameCount = 0;
    // GLOBAL.enemyMaxCount = GLOBAL.enemyMaxCount + 5;
    
    GLOBAL.player.maxExp = GLOBAL.player.maxExp;
    if(GLOBAL.player.level < 2){
        GLOBAL.player.maxExp += 10;
        GLOBAL.enemyHp += 5;
        GLOBAL.enemyAtkDmg = 1;
        GLOBAL.mobSpawnSpeed = 1000;
    } else if(GLOBAL.player.level == 2){
        GLOBAL.player.maxExp += 10;
        GLOBAL.mobSpawnSpeed = 700;
        GLOBAL.gameRound++;
        GLOBAL.enemyHp += 10;
        GLOBAL.enemyAtkDmg = 3;
    }else if(GLOBAL.player.level == 5){
        GLOBAL.player.maxExp += 10;
        GLOBAL.mobSpawnSpeed = 500;
        GLOBAL.gameRound++;
        GLOBAL.enemyHp += 15;
        GLOBAL.enemyAtkDmg = 5;
    }else if(GLOBAL.player.level == 7){
        GLOBAL.player.maxExp += 10;
        GLOBAL.mobSpawnSpeed = 250;
        GLOBAL.gameRound++;
        GLOBAL.enemyHp += 20;
        GLOBAL.enemyAtkDmg = 6;
    }else if(GLOBAL.player.level == 10){
        GLOBAL.player.maxExp += 10;
        GLOBAL.mobSpawnSpeed = 100;
        GLOBAL.gameRound++;
        GLOBAL.enemyHp += 25;
        GLOBAL.enemyAtkDmg = 7;
    }else{ // 인피니티
        GLOBAL.player.maxExp += 100;
        GLOBAL.enemyHp += 30;
        GLOBAL.mobSpawnSpeed = 50;
        GLOBAL.enemyAtkDmg += 2;
    }
});