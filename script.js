class Library {
  constructor(book) {
    this.books = [];
    if (book !== undefined) {
      this.books.push(book);
    }
  }

  hello(book) {
    console.log(book.title);
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }
  
  showBookFormModal() {
    const bookFormModal = document.querySelector('#book-form-modal');
    bookFormModal.style.display = 'block';
  }

  hideBookFormModal(event) {
    const bookFormModal = document.querySelector('#book-form-modal');
    const cancelButton = document.querySelector('input[value="Cancel"]');

    if (event.target === bookFormModal || event.target === cancelButton) {
      bookFormModal.style.display = 'none';  
    }
  }

  addBookToLibrary(event) {
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let readStatus = document.querySelector('#status').checked ? 'Finished' : 'Unfinished';
  
    this.addBook(new Book(title, author, pages, readStatus));
    
    const newBookForm = document.querySelector('#book-form');
    newBookForm.reset();
    const bookFormModal = document.querySelector('#book-form-modal');
    bookFormModal.style.display = 'none';
  
    this.updateView();
  }

  addBookCard(book, index) {
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

  toggleReadStatus(event) {
    let bookIndex = event.target.parentElement.parentElement.dataset.index;
    this.books[bookIndex].readStatus = this.books[bookIndex].readStatus === 'Finished' ? 'Unfinished' : 'Finished';
    event.target.innerText = this.books[bookIndex].readStatus;
  }

  removeBook(event) {
    let bookIndex = event.target.parentElement.parentElement.dataset.index;
    this.removeBook(bookIndex)
    this.updateView();
  }

  updateView() {
    let bookCards = document.querySelectorAll('.main > .card');
    
    for (let card of bookCards) {
      card.remove();
    }
  
    for (let i = 0; i < this.books.length; i++) {
      this.addBookCard(this.books[i], i);
    }
  
    document.querySelectorAll('.read-status').forEach(readStatusButton => {
      readStatusButton.addEventListener('click', this.toggleReadStatus);
    });
  
    document.querySelectorAll('.remove-book').forEach(readStatusButton => {
      readStatusButton.addEventListener('click', this.removeBook);
    });
  }
}

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

myLibrary = new Library();
myLibrary.addBook(new Book('Dune', 'Frank Herbert', 500, 'Unfinished'));

const addBook = document.querySelector('button.add');
const cancelButton = document.querySelector('input[value="Cancel"]');

addBook.addEventListener('click', myLibrary.showBookFormModal);
cancelButton.addEventListener('click', myLibrary.hideBookFormModal);
window.addEventListener('click', myLibrary.hideBookFormModal);

const submitForm = document.querySelector('#book-form input[type=submit]');
submitForm.addEventListener('click', event => {
  myLibrary.addBookToLibrary(event);
});

myLibrary.updateView();