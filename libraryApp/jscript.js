const myLibrary = [];
// selector
// method
// event
const tbody = document.querySelector('tbody');

// constructor function
function Book(title, author, dataState, hasRead) {
  this.title = title;
  this.author = author;
  this.dataState = dataState;
  this.hasRead = hasRead;
  this.setHasRead = () => {
    if (this.hasRead) {
      this.hasRead = false;
    } else {
      this.hasRead = true;
    }
  };
}

function changeStatus() {
  const that = this;
  myLibrary.forEach((book) => {
    if (book.dataState.toString() === that.id) {
      book.setHasRead();
      document.querySelector(`[data-state='${that.id}']`).firstElementChild.textContent = `${book.title}, ${book.author}, Readit?: ${book.hasRead}`;
    }
  });
}

function addListener() {
  Array.from(document.querySelectorAll('[type = "toggle"]')).forEach((button) => {
    button.addEventListener('click', changeStatus);
  });
}

function removeBook() {
  const delbuttonNodeList1 = tbody.querySelectorAll('[type="delete"]');
  Array.from(delbuttonNodeList1).forEach((deleteButton) => {
    deleteButton.addEventListener(('click'), () => {
      const dataStateDelBtn = deleteButton.getAttribute('id');
      for (let i = 0; i < myLibrary.length; i += 1) {
        const book1 = myLibrary[i];
        if (book1.dataState.toString() === dataStateDelBtn) {
          myLibrary.splice(i, 1);
        }
      }
      tbody.querySelector(`[data-state="${dataStateDelBtn}"`).remove();
    });
  });
}

function displayBook(array) {
  const tr = document.createElement('tr');
  const deletebtn = document.createElement('button');
  const toggle = document.createElement('button');
  tbody.appendChild(tr);
  const newBook = document.createElement('td');
  newBook.textContent = (`${array[0].title}, ${array[0].author}, ${array[0].hasRead}`);
  deletebtn.textContent = 'Delete';
  toggle.textContent = 'click to toggle read status';
  tbody.lastElementChild.appendChild(newBook);
  tbody.lastElementChild.appendChild(deletebtn);
  tbody.lastElementChild.setAttribute('data-state', `${array[0].dataState}`);
  tbody.lastElementChild.lastElementChild.setAttribute('type', 'delete');
  tbody.lastElementChild.lastElementChild.setAttribute('id', `${tbody.lastElementChild.getAttribute('data-state')}`);
  tbody.lastElementChild.appendChild(toggle);
  tbody.lastElementChild.lastElementChild.setAttribute('type', 'toggle');
  tbody.lastElementChild.lastElementChild.setAttribute('id', `${tbody.lastElementChild.getAttribute('data-state')}`);
  array.pop();
}

// this works
function addBook() {
  let count = 0;
  const inputBook = [];
  document.querySelector('form').addEventListener('submit', (event) => {
    const title1 = document.getElementById('title').value;
    const author1 = document.getElementById('author').value;
    const newBook = new Book(title1, author1, count, false);
    myLibrary.push(newBook);
    inputBook.push(newBook);
    displayBook(inputBook);
    count += 1;
    event.preventDefault();
    removeBook();
    addListener();
  });
}

addBook();
