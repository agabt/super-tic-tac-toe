const $cellsArray = document.querySelectorAll(".cell");

function generateMiniBoards() {
    $cellsArray.forEach(($cell) => {
        const $miniBoard = document.createElement("div");
        $miniBoard.classList.add("mini-board");
        $miniBoard.classList.add("playing");

        for (let i = 0; i < 3; i++) {
            const $miniRow = document.createElement("div");
            $miniRow.classList.add("mini-row");

            for (let j = 0; j < 3; j++) {
                const $miniCell = document.createElement("div");
                $miniCell.classList.add("mini-cell");

                $miniRow.appendChild($miniCell);
            }

            $miniBoard.appendChild($miniRow);
        }

        $cell.appendChild($miniBoard);
    });
}

generateMiniBoards();