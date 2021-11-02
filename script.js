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

const list_items = document.querySelectorAll('.item');
const lists = document.querySelectorAll('.box-items');

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
	});

	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
		});

		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
		});

		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
		});
	}
}