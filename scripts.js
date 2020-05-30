
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



function addBookToLibrary() {
  let title = inputs[0].value;
  let author = inputs[1].value;
  let pages = inputs[2].value;
  let checked = inputs[3].checked ? "Read" : "Not read";
  new Book(title, author, pages, checked);
  render();
}

function render() {
  let book = myLibrary[myLibrary.length - 1]

  let bookCard = document.createElement('div');

  //title
  let cardInfo = document.createElement('div');
  cardInfo.textContent = book.title;
  cardInfo.classList.add("cardInfo");
  bookCard.appendChild(cardInfo);

  //author
  let cardAuthor = document.createElement('div');
  cardAuthor.textContent = book.author;
  cardAuthor.classList.add("cardInfo");
  bookCard.appendChild(cardAuthor);

  //cardPages
  let cardPages = document.createElement('div');
  cardPages.textContent = book.pages;
  cardPages.classList.add("cardPages");
  bookCard.appendChild(cardPages);

  //cardRead
  let cardRead = document.createElement('button');
  cardRead.textContent = book.read;
  cardRead.classList.add("cardRead");
  bookCard.appendChild(cardRead);
  cardRead.addEventListener("click", toggleRead);

  //removeCard
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("removeBtn");
  bookCard.appendChild(removeBtn);
  removeBtn.addEventListener("click", removeCard) 

  //append card
  bookCard.classList.add("card");
  shelf.appendChild(bookCard);

}

function toggleRead(e){
  if (e.target.textContent == "Not read") {
    e.target.textContent = "Read";
  }
  else {
    e.target.textContent = "Not read";
  }
}

function removeCard(e) {
  let r = e.target.parentNode.parentNode;
  r.removeChild(e.target.parentNode);
}


new Book("The Hobbit", "J.R.R Tolkien", '200', 'Read');
render();