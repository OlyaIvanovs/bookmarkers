var load = new Promise(
    function(resolve, reject) {
        window.onload = resolve;
    }
);

var ask = function() {
    load.then(function(fulfilled) {
        fetchBookmarks();
        document.getElementById('myForm').addEventListener('submit', saveBookmark);
        var deleteBookmarkButns = document.getElementsByClassName('delete-bookmark');
        for (var k = 0; k < deleteBookmarkButns.length; k++) {
            deleteBookmarkButns[k].onclick = function() {
                deleteBookmark.call(this.previousElementSibling);
            };
        }
    })
    .catch(function() {
        console.log(error.message);
    });
} 

ask();


function saveBookmark(evt) {
    var siteName = document.getElementById('siteName');
    var siteUrl = document.getElementById('siteUrl');
    var siteNameVal = siteName.value;
    var siteUrlVal = siteUrl.value;

    if (validateForm(siteNameVal, siteUrlVal)) {
        return false;
    }

    var bookmark = {
        name: siteNameVal,
        url: siteUrlVal
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];      
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('myForm').reset();

    fetchBookmarks();
    evt.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var source   = document.getElementById('bookmarker-template').innerHTML;
    var bookmarksCont = document.getElementById('bookmarkers_list');
    var templateBookmarks = Handlebars.compile(source);
    bookmarksCont.innerHTML = templateBookmarks({bookmarks: bookmarks});
    var deleteBookmarkButns = document.getElementsByClassName('delete-bookmark');
    for (var k = 0; k < deleteBookmarkButns.length; k++) {
        deleteBookmarkButns[k].onclick = function() {
            deleteBookmark.call(this.previousElementSibling);
        };
    }
}

function deleteBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var urlForDelete = this.href;
    for (var k = 0; k < bookmarks.length; k++) {
        if (bookmarks[k].url == urlForDelete) {
            bookmarks.splice(k, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(siteNameVal, siteUrlVal) {
    if (!siteNameVal || !siteUrlVal) {
        alert("Please fill all fields in the form");
        return false;
    }

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var k = 0; k < bookmarks.length; k++) {
        if (bookmarks[k].url == siteUrlVal) {
            alert("This site is in a list already. Please add another one.");
            return false;
        }
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrlVal.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    
    return true;
}