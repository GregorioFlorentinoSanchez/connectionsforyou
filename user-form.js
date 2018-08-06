let saveBtn = document.querySelector('#save')
console.log('pressed')

saveBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let name = document.querySelector("#name").value
    let age = document.querySelector("#age").value
    let school = document.querySelector('#school').value
    let interests = document.querySelector('#interests').value
    let email = localStorage.getItem('email')
    let id = firebase.auth().currentUser.providerData[0].email.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, "")
    
    let profile = {
        name: name,
        age: age,
        school: school,
        interests: interests,
        email: email,
    }
    console.log(id)
    // console.log(profile)
    firebase.database().ref(`/profile/${id}`).set(profile)
    document.forms['profile'].reset()

})
