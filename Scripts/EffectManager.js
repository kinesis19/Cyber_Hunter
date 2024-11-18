const camera = WORLD.getObject("MainCamera");

let hitImgsEnemy = [];
let dieImgsEnemy = [];
let hitImgsPlayer = [];


function Start() {
    for (let i = 1; i <= 12; i++) {
        hitImgsEnemy.push(GUI.getObject("GUI_Hit_Enemy_" + i));
    }

    for (let i = 1; i <= 15; i++) {
        dieImgsEnemy.push(GUI.getObject("GUI_Die_Enemy_" + i));
    }

    for (let i = 1; i <= 10; i++) {
        hitImgsPlayer.push(GUI.getObject("GUI_Hit_Player_" + i));
    }

    // 시작하고 안 보이게 설정
    hitImgsEnemy.forEach((img) => {
        img.hide();
    });

    dieImgsEnemy.forEach((img) => {
        img.hide();
    });

    hitImgsPlayer.forEach((img) => {
        img.hide();
    });

}

function ShowEffectHitEnemy(pos, size, durationTime) {

    // 이펙터 이미지 위치와 사이즈 조정.
    hitImgsEnemy.forEach((img) => {
        img.size.x.value = size;
    });

    let num = 0;
    // 짧은 시간동안 돌면서 보여줄 이미지를 변경함.
    let startCountHitEnemy = setInterval(() => {

        // 화면 좌표로 변환
        const screenPosition = pos.clone().project(camera);
        if (num >= hitImgsEnemy.length) {
            hitImgsEnemy[num - 1].hide();
            clearInterval(startCountHitEnemy);
        }

        if (num !== 0) hitImgsEnemy[num - 1].hide();
        if (hitImgsEnemy[num]) hitImgsEnemy[num].show();
        hitImgsEnemy[num].offset.x.value = (screenPosition.x * 0.5) * window.innerWidth;
        hitImgsEnemy[num].offset.y.value = (screenPosition.y * 0.5) * window.innerHeight;
        num++;
    }, durationTime);
}

function ShowEffectDieEnemy(pos, size, durationTime) {
    
    // 이펙터 이미지 위치와 사이즈 조정.
    dieImgsEnemy.forEach((img) => {
        img.size.x.value = size;
    });

    let num = 0;
    // 짧은 시간동안 돌면서 보여줄 이미지를 변경함.
    let startCountDieEnemy = setInterval(() => {

        // 화면 좌표로 변환
        const screenPosition = pos.clone().project(camera);
        if (num >= dieImgsEnemy.length) {
            dieImgsEnemy[num - 1].hide();
            clearInterval(startCountHitEnemy);
        }

        if (num !== 0) dieImgsEnemy[num - 1].hide();
        if (dieImgsEnemy[num]) dieImgsEnemy[num].show();
        dieImgsEnemy[num].offset.x.value = (screenPosition.x * 0.5) * window.innerWidth;
        dieImgsEnemy[num].offset.y.value = (screenPosition.y * 0.5) * window.innerHeight;
        num++;
    }, durationTime);
}


function ShowEffectHitPlayer(pos, size, durationTime) {
    
    // 이펙터 이미지 위치와 사이즈 조정.
    hitImgsPlayer.forEach((img) => {
        img.size.x.value = size;
    });

    let num = 0;
    // 짧은 시간동안 돌면서 보여줄 이미지를 변경함.
    let startCountDieEnemy = setInterval(() => {

        // 화면 좌표로 변환
        const screenPosition = pos.clone().project(camera);
        if (num >= hitImgsPlayer.length) {
            hitImgsPlayer[num - 1].hide();
            clearInterval(startCountHitEnemy);
        }

        if (num !== 0) hitImgsPlayer[num - 1].hide();
        if (hitImgsPlayer[num]) hitImgsPlayer[num].show();
        hitImgsPlayer[num].offset.x.value = (screenPosition.x * 0.5) * window.innerWidth;
        hitImgsPlayer[num].offset.y.value = (screenPosition.y * 0.5) * window.innerHeight;
        num++;
    }, durationTime);
}


GLOBAL.EFFECT = {};
GLOBAL.EFFECT.ShowEffectDieEnemy = ShowEffectDieEnemy;
GLOBAL.EFFECT.ShowEffectHitEnemy = ShowEffectHitEnemy;
GLOBAL.EFFECT.ShowEffectHitPlayer = ShowEffectHitPlayer;