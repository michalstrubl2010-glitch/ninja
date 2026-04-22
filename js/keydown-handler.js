// see https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
 
var keyState = {};
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);