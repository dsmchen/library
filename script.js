let fantasyLibrary = [];

class Book {
  constructor(title, author, pages, isRead, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

function addBook(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
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

  const list = document.createElement('ul');

  const author = document.createElement('li');
  author.classList.add('author');
  author.textContent = book.author;

  const pages = document.createElement('li');
  pages.classList.add('pages');
  pages.textContent = `${book.pages} pages`;

  const isRead = document.createElement('li');
  isRead.classList.add('is-read');
  isRead.textContent = `${book.isRead ? 'Read' : 'Unread'}`;

  const toggleReadBtn = document.createElement('a');
  toggleReadBtn.classList.add('toggle-read');
  toggleReadBtn.textContent = 'Toggle Read';
  toggleReadBtn.addEventListener('click', handleClickToggleRead);

  const removeBookBtn = document.createElement('a');
  removeBookBtn.classList.add('remove-book');
  removeBookBtn.textContent = 'Remove Book';
  removeBookBtn.addEventListener('click', removeBook);

  main.appendChild(card);
  card.append(title, list, toggleReadBtn, removeBookBtn);
  list.append(author, pages, isRead);
}

fantasyLibrary.forEach((book) => displayBook(book));

// Add book

const newBookBtn = document.querySelector('button.new-book');
const overlay = document.querySelector('.overlay');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('button.add');

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

addBtn.addEventListener('click', (event) => {
  const title = document.querySelector('input[name=title]').value;
  const author = document.querySelector('input[name=author]').value;
  const pages = document.querySelector('input[name=pages]').value;
  const isRead =
    document.querySelector('input[name=is_read]:checked').value === 'true';

  if (title && author && pages) {
    addBook(title, author, pages, isRead);
    displayBook(fantasyLibrary.at(-1));
    overlay.classList.toggle('hidden');
  }
});

// Toggle read

function handleClickToggleRead(event) {
  const card = event.target.parentElement;
  const cardID = card.getAttribute('data-id');
  const cardIsRead = card.querySelector('.is-read');

  const book = fantasyLibrary.find((element) => element.id === cardID);
  book.toggleRead();
  cardIsRead.textContent = `${book.isRead ? 'Read' : 'Unread'}`;
}

// Remove book

function removeBook(event) {
  const card = event.target.parentElement;
  const cardID = card.getAttribute('data-id');

  card.remove();
  fantasyLibrary = fantasyLibrary.filter((book) => book.id !== cardID);
}
