'use strict';

var gBookList;
var gSortName = false;
var gSortPrice = false;


function init() {
    if (!getFromStorage('bookList')) {
        gBookList = [
            createBook(makeId(), 'Harry Potter', '50', 'harry is a wizard', 'https://cdn.waterstones.com/bookjackets/large/9781/7853/9781785301544.jpg'),
            createBook(makeId(), 'Milkman', '40', 'this is a milkman', 'https://www.irishtimes.com/polopoly_fs/1.3484138.1525429400!/image/image.jpg'),
            createBook(makeId(), 'The Mars room', '80', 'there is a room in mars', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1524991696i/36373648._UY2113_SS2113_.jpg')
        ];
    } else {
        gBookList = getFromStorage('bookList');
    }
    renderList();
    onSetLang('en');
}


function renderList() {
    var pageBooks = getBooks();

    var bookListHtml = pageBooks.map(function (currBook) {
        return `    <tr>
                        <td onClick="onReadBook('${currBook.id}')" data-toggle="modal" data-target=".bd-example-modal-lg" class="clickable">${currBook.id}</td>
                        <td onClick="onReadBook('${currBook.id}')" data-toggle="modal" data-target=".bd-example-modal-lg" class="clickable">${currBook.title}</td>
                        <td>${currBook.price}</td>                        
                        <td id="star" style="background-image: url('img/star.png')"><b> ${currBook.rating}<b></td>             
                        <td>
                        <button onClick="onReadBook('${currBook.id}')" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-success" data-trans="read"></button>
                        </td>
                        <td>
                        <button onClick="onOpenUpdateModal('${currBook.id}')" class="btn btn-info" data-toggle="modal" data-target="#updateBookModal" data-trans="update"></button>
                        </td>
                        <td>
                        <button onClick="onBookDelete('${currBook.id}')" class="btn btn-danger" data-trans="delete"></button>
                        </td>
                    </tr>
                       `
    });
    $('#book-list').html(bookListHtml);
    setLang(gCurrLang);
}


function onBookDelete(id) {
    deleteBook(id);
    saveToStorage('bookList', gBookList);
    renderList();
}

//creates books id & title when user opens ADDBOOK modal
function onOpenUpdateModal(id) {
    $('#book-id-update').text('Book ID: ' + id);
    $('#book-title').text(getBookbyId(id).title);
    // debugger
    var book = getBookbyId(id);
    $('#book-price-update').val(book.price);
    $('#book-read-update').val(book.read);
}

//creates books id when user opens ADDBOOK modal
function onOpenAddModal() {
    var idx = makeId();
    $('#book-id-add').text('Book ID: ' + idx);
}

function readAndAddNewBook() {
    var id = $('#book-id-add').text();
    id = id.slice(9);
    var title = $('#book-name').val();
    var price = $('#book-price-add').val();
    var read = $('#book-read-add').val();
    var img = $('#book-img-add').val();

    $('#book-name').val('');
    $('#book-price-add').val('');
    $('#book-read-add').val('');

    addBook(id, title, price, read, img)
    saveToStorage('bookList', gBookList);
    renderList();

}

function OnupdateBook() {
    var id = $('#book-id-update').text();
    id = id.slice(9);
    var price = $('#book-price-update').val();
    var read = $('#book-read-update').val();

    $('#book-price-update').val('');
    $('#book-read-update').val('');

    updateBook(id, price, read);
    saveToStorage('bookList', gBookList);
    renderList();
}

function onReadBook(id) {
    $('#book-img').empty();

    var book = getBookbyId(id);
    var img = document.createElement("img");
    img.src = book.img;
    img.style.width = "200px";
    img.style.height = "250px";
    $('#book-img')[0].appendChild(img);
    $('#read-desc > p').text(book.read);
    $('#book-title-read').text(book.title);
    $('#id-holder').text(book.id);
    $('#book-rating > span').text(book.rating);

}

function minusBookRating() {
    var id = $('#id-holder').text();
    var index = getBookIdx(id);
    if (gBookList[index].rating !== 0) {
        gBookList[index].rating--;
    }
    $('#book-rating > span').text(gBookList[index].rating);
    saveToStorage('bookList', gBookList);
    renderList();
}

function plusBookRating() {
    var id = $('#id-holder').text();
    var index = getBookIdx(id);
    if (gBookList[index].rating !== 10) {
        gBookList[index].rating++;
    }
    $('#book-rating > span').text(gBookList[index].rating);
    saveToStorage('bookList', gBookList);
    renderList();
}

function onSortByName() {
    gBookList = sortByName();
    saveToStorage('bookList', gBookList);
    renderList();
}

function onSortByPrice() {
    gBookList = sortByPrice();
    saveToStorage('bookList', gBookList);
    renderList();
}

function onSetLang(lang) {
    setLang(lang);
}

function onPreviousPage() {
    goToPrevious();
    renderList();
}

function onNextPage() {
    goToNext();
    renderList();
}