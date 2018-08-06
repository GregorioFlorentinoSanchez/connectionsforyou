// let signUp = document.querySelector("#sign-up")
let login = document.querySelector('#login')
let logout = document.querySelector("#logout")
let loginBtn = document.querySelector("#login-div")
let logoutBtn = document.querySelector('#logout-div')
let postsButton = document.querySelector('#postsButton1')
let postingsButton = document.querySelector('#postingsButton1')
// signUp.addEventListener('click', e => {
//     // console.log('clicked button')
//     signInWithGoogle()
// })
login.addEventListener('click', e => {
    if (localStorage.getItem('name', 'email') != null) {
        logOut()
    }
    else { 
        signInWithGoogle()
      }
})
// logout.addEventListener('click', e => {
//     // console.log('button pressed')
//     logOut()
// })

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function(data) {
            console.log(data)
            saveData(data)
            hideLogin()
        })

}


function logOut() {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('photo')
    firebase.auth().signOut()
        .then(function() {
            console.log('logged out')
            hideLogin()
        }).catch(function(error) {
            // An error happened.
        });
}

function saveData(userData) {
    //do stuff
    let userName = userData.user.displayName
    localStorage.setItem("name", userName)
    console.log(localStorage.getItem('name'))
    let userEmail = userData.user.email
    localStorage.setItem("email", userEmail)
    console.log(localStorage.getItem('email'))

}

function hideLogin() {
    if (localStorage.getItem('name', 'email') != null) {
        login.innerHTML = 'Log Out'
    }
    else { 
        login.innerHTML = 'Log In'
      }
    }


window.onload = hideLogin()