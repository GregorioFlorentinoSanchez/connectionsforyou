// console.log('hi')
let user=localStorage.getItem('name')
console.log(user)

function userAccess(){
    if(!user){
        window.location = 'block.html'
    }
}

window.onload=userAccess()