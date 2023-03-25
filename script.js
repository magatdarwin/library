let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(event) {
  event.preventDefault();
  title = document.querySelector('#title').value;
  author = document.querySelector('#author').value;
  pages = document.querySelector('#pages').value;
  readStatus = document.querySelector('#status').value;

  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
  
  const newBookForm = document.querySelector('#book-form');
  newBookForm.reset();
  bookFormModal.style.display = 'none';

  addBookCard(newBook);
}

function showBookFormModal() {
  bookFormModal.style.display = 'block';
}

function hideBookFormModal(event) {
  if (event.target === bookFormModal || event.target === cancelButton) {
    bookFormModal.style.display = 'none';  
  }
}

function addBookCard(book) {
  const mainBlock = document.querySelector('.main');
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  const title = document.createElement('p');
  title.innerText = `Title: ${book['title']}`;
  const author = document.createElement('p');
  author.innerText = `Author: ${book['author']}`;
  const pages = document.createElement('p');
  pages.innerText = `Pages: ${book['pages']}`;
  const status = document.createElement('p');
  status.innerText = `Status: ${book['readStatus']}`;

  newCard.appendChild(title);
  newCard.appendChild(author);
  newCard.appendChild(pages);
  newCard.appendChild(status);
  mainBlock.appendChild(newCard);

  console.log(myLibrary);
}

function initializeLibraryView() {  
  for (let book of myLibrary) {
    addBookCard(book);
  }
}

const bookFormModal = document.querySelector('#book-form-modal');
const addBook = document.querySelector('button.add');
const cancelButton = document.querySelector('input[value="Cancel"]');

addBook.addEventListener('click', showBookFormModal);
cancelButton.addEventListener('click', hideBookFormModal);
window.addEventListener('click', hideBookFormModal);

const submitForm = document.querySelector('#book-form input[type=submit]');
submitForm.addEventListener('click', addBookToLibrary);

initializeLibraryView();