let showProfile = document.querySelector('#actual-profile')

function getProfile() {
    firebase.database().ref("/profile").on('value', (snapshot) => {
        let data = snapshot.val()
        console.log(data)
        for (key in data) {
            if (key == localStorage.getItem("email").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, "")) {
                showProfile.innerHTML = `
                
    <h5 class="card-title">${data[key].name}</h5>
    <h6 class="card-subtitle mb-2 "> Age: ${data[key].age}</h6>
    <h6 class="card-subtitle mb-2 ">School: ${data[key].school}</h6>
        <h6 class="card-subtitle mb-2 ">Interests: ${data[key].interests}</h6>
    <h6 class="card-subtitle mb-2 ">${data[key].email}</h6>
                 `
            }
        }
    })
}

window.onload = getProfile()
