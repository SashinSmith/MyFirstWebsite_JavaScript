//add to event listeners

var allvalid = true;
function confirmNext(evt) {
    var checkBox = document.getElementsByTagName("input");
    var item;
    for (var i = 0; i < checkBox.length; i++) {
        item = document.getElementById("c" + i);
        if (item.checked === false) {
            allvalid = false;
        }
    }
    var ans = confirm("Have you read all the information?");
    if (allvalid !== true ) {
        evt.preventDefault();
        alert("please check all boxes")
    } 
    
}

//next link
var btnNext = document.getElementById("next");
if (btnNext.addEventListener) {
    btnNext.addEventListener("click", confirmNext, false);
} else if (btnNext.attachEvent) {
    btnNext.attachEvent("onclick", confirmNext);
}