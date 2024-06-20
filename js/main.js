let $miniCellsArray = document.querySelectorAll(".mini-cell");
const miniCellsObjectArray = [];
const $whoseTurn = document.querySelector("#whose-turn");
const $board = document.querySelector("#board");

let whoseTurn = "X";

let indexCell = 0;
let tileNumber = 0;

setupMiniCells();

function setupMiniCells() {
    $miniCellsArray.forEach($miniCell => {
        miniCellsObjectArray.push({
            $miniCell: $miniCell,
            indexCell: indexCell,
            tileNumber: tileNumber,
            isClicked: false
        });

        if (++tileNumber > 8) {
            tileNumber = 0;
            indexCell++;
        }
    });

    miniCellsObjectArray.forEach(miniCellObj => {
        miniCellObj.$miniCell.addEventListener("click", () => {
            if (!miniCellObj.isClicked) {
                addTile(miniCellObj);
            }
        });
    });
}

function addTile(miniCellObj) {
    $pTile = document.createElement("p");
    $pTile.textContent = whoseTurn;
    $pTile.classList.add("tile", whoseTurn);

    miniCellObj.$miniCell.appendChild($pTile);
    miniCellObj.isClicked = true;

    addPlayStateToMiniBoards(miniCellObj);

    whoseTurn = whoseTurn === "X" ? "O" : "X";
    $whoseTurn.textContent = whoseTurn;
    $whoseTurn.classList.toggle("X");
    $whoseTurn.classList.toggle("O");

    checkWinner(miniCellObj.indexCell);
}

function addPlayStateToMiniBoards(miniCellObj) {
    let foundEmptyMiniBoard = false;

    $cellsArray.forEach(($cell, index) => {
        if (foundEmptyMiniBoard) {
            return;
        }

        const $miniBoard = $cell.firstChild;

        $miniBoard.classList.remove("playing");
        $miniBoard.classList.add("not-playing");

        if (index === miniCellObj.tileNumber) {
            if (!$miniBoard.firstChild.hasChildNodes() || $miniBoard.classList.contains("fade-out")) {
                enableAllMiniBoards();
                foundEmptyMiniBoard = true;
                return;
            }

            $miniBoard.classList.add("playing");
            $miniBoard.classList.remove("not-playing");
        }
    });
}

function enableAllMiniBoards() {
    $cellsArray.forEach($cell => {
        const $miniBoard = $cell.firstChild;

        $miniBoard.classList.remove("not-playing");
        $miniBoard.classList.add("playing");
    });
}

function checkWinner(miniCellIndex) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
        combination = combination.map(cellIndex => cellIndex + miniCellIndex * 9);
        const [a, b, c] = combination;

        if (
            miniCellsObjectArray[a].$miniCell.textContent === miniCellsObjectArray[b].$miniCell.textContent &&
            miniCellsObjectArray[a].$miniCell.textContent === miniCellsObjectArray[c].$miniCell.textContent &&
            miniCellsObjectArray[a].$miniCell.textContent !== ""
        ) {
            winner = miniCellsObjectArray[a].$miniCell.textContent;
            replaceMiniBoardWithWinningTile(miniCellsObjectArray[a], winner);
        }
    });
}

function replaceMiniBoardWithWinningTile(miniCellObject, winner) {
    $cell = $cellsArray[miniCellObject.indexCell];
    $cell.firstChild.classList.add("fade-out");

    setTimeout(() => {
        $cell.innerHTML = "";

        $pTile = document.createElement("p");
        $pTile.textContent = winner;
        $pTile.classList.add("tile", winner, "big");

        $cell.appendChild($pTile);
        miniCellObject.isClicked = true;

        checkWinnerBigBoard();
    }, 2500);
}

function checkWinnerBigBoard() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;

        if ($cellsArray[a].firstChild.firstChild.hasChildNodes() &&
            $cellsArray[b].firstChild.firstChild.hasChildNodes() &&
            $cellsArray[c].firstChild.firstChild.hasChildNodes()) {
            return;
        }

        if (
            $cellsArray[a].textContent === $cellsArray[b].textContent &&
            $cellsArray[a].textContent === $cellsArray[c].textContent &&
            $cellsArray[a].textContent !== ""
        ) {
            $board.classList.add("game-over")
            alert(`¡${$cellsArray[a].textContent} ha ganado!`);
        }
    });
}