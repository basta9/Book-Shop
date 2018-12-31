'use strict';

var gTrans = {
    'h1': {
        en: 'THE BOOK SHOP',
        he: 'חנות ספרים'
    },
    'add-book': {
        en: 'Add new Book',
        he: 'הוסף ספר'
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'book-rating': {
        en: 'Rating',
        he: 'דירוג'
    },
    'book-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read': {
        en: 'Read',
        he: 'קרא'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'update': {
        en: 'Update',
        he: 'עדכן'
    },
    'book-details': {
        en: 'Book Details',
        he: 'פרטי ספר'
    },
    'img-link': {
        en: 'Image Link',
        he: 'קישור לתמונה'
    },
    'description': {
        en: 'Description',
        he: 'תיאור'
    },
    'add': {
        en: 'Add',
        he: 'הוסף'
    },
    'close': {
        en: 'Close',
        he: 'סגור'
    },
    'input-name': {
        en: 'The Bible',
        he: 'התנ"ך'
    },
};


var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');

        var txt = getTrans(transKey);


        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.body.classList.add('rtl');
        // debugger
        $('#addBookModal')[0].classList.add('text-right');
        $('#updateBookModal')[0].classList.add('text-right');
    } else {
        document.body.classList.remove('rtl');
        $('#addBookModal')[0].classList.remove('text-right');
        $('#updateBookModal')[0].classList.remove('text-right');
    }
    doTrans();
}
