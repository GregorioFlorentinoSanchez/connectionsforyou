let submitBtn=document.querySelector('#submit')

let selectedFile = document.querySelector('#file')
let file

selectedFile.addEventListener('change', e => {
    file = e.target.files[0]
    console.log(file)
})

submitBtn.addEventListener('click', e=>{
    // if button is in a form 
    e.preventDefault()
    uploadPosting()
})

function createPosting(url){
      console.log('pressed button')
    let postingTitle=document.querySelector('#postingTitle').value
    let companyName=document.querySelector('#companyName').value
    let contactInfo=document.querySelector('#contactInfo').value
    let jobDescription=document.querySelector("#jobDescription").value
    let datePosted=document.querySelector("#datePosted").value
    let careerCategory=document.querySelector('#career-category').value
    let logo=document.querySelector('#file').value
    let error=document.querySelector('#errorMessage')
    // console.log(title, description, image)
    let posting={
        image:url,
        title:postingTitle,
        name:companyName,
        contact:contactInfo,
        description:jobDescription,
        date:datePosted,
        career:careerCategory, 
    }
   
    firebase.database().ref('/posts').push(posting)
    console.log(posting)
    document.forms['internship'].reset()
}

function uploadPosting(){
     let fileName = file.name
    let uploadTask = firebase.storage().ref('/' + fileName).put(file)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;


                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
               createPosting(downloadURL)
            });
        });
}