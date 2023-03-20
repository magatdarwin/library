let myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
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
