console.log('hello')
let dropdownMenu=document.querySelector('#career-category')

// let submitBtn=document.querySelector('#submitBtn')

// submitBtn.addEventListener('click', e=>{
    
//     getPostings()
// })
function getPostings(){
    firebase.database().ref('/posts').on('value', (snapshot)=>{
        let data=snapshot.val()
        let displayPostings=document.querySelector('#postings')
        // let searchBar=document.querySelector('#searchbar').value
        for(key in data){
            // if (data[key].career == dropdownMenu) {
                  console.log(data[key].description)
            displayPostings.innerHTML += `<div class="card" style="width: 100%;">
          <img class="card-img-top" src="${data[key].image}" alt="Card image cap" style='width:200px'>
            <div class="card-body">
            <h5 class="card-title">${data[key].title}</h5>
            <p class="card-text">${data[key].name}
            </p>
             <p class="card-text"><a href= ${data[key].contact}>Contact Info: ${data[key].contact}</a></p>
             <p class="card-text">${data[key].date}</p>
            <p class="card-text">${data[key].career}</p>
            <p class="card-text"></p>
          </div>
        </div>`
            }
    // }
        })
}



dropdownMenu.onchange=function(){
    filterPosts()
}
function filterPosts(){
    console.log(dropdownMenu.value)
     firebase.database().ref('/posts').on('value', (snapshot)=>{
        let data=snapshot.val()
        let displayPostings=document.querySelector('#postings')
        let dropdownMenu=document.querySelector('#career-category')
        displayPostings.innerHTML = ""
        for(key in data){
            if (data[key].career == dropdownMenu.value) {
                  console.log(data[key].description)
            displayPostings.innerHTML += `<div class="card" style="width: 100%;margin:15px">
          <img class="card-img-top" src="${data[key].image}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-header">${data[key].title}</h5>
            <p class="card-text">${data[key].name}
            </p>
             <p class="card-text"><a href= ${data[key].contact}>Contact Info: ${data[key].contact}</a></p>
             <p class="card-text">${data[key].date}</p>
            <p class="card-text">${data[key].career}</p>
            <p class="card-text"></p>
          </div>
        </div>`
            }
    }
        })
}
 window.onload=getPostings()

