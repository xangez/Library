
const inputs = document.querySelector("form").elements;

const addBookbtn = document.querySelector("#add-book");
addBookbtn.addEventListener("click", openForm);

const shelf = document.querySelector("#shelf");

const submit = document.querySelector(".submit");
submit.addEventListener("click", addBookToLibrary);

myLibrary = [];

function openForm() {
  computedDisplay = window.getComputedStyle(form).getPropertyValue('display');
  if (computedDisplay == 'block') {
    form.style.display = 'none';
    addBookbtn.textContent = 'Add';
  }
  else {
    form.style.display = 'block';
    addBookbtn.textContent = 'Close';
  }
}

/*
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.pushtoMyLibrary();
}

Book.prototype.pushtoMyLibrary = function() {
  myLibrary.push(this);
}
*/

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}



function addBookToLibrary() {
  let title = inputs[0].value;
  let author = inputs[1].value;
  let pages = inputs[2].value;
  let checked = inputs[3].checked ? "Read" : "Not read";
  let newBook = new Book(title, author, pages, checked);
  myLibrary.push(newBook);
  render();
}

function render() {
  let book = myLibrary[myLibrary.length - 1]

  let bookCard = document.createElement('div');
  bookCard.id = book.title;

  //title
  let cardTitle = document.createElement('span');
  cardTitle.textContent = book.title;
  cardTitle.classList.add("cardTitle");
  bookCard.appendChild(cardTitle);

  //author
  let cardAuthor = document.createElement('span');
  cardAuthor.textContent = book.author;
  cardAuthor.classList.add("cardAuthor");
  bookCard.appendChild(cardAuthor);

  //cardPages
  let cardPages = document.createElement('span');
  cardPages.textContent = book.pages;
  cardPages.classList.add("cardPages");
  bookCard.appendChild(cardPages);

  //cardRead
  let cardRead = document.createElement('button');
  cardRead.textContent = book.read;
  cardRead.classList.add("cardRead");
  cardRead.textContent == "Read" ? 
    cardRead.style.backgroundColor = "rgb(175, 169, 134)" : 
    cardRead.style.backgroundColor = "rgb(190, 161, 161)";
  bookCard.appendChild(cardRead);
  cardRead.addEventListener("click", toggleRead);

  //removeCard
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("removeBtn");
  bookCard.appendChild(removeBtn);
  removeBtn.addEventListener("click", removeCard);

  //append card
  bookCard.classList.add("card");
  shelf.appendChild(bookCard);
}

function toggleRead(e){
  if (e.target.textContent == "Not read") {
    e.target.textContent = "Read";
    e.target.style.backgroundColor = "rgb(175, 169, 134)";
  }
  else {
    e.target.textContent = "Not read";
    e.target.style.backgroundColor = "rgb(190, 161, 161)";
  }
}

function removeCard(e) {
  let book = e.target.parentNode;
  let id = book.id;
  book.remove();
  myLibrary.forEach((book, index) => {
    if (book.title == id) {
      myLibrary.splice(index, 1);
    }
  });
}


let thehobbit = new Book("The Hobbit", "J.R.R Tolkien", '200', 'Read');
myLibrary.push(thehobbit);
render();