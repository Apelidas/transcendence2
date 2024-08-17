document.addEventListener('DOMContentLoaded', function () {
	const editButton = document.getElementById('editProfile');
	const cancelButton = document.getElementById('cancelEdit');
	const editProfileSection = document.getElementById('editProfileSection');
	const profileInfo = document.querySelector('.profile-info');
	const profileForm = document.getElementById('profileForm');
  
	editButton.addEventListener('click', function () {
	  profileInfo.style.display = 'none';
	  editProfileSection.style.display = 'block';
	});
  
	cancelButton.addEventListener('click', function () {
	  editProfileSection.style.display = 'none';
	  profileInfo.style.display = 'block';
	});
  
	profileForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  // Simulate saving changes
	  const name = document.getElementById('profileName').value;
	  const email = document.getElementById('profileEmail').value;
  
	  profileInfo.innerHTML = `<h4>User Information</h4>
							   <p>Name: ${name}</p>
							   <p>Email: ${email}</p>
							   <button class="btn btn-outline-primary mt-2" id="editProfile">Edit Profile</button>`;
  
	  editProfileSection.style.display = 'none';
	  profileInfo.style.display = 'block';
	});
  });
  