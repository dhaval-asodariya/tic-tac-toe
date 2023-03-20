let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_Text ="O"
const X_Text ="X"
let currentPlayer =X_Text
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e) {

    const id =e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        playerText.innerText = currentPlayer == X_Text ? 'O has turn' : 'X has turn'
    if(playerHasWon() !== false) {
        playerText.innerText = `${currentPlayer} has won!`
        let winning_block = playerHasWon()

        winning_block.map(box => boxes[box].style.backgroundColor = winnerIndicator)
    }
        currentPlayer = currentPlayer == X_Text ? O_Text : X_Text
        // if (spaces[0] != '' && spaces[1] != '' && spaces[2] != '' && spaces[3] != '' && spaces[4] != '' && spaces[5] != '' && spaces[6] != '' && spaces[7] != '' && spaces[8] != '' && playerHasWon() == false){
        //     playerText.innerText = 'Match is draw'
        // }
    }
}

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && spaces[b] == spaces[a] && spaces[a] == spaces[c]){
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click',restart)

function restart() { 
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    
    currentPlayer = X_Text
    playerText.innerText = 'X has turn'

}
startGame()