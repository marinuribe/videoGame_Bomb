const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);



function startGame() {

    let canvasZise 
    if (window.innerHeight > window.innerWidth) {
        canvasZise = window.innerWidth*0.8;     
    } else {
        canvasZise = window.innerHeight*0.8;
    }
    canvas.setAttribute('width', canvasZise);
    canvas.setAttribute('height', canvasZise);

    const elementsZise = canvasZise / 10;
    game.font = elementsZise + 'px Verdana'

    game.fillText(emojis['X'], 100, 100);
   
  
}
