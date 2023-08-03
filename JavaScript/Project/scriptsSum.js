//adds link to the calendar to sign-up for promotion
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

function createEventListeners() {
    calendar();
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}

//adds information to the summary forms
function summaryAdd() {
    var sel;
    var i = document.getElementById("selProm").selectedIndex;
    //details1
    var sel = document.getElementById("line1");
    sel.appendChild(document.createTextNode(arrMessage[i]));
    sel = document.getElementById("line2");
    sel.appendChild(document.createTextNode(arrTime[i]));
    sel = document.getElementById("line3");
    sel.appendChild(document.createTextNode(arrDate[i]));
    sel = document.getElementById("line4");
    sel.appendChild(document.createTextNode(arrDur[i]));
    sel = document.getElementById("line5");
    sel.appendChild(document.createTextNode(arrVenue[i]));
    sel = document.getElementById("line6");
    sel.appendChild(document.createTextNode(arrProm[i]));
    sel = document.getElementById("line7");
    sel.appendChild(document.createTextNode(arrService[i]));
    sel = document.getElementById("line8");
    sel.appendChild(document.createTextNode(arrPrice[i]));
    total = arrPrice[i]//adds the price of promotion to total
    if (arrTea[i] === "true") {
        sel = document.getElementById("line9");
        sel.appendChild(document.createTextNode("tea " + arrPriceT[i]));
    }
    if (arrCoffee[i] === "true") {
        sel = document.getElementById("line9");
        sel.appendChild(document.createTextNode("coffee " + arrPriceC[i]));
    }
    if (arrSandwitches[i] === "true") {
        sel = document.getElementById("line9");
        sel.appendChild(document.createTextNode("sandwitches " + arrPriceS[i]));
    }
    if (arrBiscuits[i] === "true") {
        sel = document.getElementById("line9");
        sel.appendChild(document.createTextNode("biscuits " + arrPriceB[i]));
    }
    sel = document.getElementById("line10");
    sel.appendChild(document.createTextNode(arrConName[i] + " " + arrConNum[i] + " " + arrConEmail[i]));

    //details2
    attendeesAdd();
    for (i = 0; i < arrAtt.length; i++) {
        sel = document.getElementById("line"+11+i);
        sel.appendChild(document.createTextNode(arrAtt[i]));
        sel.appendChild(document.createTextNode(arrAttMenue[i]));
        sel.appendChild(document.createTextNode(arrAttPrice[i]))
    }

    //details3
    sel = document.getElementById("line20");
    sel.appendChild(document.createTextNode(calculateTotal()));
}

//calculates the total to be displayed
function calculateTotal() {
    for (var i = 0; i < arrAttPrice.length; i++) {
        total += arrAttPrice[i];
    }
    return total
}

//adds the attendee info to array
function attendeesAdd() {
    var cookieString = document.cookie;
    var cookieArray = cookieString.split("; ");
    var hold = document.getElementById("prom");
    var current = hold.selectedIndex;//gets current promotion in view
    var holdItem;//holds the temporary value
    var holdLength;
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i] === "attProm=" + current) {
            holdItem = cookieArray[i+1].search("=");
            holdLength = cookieArray[i+1].length;
            holdItem = cookieArray[i + 1].slice(holdItem + 1, holdLength);
            arrAtt.push(holdItem)
            holdItem = cookieArray[i + 2].search("=");
            holdLength = cookieArray[i + 2].length;
            holdItem = cookieArray[i + 2].slice(holdItem + 1, holdLength);
            arrAttMenue.push(holdItem)
            holdItem = cookieArray[i + 3].search("=");
            holdLength = cookieArray[i + 3].length;
            holdItem = cookieArray[i + 3].slice(holdItem + 1, holdLength);
            arrAttPrice.push(holdItem)
        }
    }
}