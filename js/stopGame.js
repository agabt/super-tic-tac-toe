const $stop = document.querySelector("#stop");

$stop.addEventListener("click", () => {
    $board.classList.remove("ai-turn");
    clearTimeout(aiTurn);
    aiTurn = null;

    $singlePlayerDiv.classList.remove("single-player-setted");
    $board.classList.add("game-over");
    $start.classList.remove("hidden-btn");
    $reset.classList.add("hidden-btn");

    gameStopped = true;
});