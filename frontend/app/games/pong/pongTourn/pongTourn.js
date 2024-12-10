
document.getElementById("startTournament").addEventListener('click', () => {
    const count = get_player_count();
    if (count < 3) {
        alert("A tournament requires a min. of 3 players.");
        return ;
    }
});

function get_player_count() {
    let count = 0;
    const first = document.getElementById("firstPlayerName").value.trim();
    const second = document.getElementById("secondPlayerName").value.trim();
    const third = document.getElementById("thirdPlayerName").value.trim();
    const fourth = document.getElementById("fourthPlayerName").value.trim();

    if (first && validateName(first)) count++;
    if (second && validateName(second)) count++;
    if (third && validateName(third)) count++;
    if (fourth && validateName(fourth)) count++;

    return count;
}