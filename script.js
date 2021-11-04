const addItems = document.querySelectorAll('.icon');
const saveBtns = document.querySelectorAll('.save-btn');
const infoBtn = document.querySelector(".nav-info");
const infoPhoto = document.querySelector(".info-photo")
const textPlace = document.querySelector('.input-area');


// Save
addItems.forEach(addItem => {
  addItem.addEventListener('click', () =>{
          addItem.style.visibility = "hidden";
          const realTextArea = addItem.closest('.card').querySelector('.text-area');
          realTextArea .style.display = "block";
          console.log(realTextArea)
          console.log(addItem)
          console.log(addItem.closest('.card'));
  });
});
saveBtns.forEach(saveBtn => {
  saveBtn.addEventListener('click', (e) =>{
    const addItem = saveBtn.closest('.card').querySelector('.icon');
    const realTextArea = addItem.closest('.card').querySelector('.text-area');
    realTextArea.style.display = "none";
    addItem.style.visibility = "visible";
    console.log(realTextArea)
          console.log(addItem)
          console.log(addItem.closest('.card'));
    newItem(e)
});
});

// Drag and Drop 
const draggables = document.querySelectorAll('.item');
const containers = document.querySelectorAll('.box-items');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return {offset: offset, element: child}
    } else {
      return closest
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element
}

//-- Open modal with dbl click and change a title --//
const changeTitle = document.querySelectorAll('.box-title');
const newTitle = document.querySelector(".backlog");
const modal = document.getElementById("modal");

var writteNew = document.getElementById("test");
var newOne = document.getElementById("title1");
var newTwo = document.getElementById("title2");
var newThree = document.getElementById("title3");
var newFour = document.getElementById("title4");
const save = document.getElementById("new-name")
let titleForChange ;
changeTitle.forEach(newTitle => {
  newTitle.addEventListener("click", e => {
    e.preventDefault()
    modal.style.display = "flex";
    titleForChange = newTitle.querySelector('p');
  });
  window.onclick = function(event){
    if(event.target == modal){
      modal.style.display = 'none';
      event.preventDefault();
    }
  }
  });
  save.addEventListener('click' , function(){
    var title = writteNew.value;
        if(writteNew.value === ""){
          modal.style.display = 'none';
        }
        else {
          titleForChange.textContent = title;
          modal.style.display = "none";
          writteNew.value = '';
        }  
  });

// ADDD NEW CARD
const createBtn = document.getElementById('createbtn');
const containerCards = document.querySelector('.cards');
createBtn.addEventListener('click', AddNew);

// ADD Items
function newItem (e) {
  const containers = e.target.closest('.card').querySelector('.box-items');
  console.log(containers)
  const realTextPlace = e.target.closest('.text-area').querySelector('input')
  if (realTextPlace.value != ''){
      const newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.setAttribute('draggable', "true");
      newItem.innerHTML = realTextPlace.value;
      containers.appendChild(newItem);
      realTextPlace.value = '';
      newItem.addEventListener('dragstart', () => {
        newItem.classList.add('dragging')
      });
      
        newItem.addEventListener('dragend', () => {
          newItem.classList.remove('dragging')
        });
  } 
}
function AddNew(){
  const newDiv = document.createElement('div');
  newDiv.classList.add('card');

  newDiv.innerHTML = `
                <div class="box-title new-color">
                    <p class="backlog" id="title1">
                        New Card
                    </p>
                </div>
                <div class="box-items">
                  <div ondblclick="this.contentEditable=true;" onblur="this.contentEditable=false;" contenteditable="false" class="item" draggable="true">
                        <p class="item-text">
                            New item
                        </p>
                    </div>
                </div>
                <div class="icon-save">
                    <div class="icon">
                            + Add items
                        </div>
                    </div>
    
                    <div class="text-area">
                            <div class="save">
                                <button  class="save-btn" type="button">Save</button>
                            </div>
                            <input id="input-save-backlog" value="" class="input-area" type="text" placeholder="Enter title for this card...">
                    </div>
        `
        newDiv.querySelector('.box-title').addEventListener("click", e => {
          e.preventDefault()
          modal.style.display = "flex";
          titleForChange = newDiv.querySelector('p');
        });


        const addNewItem = newDiv.querySelector('.icon')
        addNewItem.addEventListener('click',() =>{
          addNewItem.style.visibility = "hidden";
          const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
          realTextArea .style.display = "block";
        });
        const saveBtn = newDiv.querySelector('.save-btn');
        saveBtn.addEventListener('click', (e) =>{
          const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
          realTextArea.style.display = "none";
          addNewItem.style.visibility = "visible";
          newItem(e);
        });
        let colors = ['#FF69B4', '#FFD700', '#CD5C5C', '#87CEFA', '#ff4466', '#808080', '#4ca3dd', '#ff5511'];
        let random_color = colors[Math.floor(Math.random() * colors.length)];
        let radnomTitleColor = newDiv.querySelector('.new-color');
        radnomTitleColor.style.backgroundColor =  random_color;
        const draggables = newDiv.querySelectorAll('.item')
        
        draggables.forEach(draggable => {
          draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
          })
        
          draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
          })
        })
        
  containerCards.appendChild(newDiv);
  const containers = document.querySelectorAll('.box-items');
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })
}
// Info open/close
infoBtn.addEventListener("click", event => {
  if (infoPhoto.style.display === "none") {
      infoPhoto.style.display = "flex";
  } else {
      infoPhoto.style.display = "none";
  }
});