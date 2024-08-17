document.addEventListener('DOMContentLoaded', function () {
	const joinButton = document.getElementById('joinTournament');
	const createButton = document.getElementById('createTournament');
	const tournamentDetails = document.getElementById('tournamentDetails');
  
	joinButton.addEventListener('click', function () {
	  tournamentDetails.style.display = 'block';
	  tournamentDetails.innerHTML = '<h4>Joined Tournament</h4><p>You have joined the tournament. Get ready to compete!</p>';
	});
  
	createButton.addEventListener('click', function () {
	  tournamentDetails.style.display = 'block';
	  tournamentDetails.innerHTML = '<h4>Create Tournament</h4><p>Create a new tournament and invite your friends!</p>';
	});
  });
  