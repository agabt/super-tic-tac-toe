const $reset = document.querySelector("#reset");

$reset.addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    $cellsArray.forEach($cell => {
        $cell.innerHTML = "";
    });

    whoseTurn = "X";
    $whoseTurn.textContent = whoseTurn;
    $whoseTurn.classList.remove("O");
    $whoseTurn.classList.add("X");

    miniCellsObjectArray.forEach(miniCellObj => {
        miniCellObj.isClicked = false;
    });

    generateMiniBoards();
    resetVariables();
    setupMiniCells();
    $singlePlayerDiv.classList.add("single-player-setted");
}

function resetVariables() {
    whoseTurn = "X";
    indexCell = 0;
    tileNumber = 0;

    miniCellsObjectArray.splice(0, miniCellsObjectArray.length);
    $miniCellsArray = document.querySelectorAll(".mini-cell");

    $board.classList.remove("ai-turn");
    $board.classList.remove("game-over");
    clearTimeout(aiTurn);
    aiTurn = null;
}