const boxes = document.querySelectorAll('.box');
const gameinfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [5,7,8],
    [0,3,5],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].computedStyleMap.pointerEvents ="all";
    }
    )
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) =>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            if(gameGrid[position[0]] === "X")
            {  
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // Now Winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        
    });
    if(answer !== "")
    {
        gameinfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.active("active");
        return;
    }
    
}

function swapTurn()
{
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameinfo.innerText =`Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].computedStyleMap.pointerEvents = "none";
        //swap
        swapTurn();
        //check
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);