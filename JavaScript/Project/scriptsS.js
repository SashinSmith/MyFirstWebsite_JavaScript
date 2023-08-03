//global arrays
var allVallid = true;
var makeCookie = true;
var arrPromName = new Array();
var arrTea = new Array();
var arrCoffee = new Array();
var arrSandwitches = new Array();
var arrBiscuits = new Array();

function portCookie() {
    var cookieString = document.cookie;
    var cookieArray = cookieString.split("; ");
    var holdItem;//holds the position of the =
    var holdLength;//holds the length of the item

    //regular expressions to determine what data the current item is 
    var promNamePattern = /^(promName=)/;
    var teaPattern = /^(tea=)/;
    var coffPattern = /^(coffee=)/;
    var sandPattern = /^(sandwitches=)/;
    var bisPattern = /^(biscuits=)/;
    for (var i = 0; i < cookieArray.length; i++) {
        holdItem = cookieArray[i].search("=");
        holdLength = cookieArray[i].length;
        holdItem = cookieArray[i].slice(holdItem + 1, holdLength);

        //checks what the item is what and adds to correct array
        if (promNamePattern.test(cookieArray[i]) === true) {
            arrPromName.push(holdItem);
        }
        if (teaPattern.test(cookieArray[i]) === true) {
            arrTea.push(holdItem);
        }
        if (coffPattern.test(cookieArray[i]) === true) {
            arrCoffee.push(holdItem);
        }
        if (sandPattern.test(cookieArray[i]) === true) {
            arrSandwitches.push(holdItem);
        }
        if (bisPattern.test(cookieArray[i]) === true) {
            arrBiscuits.push(holdItem);
        }
    }
    promOption();
}

function calendarProm() {
    //get all td elements
    var dateCells = document.getElementsByTagName("td");
    //get data from cookie to read
    var cookieString = document.cookie;
    var cookieArray = cookieString.split("; ");
    //regular expression to check if the value in the cookie array matches
    var cookiePattern = /^(date=)/;

    //for loop to add links to the calendar
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookiePattern.test(cookieArray[i]) === true) {
            //gets the date of the promotion
            var dateAdd = cookieArray[i];
            dateAdd = dateAdd.slice(13, 16);

            //adds the link to calendar
            for (var i = 0; i < dateCells.length; i++) {
                if (dateCells[i].innerHTML === dateAdd) {
                    var testItem = dateCells[i]
                    var newLink = document.createElement("a");
                    var linkText = document.createTextNode(dateCells[i].innerHTML)
                    dateCells[i].innerHTML = "";
                    newLink.appendChild(linkText);
                    newLink.title = dateCells[i].innerHTML;
                    newLink.href = "scbeauty_signprom.html";
                    testItem.appendChild(newLink);
                }
            }
        }
    }
}

function calendar() {
    var dateObject = new Date();
    var date;
    var dateCells;
    var numDays;
    var dayOfWeek;
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var year = dateObject.getFullYear;
    var curMonth = monthArr[dateObject.getMonth()];
    var dayOfWeek = dateObject.getDay();
    dateObject.setDate(1);
    if (curMonth === 0 || curMonth === 2 || curMonth === 4 || curMonth === 6 || curMonth === 7 || curMonth === 9 || curMonth === 11) {
        numDays = 31;
    } else if (curMonth === 1) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0) {
                    numDays = 29;
                } else {
                    numDays = 28
                }
            } else {
                numDays = 29;
            }
        } else {
            numDays = 28;
        }
    } else {
        numDays = 30;
    }
    dateCells = document.getElementsByTagName("td");
    for (var i = 0; i < dateCells.length; i++) {
        dateCells[i].innerHTML = "";
    }

    for (var i = 1; i < numDays + 1; i++) {
        dateCells[i].innerHTML = dateObject.getDate();
        date = dateObject.getDate() + 1;
        dateObject.setDate(date);
    }
    document.getElementById("monthCap").innerHTML = curMonth;
    calendarProm();
}

