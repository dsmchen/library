const fantasyLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  fantasyLibrary.push(book);
}

addBookToLibrary(
  'The Priory of the Orange Tree',
  'Samantha Shannon',
  848,
  true
);
addBookToLibrary('A Day of Fallen Night', 'Samantha Shannon', 868, true);
addBookToLibrary('Among the Burning Flowers', 'Samantha Shannon', 288, false);
addBookToLibrary('The Poppy War', 'R.F. Kuang', 545, true);
addBookToLibrary('The Dragon Republic', 'R.F. Kuang', 654, true);
addBookToLibrary('The Burning God', 'R.F. Kuang', 622, true);

// Display book

function displayBook(book) {
  const main = document.querySelector('main');

  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('strong');
  title.classList.add('title');
  title.textContent = book.title;

  const info = document.createElement('p');
  info.classList.add('info');
  info.textContent = `${book.author}, ${book.pages} pages, ${
    book.read ? 'read' : 'unread'
  }`;

  main.appendChild(card);
  card.appendChild(title);
  card.appendChild(info);
}

fantasyLibrary.forEach((book) => displayBook(book));

// Add new book to library

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
    addBookToLibrary(title, author, pages, read);
    displayBook(fantasyLibrary.at(-1));
    overlay.classList.toggle('hidden');
  }
});
