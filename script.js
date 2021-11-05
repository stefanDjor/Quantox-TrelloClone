const addItems = document.querySelectorAll('.icon');
const saveBtns = document.querySelectorAll('.save-btn');
const infoBtn = document.querySelector(".nav-info");
const infoPhoto = document.querySelector(".info-photo")
const textPlace = document.querySelector('.input-area');



let cardList;
window.onload = function () {
  // ---Citamo localStorage 
  cardList = localStorage.getItem(`listInStorage`)
  const cardListparsed = JSON.parse(cardList);

  if (!cardListparsed) {
    cardList = [{
        title: "Backlog",
        color: "darkorchid",
        items: [
          "Release the course",
          "Sit back and Relex"
        ]
      },
      {
        title: "In Progress",
        color: "darkred",
        items: [
          "Add Favourite Musics",
          "Add Favorite Sport"
        ]
      },
      {
        title: "Complete",
        color: "darkseagreen",
        items: [
          "Being cool",
          "Getting stuff done"
        ]
      },
      {
        title: "On Hold",
        color: "orange",
        items: [
          "Release the course",
          "Sit back and relax",
        ]
      },
    ]
    localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
  } else {
    cardList = cardListparsed;
  }


  cardList.forEach(list => {
    const newListDiv = document.createElement(`div`)
    newListDiv.classList.add('card');
    // pravimo new div list preko template literala

    newListDiv.innerHTML = `
                <div id="cls-card" class="close-card">x</div>
                <div class="box-title">
                    <p class="backlog" id="title1">
                        ${list.title}
                    </p>
                </div>
                <div class="box-items">
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
    newListDiv.querySelector('.box-title').style.backgroundColor = list.color;
    console.log(list)

    const close = newListDiv.querySelector("#cls-card")
    close.addEventListener("click", () => {
    

      const container = newListDiv
      const containers = document.querySelectorAll('.card');
      const listIndex = [...containers].indexOf(container);
      cardList.splice(listIndex, 1)
      localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
      newListDiv.remove()
    })


    newListDiv.querySelector('.box-title').addEventListener("click", e => {
      e.preventDefault()
      modal.style.display = "flex";
      titleForChange = newListDiv.querySelector('p');
    });

    const addNewItem = newListDiv.querySelector('.icon')
    addNewItem.addEventListener('click', () => {
      addNewItem.style.visibility = "hidden";
      const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
      realTextArea.style.display = "block";
    });
    const saveBtn = newListDiv.querySelector('.save-btn');
    saveBtn.addEventListener('click', (e) => {
      const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
      realTextArea.style.display = "none";
      addNewItem.style.visibility = "visible";
      newItem(e);
    });

    const itemContainer = newListDiv.querySelector('.box-items')
    itemContainer.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(itemContainer, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        itemContainer.appendChild(draggable)
      } else {
        itemContainer.insertBefore(draggable, afterElement)
      }
    })
    list.items.forEach(element => {
      const elementDiv = document.createElement(`div`);
      elementDiv.draggable = true;
      elementDiv.ondblclick = () => {
        elementDiv.contentEditable = true;
      }
      elementDiv.onblur = () => {
        elementDiv.contentEditable = false;
      }
      elementDiv.contentEditable = false;
      elementDiv.innerHTML = `
          <p class="item-text">
              ${element}
          </p>
      `
      elementDiv.classList.add('item');
      elementDiv.addEventListener('dragstart', () => {
        elementDiv.classList.add('dragging')
      });

      elementDiv.addEventListener('dragend', () => {
        elementDiv.classList.remove('dragging')
      });

      itemContainer.appendChild(elementDiv);
    })
    // ubacujemo ga u htmllllll 
    containerCards.appendChild(newListDiv)
  });
}

// Save
addItems.forEach(addItem => {
  addItem.addEventListener('click', () => {
    addItem.style.visibility = "hidden";
    const realTextArea = addItem.closest('.card').querySelector('.text-area');
    realTextArea.style.display = "block";
    console.log(realTextArea)
    console.log(addItem)
    console.log(addItem.closest('.card'));
  });
});
saveBtns.forEach(saveBtn => {
  saveBtn.addEventListener('click', (e) => {
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
      return {
        offset: offset,
        element: child
      }
    } else {
      return closest
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element
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
let titleForChange;
changeTitle.forEach(newTitle => {
  newTitle.addEventListener("click", e => {
    e.preventDefault()
    modal.style.display = "flex";
    titleForChange = newTitle.querySelector('p');
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      event.preventDefault();
    }
  }
});
save.addEventListener('click', function () {
  var title = writteNew.value;
  if (writteNew.value === "") {
    modal.style.display = 'none';
  } else {
    const container = titleForChange.closest('.card')
    const containers = document.querySelectorAll('.card');
    const listIndex = [...containers].indexOf(container);
    cardList[listIndex].title = title;
    localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
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
function newItem(e) {
  const container = e.target.closest('.card')
  const containers = e.target.closest('.card').querySelector('.box-items');
  console.log(containers)
  const realTextPlace = e.target.closest('.text-area').querySelector('input')

  if (realTextPlace.value === '') return

  const newItem = document.createElement('div');
  newItem.classList.add('item');
  newItem.setAttribute('draggable', "true");
  newItem.innerHTML = realTextPlace.value;
  containers.appendChild(newItem);
  newItem.addEventListener('dragstart', () => {
    newItem.classList.add('dragging')
  });

  newItem.addEventListener('dragend', () => {
    newItem.classList.remove('dragging')
  });

  const lists = e.target.closest(".cards").querySelectorAll(".card")
  let listIndex = 0
  lists.forEach((card, i) => {
    if (card === container) {
      listIndex = i
    }
  })
  debugger
  cardList[listIndex].items.push(realTextPlace.value)
  realTextPlace.value = '';
  localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
}

function AddNew() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('card');

  newDiv.innerHTML = `
                <div id="cls-card" class="close-card">x</div>
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

  const close = newDiv.querySelector("#cls-card")
  close.addEventListener("click", () => {
    // ukloni iz html
    const container = newDiv
    const containers = document.querySelectorAll('.card');
    const listIndex = [...containers].indexOf(container);
    cardList.splice(listIndex, 1)
    localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
    newDiv.remove()
  })


  const addNewItem = newDiv.querySelector('.icon')
  addNewItem.addEventListener('click', () => {
    addNewItem.style.visibility = "hidden";
    const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
    realTextArea.style.display = "block";
  });
  const saveBtn = newDiv.querySelector('.save-btn');
  saveBtn.addEventListener('click', (e) => {
    const realTextArea = addNewItem.closest('.card').querySelector('.text-area');
    realTextArea.style.display = "none";
    addNewItem.style.visibility = "visible";
    newItem(e);
  });
  let colors = ['#FF69B4', '#FFD700', '#CD5C5C', '#87CEFA', '#ff4466', '#808080', '#4ca3dd', '#ff5511'];
  let random_color = colors[Math.floor(Math.random() * colors.length)];
  let radnomTitleColor = newDiv.querySelector('.new-color');
  radnomTitleColor.style.backgroundColor = random_color;
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

  cardList.push({
    title: `New Card`,
    color: `${random_color}`,
    items: [
      `New item`
    ]
  });
  localStorage.setItem(`listInStorage`, JSON.stringify(cardList));
}
// Info open/close
infoBtn.addEventListener("click", event => {
  if (infoPhoto.style.display === "none") {
    infoPhoto.style.display = "flex";
  } else {
    infoPhoto.style.display = "none";
  }
});