function changeSelect() {
    var sel = document.getElementById("prom");//gets the selected promotion value
    var current = sel.selectedIndex;//gets the current selected index

    //hides ones that are not available
    var selM = document.getElementById("menue");
    if (arrTea[current] === "true") {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("tea"));//adds the array value to the option
        opt.value = 'tea';
        selM.appendChild(opt);//adds the value to the option
    }
    if (arrCoffee[current] === "true") {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("coffee"));//adds the array value to the option
        opt.value = 'coffee';
        selM.appendChild(opt);//adds the value to the option
    }
    if (arrSandwitches[current] === "true") {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("sandwitches"));//adds the array value to the option
        opt.value = 'sandwitches';
        selM.appendChild(opt);//adds the value to the option
    }
    if (arrBiscuits[current] === "true") {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode("biscuits"));//adds the array value to the option
        opt.value = 'biscuits';
        selM.appendChild(opt);//adds the value to the option
    }
}

//adds the promotions to a select with options
function promOption() {
    //creates new options for each promotion
    var sel = document.getElementById("prom");//gets the select
    for (var i = 0; i < arrPromName.length; i++) {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(arrPromName[i]));//adds the array value to the option
        opt.value = 'option value';
        sel.appendChild(opt);//adds the value to the option
    }
    changeSelect();//adds the data for the promotion that the user wants to look at
    sel.addEventListener("change", changeSelect);//runs every time the user changes the promotion
}//end of function

//clear function
function removeSelectDefaults() {
    //works with the clear button
    document.getElementById("myForm1").reset();
    document.getElementById("myForm2").reset();
    document.getElementById("myForm3").reset();
}

//creates a cookies for attendees
function createCookie() {
    var sel = document.getElementById("prom");//gets the selected promotion value
    var current = sel.selectedIndex;//gets the current selected index
    document.cookie = "attProm=" + current;
    document.cookie = "attName=" + document.getElementById("Cname").value;
    document.cookie = "attNum=" + document.getElementById("Cemail").value;
    document.cookie = "attEmail=" + document.getElementById("Cemail").value;
    sel = document.getElementById("menue");//gets the selected promotion value
    current = sel.selectedIndex;//gets the current selected index
    document.cookie = "attMenue=" + current;
    document.cookie = "attCom=" + document.getElementById("comment").value;
}

function validateForm4() {
    alert("val4");
    //get all input to be validated
    var number = document.getElementById("Cnum").value;
    var email = document.getElementById("Cemail").value;
    var name = document.getElementById("Cname").value;
    //get error fields and reset them
    var messN = document.getElementById("messN");
    messN.innerHTML = "";
    var messE = document.getElementById("messE");
    messE.innerHTML = "";
    var messNa = document.getElementById("messNa");
    messNa.innerHTML = "";
    //regular expression to test email
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //tests if the name input is blank
    try {
        if (name === "") throw "Please enter a name";
    }
    catch (err) {
        messNa.innerHTML = err;
        allVallid = false;
    }

    //try statements to test if number is a number and correct length
    try {
        if (isNaN(number) === true || number.length < 10 || number === "") throw "Please enter your number in plain format. eg 0213334567";
    }
    catch (err) {
        messN.innerHTML = err;
        allVallid = false;
    }

    //try statement to test if email is valid
    try {
        if (emailPattern.test(email) === false) throw "Please enter a valid email";
    }
    catch (err) {
        messE.innerHTML = err;
        allVallid = false;
    }

    if (allVallid === true && makeCookie === true) {
        createCookie();
    }
}

function createEventListeners() {
    calendar();
    portCookie();
    //submit button
    var btnSubmit = document.getElementById("submit");
    if (btnSubmit.addEventListener) {
        btnSubmit.addEventListener("click", validateForm4, false);
    } else if (btnSubmit.attachEvent) {
        btnSubmit.attachEvent("onclick", validateForm4);
    }
    //clear button
    var btnReset = document.getElementById("reset");
    if (btnReset.addEventListener) {
        btnReset.addEventListener("click", removeSelectDefaults, false);
    } else if (btnReset.attachEvent) {
        btnReset.attachEvent("onclick", removeSelectDefaults);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}