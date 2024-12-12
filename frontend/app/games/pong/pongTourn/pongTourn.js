
document.getElementById("startTournament").addEventListener('click', () => {

    document.getElementById("pt-tournament-bracket").style.display = "grid";
    const player1 = create_player("player1Name", "player1Color");
    const player2 = create_player("player2Name", "player2Color");
    const player3 = create_player("player3Name", "player3Color");
    const player4 = create_player("player4Name", "player4Color");

    const players = [];

    if (player1) {
        if (!validateName(player1.name)) return ;
        players.push(player1);
    }
    if (player2) {
        if (!validateName(player2.name)) return ;
        players.push(player2);
    }
    if (player3) {
        if (!validateName(player3.name)) return ;
        players.push(player3);
    }
    if (player4) {
        if (!validateName(player4.name)) return ;
        players.push(player4);
    }

    if (players.length < 3) {
        alert("A tournament requires a min. of 3 players.");
        return ;
    }

    set_player_postitions(players);
    // for (i = 0; i < players.length; i++) {
    //     console.log("player" + i + " pos = " + players[i].position); // DEBUG
    // }

    changeRoute('/games/pong/pongTournPage')
    run_tournament(players); // , settings TODO
});

function create_player(name_id, color_id) {
    let player = {};
    player.name = document.getElementById(name_id).value.trim();
    if (!player.name)
        return;
    player.color = document.getElementById(color_id).value;
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}

function set_player_postitions(players) {
    let pos = 0;
    for (i = 0; i < players.length; i++) {
        for (j = 0; j < players.length; j++) {
            if (players[j].position == 0 && players[j].number > players[pos].number)
                pos = j;
        }
        players[pos].position = i + 1;
        players[pos].number = -1; // this is now obsolete
    }
}

function run_tournament(players) {
    const p1 = document.getElementById("ptPlayer1");
    const p2 = document.getElementById("ptPlayer2");
    const p3 = document.getElementById("ptPlayer3");
    const p4 = document.getElementById("ptPlayer4");
    const elements = [p1, p2, p3, p4];
    const w1 = document.getElementById("ptWinner1");
    const w2 = document.getElementById("ptWinner2");
    const winner = document.getElementById("ptWinner");

    // Initial stage
    const player1 = get_player_at_pos(players, 1);
    set_player_at_element(player1, p1);
    const player2 = get_player_at_pos(players, 2);
    set_player_at_element(player2, p2);
    document.getElementById("ptSemi1").style.display = "inline";
    const player3 = get_player_at_pos(players, 3);
    set_player_at_element(player3, p3);
    const player4 = {};
    if (players.length >= 4) {
        player4 = get_player_at_pos(players, 4);
        set_player_at_element(player4, p4);
        document.getElementById("ptSemi2").style.display = "inline";
    }

    document.getElementById("ptSemi1").addEventListener('click', () => {
        start_pong_game(player1, player2);
    });

    // DEBUG
    set_player_at_element(player2, w1);
    set_player_at_element(player3, w2);
    set_player_at_element(player2, winner);

    // TODO run_statemachine?
}

function set_player_at_element(player, element) {
    element.innerHTML = player.name;
    element.style.backgroundColor = player.color;
}

function get_player_at_pos(players, pos) {
    for (i = 0; i < players.length; i++) {
        if (players[i].position === pos)
            return players[i];
    }
}

document.getElementById("ptSemi2").addEventListener('click', () => {
    // TODO
});

document.getElementById("ptFinal").addEventListener('click', () => {
    // TODO
});
