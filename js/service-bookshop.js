'use strict';
var gCurrPage = 0;
const TABLE_SIZE = 5;

function createBook(id, txt, price, read, img) {
    return {
        id: id,
        title: txt,
        price: price,
        read: read,
        img: img,
        rating: 0
    }
}

function getBookbyId(id) {
    return gBookList.find(function (currBook) {
        return currBook.id === id;
    });
}

function updateBook(id, price, read) {
    var bookIdx = gBookList.findIndex(function (currBook) {
        return currBook.id === id;
    });
    gBookList[bookIdx].price = price;
    gBookList[bookIdx].read = read;
}

function deleteBook(id) {
    var bookIdx = gBookList.findIndex(function (currBook) {
        return currBook.id === id;
    });
    gBookList.splice(bookIdx, 1);
}

function addBook(id, txt, price, read, img) {
    gBookList.unshift(createBook(id, txt, price, read, img));
}

function getBookIdx(id) {
    return gBookList.findIndex(function (currBook) {
        return currBook.id === id;
    });
}

function sortByName() {
    gSortName = !gSortName;
    return gBookList.sort(function (a, b) {
        var bookA = a.title.toUpperCase();
        var bookB = b.title.toUpperCase();

        var compare = 0;
        if (gSortName) {
            if (bookA > bookB) {
                compare = 1;
            } else if (bookA < bookB) {
                compare = -1;
            }
        } else {
            if (bookB > bookA) {
                compare = 1;
            } else if (bookB < bookA) {
                compare = -1;
            }
        }
        return compare;
    });
}

function sortByPrice() {
    gSortPrice = !gSortPrice;
    return gBookList.sort(function (a, b) {
        if (gSortPrice) {
            return +a.price - +b.price;
        } else {
            return +b.price - +a.price;
        }
    });
}


function getBooks() {
    var fromBookIdx = gCurrPage * TABLE_SIZE;
    return gBookList.slice(fromBookIdx, fromBookIdx + TABLE_SIZE);
}

function goToPrevious() {
    if (gCurrPage > 0) {
        gCurrPage--;
    }
}

function goToNext() {
    var page = gBookList.length / TABLE_SIZE;
    if (gCurrPage + 1 < page) {
        gCurrPage++
    }
}