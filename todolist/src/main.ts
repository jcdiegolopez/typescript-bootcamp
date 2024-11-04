import './style.css'

interface listItem {
  id: number;
  text: string;
  done: boolean;
}

let initialList : listItem[] = [
  { id: 1, text: 'Learn HTML', done: true },
  { id: 2, text: 'Learn CSS', done: true },
  { id: 3, text: 'Learn JavaScript', done: false }
];

let todoList : listItem[] = JSON.parse(localStorage.getItem('todoList') ?? JSON.stringify(initialList)); 



const list = document.querySelector('.list') as HTMLUListElement;
const input = document.querySelector('.input') as HTMLInputElement;
const button = document.querySelector('.add-btn') as HTMLButtonElement;

const deleteItem = (id: number) => {
  todoList = todoList.filter( item => item.id !== id);
  render();
}

const checkItem = (id: number) => {
  const item = todoList.find( item => item.id === id);
  if (item) {
    item.done = !item.done;
  }
  render();
}

const render = () => {
  list.innerHTML = '';

  if (todoList.length === 0) {
    list.innerHTML = '<li style="margin:auto; font-weight:semibold; font-size:1.5rem;">Empty list...</li>';
  }else{
  todoList.forEach( (item) => {
    const li = document.createElement('li') as HTMLLIElement;
    li.className = 'item';
    li.innerHTML = `
      <input class="item-check" type="checkbox" ${item.done ? 'checked' : ''}/>
      <span class="item-text">${item.text}</span>
      <button class="delete-btn">Delete</button>
    `

    const check = li.querySelector('.item-check') as HTMLInputElement;
    const deleteBtn = li.querySelector('.delete-btn') as HTMLInputElement;

    deleteBtn.addEventListener('click', () => {
      deleteItem(item.id);
    });
    check.addEventListener('change', () => {
      checkItem(item.id);
    })
    list.appendChild(li);

  })
  localStorage.setItem('todoList', JSON.stringify(todoList));
  }
}

button.addEventListener('click', () => {
  const text = input.value;
  if (text) {
    const newItem: listItem = {
      id: todoList.length + 1,
      text,
      done: false
    }
    todoList.push(newItem);
    input.value = '';
    render();
  }
})

render();