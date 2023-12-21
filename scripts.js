let list = [
  {
    id: 'id1',
    title: 'Learn JS',
    done: false
  },
  {
    id: 'id2',
    title: 'Learn React',
    done: false
  },
  {
    id: 'id3',
    title: 'Get a Job!',
    done: false
   }
];

const listElement = document.getElementById('list');
const todoInput = document.getElementById('todoInput');

const savedList = JSON.parse(localStorage.getItem('list')); // get list from local storage
if (savedList && savedList.length) list = savedList;

function renderList() {
  listElement.innerHTML = null; // clear list
  list.forEach(function (item) {
    createListItem(item);
  });
}

renderList();

listElement.addEventListener('click',  (event) => {
  //console.log(event.target);
  //console.log(event.target.nodeName);
  if(event.target.nodeName === 'BUTTON') {
    console.log(event.target.className);
    for (let i=0; i<list.length; i++) {
      if(list[i].id === event.target.id) {
        //console.log('found '+list[i].id);
        if (event.target.className === 'delete-btn') {
          list.splice(i, 1);
        } else list[i].done = !list[i].done;
        break;
      }
    }
    updateLocalStorage(); // list saved to local storage
    renderList();
  }
});


function createListItem(el) {
  const listItem = document.createElement('li');
  console.log(el.done+' '+typeof el.done);
  listItem.setAttribute('class', el.done ? 'done' : 'progress');
  const listItemText = document.createTextNode(el.title);
  listItem.appendChild(listItemText);

  // add "Done" button
  const btnItem = document.createElement('button');
  btnItem.setAttribute('id', el.id);
  const btnItemText = document.createTextNode('Done');
  btnItem.appendChild(btnItemText);
  listItem.appendChild(btnItem);
  //createItemBtn(listItem);

  // add "Delete" button
  const btnItemDel = document.createElement('button');
  btnItemDel.setAttribute('id', el.id);
  btnItemDel.setAttribute('class', 'delete-btn');
  const btnText = document.createTextNode('Delete');
  btnItemDel.appendChild(btnText);
  listItem.appendChild(btnItemDel);

  listElement.appendChild(listItem);
}

function getIdNumberPart(id) {
  return Number(id.replace('id', ''));
}

function addToList() {
  const todoInputValue = todoInput.value;
  const lastId = list.length ? getIdNumberPart(list[list.length - 1].id) : 1;
  list.push({
    id: 'id'+(lastId+1),
    title: todoInputValue,
    done: false
  });
  updateLocalStorage() // list saved to local storage
  createListItem(list[list.length - 1]);
  //document.getElementById('list').innerHTML = null;
  //renderList();
  todoInput.value = "";
}

function updateLocalStorage() {
  localStorage.setItem('list', JSON.stringify(list)); // list saved to local storage
}

/*
function renderList() {//old version
  list.forEach(function (item) {
      const listItem = document.createElement('li');
      listItem.innerText = item.title;
      document.getElementById('list').appendChild(listItem);
  });
}
 */
