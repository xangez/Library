const inputs = document.querySelector("form").elements;
const addBookbtn = document.querySelector("#add-book");
addBookbtn.addEventListener("click", openForm);
const shelf = document.querySelector("#shelf");
const submit = document.querySelector(".submit");
submit.addEventListener("click", addBookToLibrary);
const cardTemplate = document.querySelector("#card-template");

myLibrary = JSON.parse(localStorage.getItem("library.books")) || [];

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
  updateAndRender();
}

function updateAndRender() {
  updateStorage();
  render();
}

function render() {
  clearShelf();
  myLibrary.forEach(book => {
    const cardElement = document.importNode(cardTemplate.content, true);
    const card = cardElement.querySelector('.card');
    card.id = book.title;
    const cardTitle = cardElement.querySelector('.cardTitle');
    cardTitle.textContent = book.title;
    const cardAuthor = cardElement.querySelector('.cardAuthor');
    cardAuthor.textContent = book.author;
    const cardPages = cardElement.querySelector('.cardPages');
    cardPages.textContent = book.pages;

    const cardRead = cardElement.querySelector('.cardRead')
    cardRead.textContent = book.read;
    cardRead.textContent == "Read" ? 
    cardRead.classList.add('toggleRead') : 
    cardRead.classList.add('toggleNotRead');
    cardRead.addEventListener("click", toggleRead);

    const removeBtn = cardElement.querySelector('.removeBtn')
    removeBtn.addEventListener("click", removeCard);
    shelf.appendChild(cardElement);
  })
}

function clearShelf() {
  while (shelf.firstChild) {
    shelf.removeChild(shelf.firstChild)
  }
}

function toggleRead(e){
  if (e.target.textContent == "Not read") {
    e.target.textContent = "Read";
    e.target.classList.remove('toggleNotRead');
    e.target.classList.add('toggleRead');
  }
  else {
    e.target.textContent = "Not read";
    e.target.classList.remove('toggleRead');
    e.target.classList.add('toggleNotRead');
  }
}

function removeCard(e) {
  let book = e.target.parentNode;
  let id = book.id;
  myLibrary.forEach((book, index) => {
    if (book.title == id) {
      myLibrary.splice(index, 1);
    }
  });
  updateAndRender();
}

function populateMyLibrary() {
  myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien", '200', 'Read'));
  myLibrary.push(new Book("The Final Empire", "Brandon Sanderson", '200', 'Not Read'));
}

function updateStorage() {
  localStorage.setItem("library.books", JSON.stringify(myLibrary));
}

function onload() {
  render();
}

onload();