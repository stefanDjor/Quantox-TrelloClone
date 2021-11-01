const addItem = document.querySelector('.icon');
const textPlace = document.querySelector('.input-area');
const saveBtn = document.querySelector('.save-btn');

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

