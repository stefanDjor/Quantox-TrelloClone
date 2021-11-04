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
});

saveBtn.addEventListener('click', () =>{
    textPlace.style.display = "none";
    saveBtn.style.display = "none";
    addItem.style.visibility = "visible";
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


//-- open modal with dbl click and change a title --//
const changeTitle = document.querySelectorAll('.box-title');
const newTitle = document.querySelector(".backlog");
const modal = document.getElementById("modal");

var writteNew = document.getElementById("test");
var newOne = document.getElementById("title1");
var newTwo = document.getElementById("title2");
var newThree = document.getElementById("title3");
var newFour = document.getElementById("title4");
const save = document.getElementById("new-name")

changeTitle.forEach(newTitle => {
  newTitle.addEventListener("click", e => {
    e.preventDefault()
    modal.style.display = "flex";
  });
  newOne.addEventListener("change", e => {
    e.preventDefault();
    var title = writteNew.value;
    newOne.textContent = title;
    modal.style.display = "flex";
  })
  save.addEventListener('click' , function(){
    var title = writteNew.value;
        if(writteNew.value === ""){
          modal.style.display = 'none';
        }
        else {
          newOne.textContent = title;
          modal.style.display = "none";
          writteNew.value = '';
        }  
  });
  window.onclick = function(event){
    if(event.target == modal){
      modal.style.display = 'none';
      event.preventDefault();
    }
  }
  });

// newOne.addEventListener("change", e => {
//   e.preventDefault();
//   var title = writteNew.value;
//   newOne.textContent = title;
//   modal.style.display = "flex";
// })
// save.addEventListener('click' , function(){
//   var title = writteNew.value;
//       if(writteNew.value === ""){
//         modal.style.display = 'none';
//       }
//       else {
//         newOne.textContent = title;
//         modal.style.display = "none";
//         writteNew.value = '';
//       }  
// });
// window.onclick = function(event){
//   if(event.target == modal){
//     modal.style.display = 'none';
//     event.preventDefault();
//   }
// }


// writteNew.addEventListener("change", function(){
//   var title = writteNew.value;
//   newTwo.textContent = title;
//   modal.style.display = "none";
// })

// writteNew.addEventListener("change", function(){
//   var title = writteNew.value;
//   newThree.textContent = title;
//   modal.style.display = "none";
// })

// writteNew.addEventListener("change", function(){
//   var title = writteNew.value;
//   newFour.textContent = title;
//   modal.style.display = "none";
// })

// ADDD NEW CARD
const createBtn = document.getElementById('createbtn');
const containerCards = document.querySelector('.cards');

createBtn.addEventListener('click', AddNew);

function AddNew(){
  const newDiv = document.createElement('div');
  newDiv.classList.add('card');
  // newDiv.setAttribute("draggable", "true");

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
                    <div class="save">
                        <button  onclick="save1()" class="save-btn" type="button">Save</button>
                    </div>
                </div>
                <div class="text-area">
                    <input id="input-save-backlog" value="" class="input-area" type="text" placeholder="Enter title for this card...">
                </div>
        `
        let colors = ['#FF69B4', '#FFD700', '#CD5C5C', '#87CEFA'];
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