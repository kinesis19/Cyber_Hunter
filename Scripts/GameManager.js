GLOBAL.gameRound = 1;
GLOBAL.isRoundClear = true;
GLOBAL.mobSpawnSpeed = 3000;

REDBRICK.Signal.addListener("CHECK_NEXT_ROUND", function(params) {
    let gameRoundMax = 3;
    if(GLOBAL.gameRound < gameRoundMax){
        GLOBAL.gameRound = GLOBAL.gameRound + 1;
        RoundResetting();
    }else if(GLOBAL.gameRoundMax == 3){
        console.log("Success!");
    }
})
// 게임 최초 실행 처리
function Start(){
    // 최초 GUI Update
    REDBRICK.Signal.send("CHECK_GUI_ROUND", {round: 1});
    REDBRICK.Signal.send("CHECK_GUI_ENEMYCNT");

}

function RoundResetting(){
    GLOBAL.enemyNowCount = 0;
    if(GLOBAL.gameRound == 1){
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.mobSpawnSpeed = 3000;
        REDBRICK.Signal.send("CHECK_GUI_ROUND", {round: 1});
    }else if(GLOBAL.gameRound == 2){
        GLOBAL.enemyMaxCount = 15;
        GLOBAL.mobSpawnSpeed = 2000;
        REDBRICK.Signal.send("CHECK_GUI_ROUND", {round: 2});
    }else if(GLOBAL.gameRound == 3){
        GLOBAL.enemyMaxCount = 20;
        GLOBAL.mobSpawnSpeed = 1000;
        REDBRICK.Signal.send("CHECK_GUI_ROUND", {round: 3});
    }
    GLOBAL.isRoundClear = true;
}

