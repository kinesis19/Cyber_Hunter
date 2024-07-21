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

function RoundResetting(){
    GLOBAL.enemyNowCount = 0;
    if(GLOBAL.gameRound == 1){
        GLOBAL.enemyMaxCount = 10;
        GLOBAL.mobSpawnSpeed = 3000;
    }else if(GLOBAL.gameRound == 2){
        GLOBAL.enemyMaxCount = 15;
        GLOBAL.mobSpawnSpeed = 2000;
    }else if(GLOBAL.gameRound == 3){
        GLOBAL.enemyMaxCount = 20;
        GLOBAL.mobSpawnSpeed = 1000;
    }
    GLOBAL.isRoundClear = true;
}

