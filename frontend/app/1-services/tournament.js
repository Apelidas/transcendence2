


async function createTournament(isPong, participants){
    try{
        const response = await fetchWithToken(tournamentEndpoint, 'POST', {}, {
            'isPong': isPong,
            'participants': participants
        })
        if (response.status === 200){
            json = await response.json();
            if (verifyId(json)){
                setCookie('tournamentId', json.id, 1000000);
                return json.id;
            }
        }
        if (response.status === 403)
            return true;
        alert('tournament could not be saved to backend' + response.error);
    }catch(exception){
    }
    return false;
}

function verifyId(json){
    return json.hasOwnProperty('id') && typeof json.id === 'number'
}

async function finishTournament(id, winner){
    if (id === undefined){
        return null;
    }
    const response = await fetchWithToken(tournamentEndpoint, 'PUT', {}, {
        'id': id,
        'winner': winner
    })
    return response;
}