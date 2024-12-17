
let players = [];
let pong_finalist_1 = "";
let pong_finalist_2 = "";
let pong_winner = "";

document.getElementById("startPongTournament").addEventListener('click', () => {

    pongSettings.type = "tournament";

    players = [];
    document.getElementById("pt-tournament-bracket").style.display = "grid";
    const player1 = create_player("pongPlayer1Name", "player1Color");
    if (!player1) return ;
    const player2 = create_player("pongPlayer2Name", "player2Color");
    if (!player2) return ;
    const player3 = create_player("pongPlayer3Name", "player3Color");
    if (!player3) return ;
    const player4 = create_player("pongPlayer4Name", "player4Color", false);

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

    if (!checkForUniqueNames(players)) {
        return; // Do not proceed if names are not unique
    }

    set_player_postitions(players);
    // for (i = 0; i < players.length; i++) {
    //     console.log("player" + i + " pos = " + players[i].position); // DEBUG
    // }

    pong_finalist_1 = "";
    pong_finalist_2 = "";
    pong_winner = "";

    pongSettings.winningScore = document.getElementById('winningScoreTournament').value;

    changeRoute('/games/pong/pongBracket')
    createTournament(true, {
        'player1': player1,
        'player2': player2,
        'player3': player3,
        'player4': player4,
    })
    display_bracket(players); // , settings TODO
});

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

function display_bracket(players) {
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
    if (pong_finalist_1 === "") {
        document.getElementById("ptSemi1").style.display = "inline";
    } else {
        document.getElementById("ptSemi1").style.display = "none";
    }
    const player3 = get_player_at_pos(players, 3);
    set_player_at_element(player3, p3);
    let player4 = {};
    if (players.length >= 4) {
        player4 = get_player_at_pos(players, 4);
        set_player_at_element(player4, p4);
        if (pong_finalist_2 === "") {
            document.getElementById("ptSemi2").style.display = "inline";
        } else {
            document.getElementById("ptSemi2").style.display = "none";
        }
    }
    else {
        pong_finalist_2 = player3.name;
    }

    if (pong_finalist_1 !== "") {
        const winner1 = get_player(players, pong_finalist_1)
        set_player_at_element(winner1, w1);
    }
    if (pong_finalist_2 !== "") {
        const winner2 = get_player(players, pong_finalist_2)
        set_player_at_element(winner2, w2);
    }

    if (pong_winner === "" && (pong_finalist_1 !== "" && pong_finalist_2 !== "")) {
        document.getElementById("ptFinal").style.display = "inline";
    } else {
        document.getElementById("ptFinal").style.display = "none";
    }

    if (pong_winner !== "") {
        const champ = get_player(players, pong_winner)
        set_player_at_element(champ, winner);
    }
}

document.getElementById("pong-start-new-tournament").addEventListener("click", () => {
    // Reset variables
    players = [];
    pong_finalist_1 = "";
    pong_finalist_2 = "";
    pong_winner = "";

    // Reset tournament bracket display
    document.getElementById("pt-tournament-bracket").style.display = "none";
    document.getElementById("startPongTournament").style.display = "block";

    // Clear player inputs and bracket elements
    document.getElementById("ptPlayer1").innerHTML = "";
    document.getElementById("ptPlayer2").innerHTML = "";
    document.getElementById("ptPlayer3").innerHTML = "";
    document.getElementById("ptPlayer4").innerHTML = "";
    document.getElementById("ptWinner1").innerHTML = "";
    document.getElementById("ptWinner2").innerHTML = "";
    document.getElementById("ptWinner").innerHTML = "";

    // Hide semi-final and final buttons
    document.getElementById("ptSemi1").style.display = "none";
    document.getElementById("ptSemi2").style.display = "none";
    document.getElementById("ptFinal").style.display = "none";

    // Reset route (navigate to tournament start page)
    changeRoute("/games/pong/pongTourn");

    //alert("The Pong Tournament has been restarted!");
});


document.getElementById("ptSemi1").addEventListener('click', () => {
    pongSettings.type = "pong_semi_1";
    start_pong_game(get_player_at_pos(players, 1), get_player_at_pos(players, 2));
});

document.getElementById("ptSemi2").addEventListener('click', () => {
    pongSettings.type = "pong_semi_2";
    start_pong_game(get_player_at_pos(players, 3), get_player_at_pos(players, 4));
});

document.getElementById("ptFinal").addEventListener('click', () => {
    pongSettings.type = "pong_finals";
    const finalist_1 = get_player(players, pong_finalist_1);
    const finalist_2 = get_player(players, pong_finalist_2);
    start_pong_game(finalist_1, finalist_2);
});

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

function get_player(players, name) {
    for (i = 0; i < players.length; i++) {
        if (players[i].name === name)
            return players[i];
    }
}
