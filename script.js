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

fantasyLibrary.forEach((book) => {
  const container = document.querySelector('.container');

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

  container.appendChild(card);
  card.appendChild(title);
  card.appendChild(info);
});
