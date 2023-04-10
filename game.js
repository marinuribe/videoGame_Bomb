const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#rigth');
let canvasZise;
let elementsZise;
let level = 0

const playerPosition = {
  x: undefined,
  y: undefined
};

const giftPosition = {
  x: undefined,
  y: undefined
};
const enemyesPositions = []

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
  startGame();
}

function startGame() {
  enemyesPositions.splice(0, enemyesPositions.length); // Helps to clean the array enemys each movement
  
  game.font = elementsZise * 0.82 + 'px Arial';
  game.textAlign = 'right';

  const map = maps[level];
  if (!map) {
    finishGame()
    return
  }
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map((row) => row.trim().split(''));
  /* console.log(mapRowCols); */
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
        
      }else if (col == 'X') {
        enemyesPositions.push({
          x: xPosition,
          y: yPosition
        })
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
  alert('Ganaste, fin del juego')
}

function movePlayer() {
  const giftColisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftColisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftColision = giftColisionX && giftColisionY;
  
  
    if (giftColision) {
        playerWin()
    }
    const enemyCollision = enemyesPositions.find(enemy =>{
     const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
     const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
     return enemyCollisionX && enemyCollisionY
    })
    if (enemyCollision) {
        console.log('tas muerto');
    }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function playerWin() {
  console.log('Pasaste de nivel');
  level++
  startGame()
}
function moveDown() {
  if (playerPosition.y + elementsZise > canvasZise) {
  } else {
    playerPosition.y += elementsZise;
    startGame();
    
  }
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
