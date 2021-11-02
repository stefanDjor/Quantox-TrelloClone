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

const draggables = document.querySelectorAll('.item')
const containers = document.querySelectorAll('.box-items')

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
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}