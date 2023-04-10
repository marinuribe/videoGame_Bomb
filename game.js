const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#rigth');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecordTime = document.querySelector('#record');
const resultSelector = document.querySelector('#result');
let canvasZise;
let elementsZise;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};
const enemyesPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

downButton.addEventListener('click', moveDown);
upButton.addEventListener('click', moveUp);
leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);
window.addEventListener('keydown', moveByKeys);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasZise = window.innerWidth * 0.9;
  } else {
    canvasZise = window.innerHeight * 0.9;
  }
  canvas.setAttribute('width', canvasZise);
  canvas.setAttribute('height', canvasZise);

  elementsZise = canvasZise / 10.15;

  // It works to rezise the display and the skul can change his position
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame();
}

function startGame() {
  enemyesPositions.splice(0, enemyesPositions.length); // Helps to clean the array enemys each movement

  game.font = elementsZise * 0.82 + 'px Arial';
  game.textAlign = 'right';

  const map = maps[level];
  if (!map) {
    finishGame();
    return;
  }

  if (!timeStart){
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)
    showRecord()
  }
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map((row) => row.trim().split(''));
  /* console.log(mapRowCols); */

  showLives();
  game.clearRect(0, 0, canvasZise, canvasZise);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const xPosition = elementsZise * (colIndex + 1);
      const yPosition = elementsZise * (rowIndex + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = xPosition;
          playerPosition.y = yPosition;
        }
      } else if (col == 'I') {
        giftPosition.x = xPosition;
        giftPosition.y = yPosition;
      } else if (col == 'X') {
        enemyesPositions.push({
          x: xPosition,
          y: yPosition,
        });
      }
      game.fillText(emoji, xPosition, yPosition);
    });

  });
  console.log(playerPosition);
  console.log(giftPosition);
  console.log(enemyesPositions);

  /* for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        game.fillText(emojis[mapRowCols[j-1][i-1]], elementsZise*i, elementsZise*j);   
    }  
  } */
  movePlayer();
}

function finishGame() {
  clearInterval(timeInterval)
  const recordTime = localStorage.getItem('record_time')
  const playerTime = (Date.now() - timeStart)/1000;
  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime)
      resultSelector.innerHTML = 'YOU BROKE THE RECORD'
    }else {
      resultSelector.innerHTML = 'You did not beat the record';
    }
  }else {
    localStorage.setItem('record_time', playerTime)
    spanRecordTime.innerHTML = 'You do not have an established record yet';
  }
  console.log({recordTime, playerTime});
}

function movePlayer() {
  const giftColisionX =
    playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftColisionY =
    playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftColision = giftColisionX && giftColisionY;

  if (giftColision) {
    playerWin();
  }
  const enemyCollision = enemyesPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });
  if (enemyCollision) {
    playerDies();
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function playerDies() {
  if (lives > 1) {
    console.log('Muerto');
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    lives--;
    startGame();
  } else {
    console.log('Game Over');
    level = 0;
    lives = 3;
    timeStart = undefined;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
  }
}
function playerWin() {
  console.log('Pasaste de nivel');
  level++;
  startGame();
}
function moveDown() {
  if (playerPosition.y + elementsZise > canvasZise) {
  } else {
    playerPosition.y += elementsZise;
    startGame();
  }
}
function showLives() {
  spanLives.innerHTML = emojis['HEART'].repeat(lives);
}
function showTime() {
  spanTime.innerHTML = (Date.now() - timeStart)/1000
}
function showRecord() {
  spanRecordTime.innerHTML = localStorage.getItem('record_time')
}
function moveUp() {
  if (playerPosition.y - elementsZise < 0) {
  } else {
    playerPosition.y -= elementsZise;
    startGame();
  }
}
function moveLeft() {
  if (playerPosition.x - elementsZise < 0.1) {
  } else {
    playerPosition.x -= elementsZise;
    startGame();
  }
}
function moveRight() {
  if (playerPosition.x + elementsZise > canvasZise) {
  } else {
    playerPosition.x += elementsZise;
    startGame();
  }
}
function moveByKeys(e) {
  if (e.key == 'ArrowUp') {
    moveUp();
  } else if (e.key == 'ArrowDown') {
    moveDown();
  } else if (e.key == 'ArrowLeft') {
    moveLeft();
  } else if (e.key == 'ArrowRight') {
    moveRight();
  }
}
