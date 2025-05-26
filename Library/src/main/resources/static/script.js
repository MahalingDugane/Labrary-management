const API_URL = "http://localhost:8080/api/books";

function fetchBooks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let bookList = document.getElementById("bookList");
            bookList.innerHTML = "";
            data.forEach(book => {
                let row = `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.quantity}</td>
                    <td>
                        <button class="btn edit-btn" onclick="editBook(${book.id}, '${book.title}', '${book.author}', '${book.genre}', ${book.quantity})">✏ Edit</button>
                        <button class="btn delete-btn" onclick="deleteBook(${book.id})">❌ Delete</button>
                    </td>
                </tr>`;
                bookList.innerHTML += row;
            });
        });
}

function addBook() {
    let book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        quantity: document.getElementById("quantity").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    }).then(() => {
        fetchBooks();
        clearForm();
    });
}

function editBook(id, title, author, genre, quantity) {
    document.getElementById("editBookId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editGenre").value = genre;
    document.getElementById("editQuantity").value = quantity;
    document.getElementById("editModal").style.display = "block";
}

function updateBook() {
    let id = document.getElementById("editBookId").value;
    let updatedBook = {
        title: document.getElementById("editTitle").value,
        author: document.getElementById("editAuthor").value,
        genre: document.getElementById("editGenre").value,
        quantity: document.getElementById("editQuantity").value
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook)
    }).then(() => {
        fetchBooks();
        closeModal();
    });
}

function deleteBook(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchBooks());
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("quantity").value = "";
}

window.onload = fetchBooks;
