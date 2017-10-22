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
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];      
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
    evt.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var source   = document.getElementById('bookmarker-template').innerHTML;
    var bookmarksCont = document.getElementById('bookmarkers_list');
    var templateBookmarks = Handlebars.compile(source);
    bookmarksCont.innerHTML = templateBookmarks({bookmarks: bookmarks});
}

function deleteBookmark() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var urlForDelete = this.href;
    for (var k = 0; k < bookmarks.length; k++) {
        if (bookmarks[k].url == urlForDelete) {
            console.log(bookmarks[k].url);
        }
    }
}