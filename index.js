document.getElementById('myForm').addEventListener('submit', saveBookmark);

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
    
}