function addClass(el, cls) {
    el.className += " " + cls;
}

function removeClass(el, cls) {
    var re = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    el.className = el.className.replace(re, ' ')
}

window.onload = function() {
    document.getElementById('openLogin').onclick = function() 
    {
        document.getElementById('login').style.display = 'block';
        document.getElementById('dark').style.visibility = 'visible';
        addClass(document.getElementById('page'), 'blur');
    }
    document.getElementById('cancel').onclick = function() 
    {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dark').style.visibility = 'hidden';
        removeClass(document.getElementById('page'), 'blur');
    }
}