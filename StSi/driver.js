'use strict';

let gameSpeed = 1;
let bonusSpeed = 1;

let curTime = new Date();
let gameTicksLeft = 0;
let sudoStop = false;
let saveTimer = 2000;
let ticksPerSecond = 20;
let totalTime = 0;
let ticksForSeconds = 0;

function tick() {
    if(sudoStop) {
        return;
    }
    let newTime = new Date();
    totalTime += newTime - curTime;
    gameTicksLeft += newTime - curTime;
    saveTimer -= newTime - curTime;
    curTime = newTime;

    if(saveTimer < 0) {
        save();
    }
    // document.getElementById("saveTimer").innerHTML = round(saveTimer/1000);

    let didSomething = false; //for performance

    while (gameTicksLeft > (1000 / ticksPerSecond)) {
        if(stop) {
            gameTicksLeft = 0;
            view.updating.update();
            break;
        }

        ticksForSeconds++;
        if(ticksForSeconds % ticksPerSecond === 0) {
            secondPassed();
        }
        tickPassed();


        didSomething = true;
        if(gameTicksLeft > 2000) {
            window.fps /= 2;
            console.warn('too fast! (${gameTicksLeft})');
            gameTicksLeft = 0;
            stop = true;
        }
        gameTicksLeft -= (1000 / ticksPerSecond) / gameSpeed / bonusSpeed;

    }
    if(didSomething) {
        view.updating.update();
    }
}

function tickPassed() {
    gameTick();
}

function secondPassed() {
    //secondTick();
}

function recalcInterval(fps) {
    window.fps = fps;
    if(window.mainTickLoop !== undefined) {
        clearInterval(window.mainTickLoop);
    }
    if(isFileSystem) {
        window.mainTickLoop = setInterval(tick, 1000/fps);
    } else {
        doWork.postMessage({stop: true});
        doWork.postMessage({start: true, ms: (1000 / fps)});
    }
}