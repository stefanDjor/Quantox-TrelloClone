const addItem = document.querySelector('.icon');
const textPlace = document.querySelector('.input-area');
const saveBtn = document.querySelector('.save-btn');
const infoBtn = document.querySelector(".nav-info");
const infoPhoto = document.querySelector(".info-photo")

// Info open/close
infoBtn.addEventListener("click", event => {
    if (infoPhoto.style.display === "none") {
        infoPhoto.style.display = "flex";
    } else {
        infoPhoto.style.display = "none";
    }
});


addItem.addEventListener('click',() =>{
    textPlace.style.display = "block";
    saveBtn.style.display = "block";
    addItem.style.visibility = "hidden";
})

saveBtn.addEventListener('click', () =>{
    textPlace.style.display = "none";
    saveBtn.style.display = "none";
    addItem.style.visibility = "visible";
})

// function save1() {
//     var btnSavefirst = document.getElementById('input-save-blog').value === " ";
    
// }

// Drag and Drop 
