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
}

function showBookFormModal() {
  bookFormModal.style.display = 'block';
  console.log(bookFormModal);
}

function hideBookFormModal(event) {
  if (event.target === bookFormModal || event.target === cancelButton) {
    bookFormModal.style.display = 'none';  
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