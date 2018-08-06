// console.log('hi')
let user=localStorage.getItem('name')
console.log(user)

function userAccess(){
    if(!user){
        window.location = 'index.html'
    }
}

window.onload=userAccess()