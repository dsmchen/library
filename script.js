let fantasyLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBook(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  fantasyLibrary.push(book);
}

addBook('The Priory of the Orange Tree', 'Samantha Shannon', 848, true);
addBook('A Day of Fallen Night', 'Samantha Shannon', 868, true);
addBook('Among the Burning Flowers', 'Samantha Shannon', 288, false);
addBook('The Poppy War', 'R.F. Kuang', 545, true);
addBook('The Dragon Republic', 'R.F. Kuang', 654, true);
addBook('The Burning God', 'R.F. Kuang', 622, true);

// Display book

function displayBook(book) {
  const main = document.querySelector('main');

  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', book.id);

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;

  const info = document.createElement('p');
  info.classList.add('info');
  info.textContent = `${book.author}, ${book.pages} pages, ${
    book.read ? 'read' : 'unread'
  }`;

  const toggleReadBtn = document.createElement('a');
  toggleReadBtn.classList.add('toggle-read');
  toggleReadBtn.textContent = 'Toggle Read';
  toggleReadBtn.addEventListener('click', toggleRead);

  const removeBookBtn = document.createElement('a');
  removeBookBtn.classList.add('remove-book');
  removeBookBtn.textContent = 'Remove Book';
  removeBookBtn.addEventListener('click', removeBook);

  main.appendChild(card);
  card.appendChild(title);
  card.appendChild(info);
  card.appendChild(toggleReadBtn);
  card.appendChild(removeBookBtn);
}

fantasyLibrary.forEach((book) => displayBook(book));

// Add book

const newBookBtn = document.querySelector('button.new-book');
const overlay = document.querySelector('.overlay');
const dialog = document.querySelector('dialog');
const addToLibraryBtn = document.querySelector('button.add-to-library');

newBookBtn.addEventListener('click', () => {
  const form = document.querySelector('form');
  form.reset();
  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');
});
overlay.addEventListener('click', () => {
  dialog.toggleAttribute('open');
  overlay.classList.toggle('hidden');
});

addToLibraryBtn.addEventListener('click', (event) => {
  const title = document.querySelector('input[name=title]').value;
  const author = document.querySelector('input[name=author]').value;
  const pages = document.querySelector('input[name=pages]').value;
  const read =
    document.querySelector('input[name=read]:checked').value === 'true';

  if (title && author && pages) {
    addBook(title, author, pages, read);
    displayBook(fantasyLibrary.at(-1));
    overlay.classList.toggle('hidden');
  }
});

// Toggle read

Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true;
};

function toggleRead(event) {
  const card = event.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardInfo = card.querySelector('.info');

  const book = fantasyLibrary.find((element) => element.id === cardID);
  book.toggleRead();
  cardInfo.textContent = `${book.author}, ${book.pages} pages, ${
    book.read ? 'read' : 'unread'
  }`;
}

// Remove book

function removeBook(event) {
  const card = event.target.parentElement;
  const cardID = card.getAttribute('data-id');

  card.remove();
  fantasyLibrary = fantasyLibrary.filter((book) => book.id !== cardID);
}
