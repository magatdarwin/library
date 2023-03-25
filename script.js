let myLibrary = [];

myLibrary[0] = new Book('Dune', 'Frank Herbert', 500, 'Unfinished')

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(event) {
  event.preventDefault();
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let readStatus = document.querySelector('#status').checked ? 'Finished' : 'Unfinished';

  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
  
  const newBookForm = document.querySelector('#book-form');
  newBookForm.reset();
  bookFormModal.style.display = 'none';

  updateLibraryView();
}

function showBookFormModal() {
  bookFormModal.style.display = 'block';
}

function hideBookFormModal(event) {
  if (event.target === bookFormModal || event.target === cancelButton) {
    bookFormModal.style.display = 'none';  
  }
}

function addBookCard(book, index) {
  const mainBlock = document.querySelector('.main');
  const newCard = document.createElement('div');
  newCard.dataset.index = index;
  newCard.classList.add('card');

  const title = document.createElement('p');
  title.innerText = `Title: ${book['title']}`;
  const author = document.createElement('p');
  author.innerText = `Author: ${book['author']}`;
  const pages = document.createElement('p');
  pages.innerText = `Pages: ${book['pages']}`;

  const bookControls = document.createElement('div');
  bookControls.classList.add('book-controls');

  const readStatusButton = document.createElement('button');
  readStatusButton.classList.add('read-status');
  readStatusButton.innerText = book['readStatus'];
  bookControls.appendChild(readStatusButton);

  const removeBookButton = document.createElement('button');
  removeBookButton.classList.add('remove-book');
  removeBookButton.innerText = 'Remove';
  bookControls.appendChild(removeBookButton);

  newCard.appendChild(title);
  newCard.appendChild(author);
  newCard.appendChild(pages);
  newCard.appendChild(bookControls);
  mainBlock.appendChild(newCard);
}

function toggleReadStatus(event) {
  let bookIndex = event.target.parentElement.parentElement.dataset.index;
  myLibrary[bookIndex].readStatus = myLibrary[bookIndex].readStatus === 'Finished' ? 'Unfinished' : 'Finished';
  event.target.innerText = myLibrary[bookIndex].readStatus;
}

function removeBook(event) {
  let bookIndex = event.target.parentElement.parentElement.dataset.index;
  myLibrary.splice(bookIndex, 1);
  updateLibraryView();
}

function updateLibraryView() {
  let bookCards = document.querySelectorAll('.main > .card');
  
  for (let card of bookCards) {
    card.remove();
  }

  for (let i = 0; i < myLibrary.length; i++) {
    addBookCard(myLibrary[i], i);
  }

  document.querySelectorAll('.read-status').forEach(readStatusButton => {
    readStatusButton.addEventListener('click', toggleReadStatus);
  });

  document.querySelectorAll('.remove-book').forEach(readStatusButton => {
    readStatusButton.addEventListener('click', removeBook);
  });
}

const bookFormModal = document.querySelector('#book-form-modal');
const addBook = document.querySelector('button.add');
const cancelButton = document.querySelector('input[value="Cancel"]');

addBook.addEventListener('click', showBookFormModal);
cancelButton.addEventListener('click', hideBookFormModal);
window.addEventListener('click', hideBookFormModal);

const submitForm = document.querySelector('#book-form input[type=submit]');
submitForm.addEventListener('click', addBookToLibrary);

updateLibraryView();