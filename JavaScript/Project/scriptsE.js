//global variables
var allVallid = true;//keeps tract of the data validation
var makeCookie = true;//tells the program whether to make a cookie used in edit and delete fields
//global arrays for temporary storinging information in cookie
var arrPromName = new Array();
var arrMessage = new Array();
var arrTime = new Array();
var arrDate = new Array();
var arrDur = new Array();
var arrVenue = new Array();
var arrProm = new Array();
var arrService = new Array();
var arrPrice = new Array();
var arrTea = new Array();
var arrPriceT = new Array();
var arrCoffee = new Array();
var arrPriceC = new Array();
var arrSandwitches = new Array();
var arrPriceS = new Array();
var arrBiscuits = new Array();
var arrPriceB = new Array();
var arrConName = new Array();
var arrConNum = new Array();
var arrConEmail = new Array();

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

function removeSelectDefaults() {
    //works with the clear button
    document.getElementById("myForm1").reset();
    document.getElementById("myForm2").reset();
    document.getElementById("myForm3").reset();
    document.getElementById("myForm4").reset();
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

function deleteCookie() {
    //alert to warn user
    alert("Warning information will be deleted");
    //get all input
    //form1
    var Pname = document.getElementById("Pname").value;
    var message = document.getElementById("message").value;
    var Ptime = document.getElementById("Ptime").value;
    var Pdate = document.getElementById("Pdate").value;
    var duration = document.getElementById("duration1");
    if (duration.checked === true) {
        duration = duration.value;
    } else {
        var duration = document.getElementById("duration2");
        if (duration.checked === true) {
            duration = duration.value;
        } else {
            var duration = document.getElementById("duration3");
            if (duration.checked === true) {
                duration = duration.value;
            }
        }
    }
    var Pvenue = document.getElementById("Pvenue").value;
    var Pprom = document.getElementById("Pprom").value;
    //form2
    var service = document.getElementById("service1");
    if (service.checked === true) {
        service = service.value;
    } else {
        service = document.getElementById("service2");
        if (service.checked === true) {
            service = service.value;
        } else {
            service = document.getElementById("service3");
            if (service.checked === true) {
                service = service.value;
            }
        }
    }

    var price = document.getElementById("price").value;
    //form3
    var menueArr = document.getElementsByName("menue");
    var priceArr = document.getElementsByName("priceM");
    var holdMarr = new Array();
    var holdParr = new Array();
    for (var i = 0; i < menueArr.length; i++) {
        if (menueArr[i].checked) {
            holdMarr.push(true);
            holdParr.push(priceArr[i].value);
        } else {
            holdMarr.push(false);
            holdParr.push("none");
        }
    }
    //form4
    var name = document.getElementById("Cname").value;
    var number = document.getElementById("Cnum").value;
    var email = document.getElementById("Cemail").value;

    //set the expire date of cookie
    var expires = new Date(-7);

    //add all information to cookie
    document.cookie = "promName=" + Pname + "; expires=" + expires + "; path=/";
    document.cookie = "message=" + message + "; expires=" + expires + "; path=/";
    document.cookie = "time=" + Ptime + "; expires=" + expires + "; path=/";
    document.cookie = "date=" + Pdate + "; expires=" + expires + "; path=/";
    document.cookie = "duration=" + duration + "; expires=" + expires + "; path=/";
    document.cookie = "venue=" + Pvenue + "; expires=" + expires + "; path=/";
    document.cookie = "promotion=" + Pprom + "; expires=" + expires + "; path=/";
    document.cookie = "service=" + service + "; expires=" + expires + "; path=/";
    document.cookie = "price=" + price + "; expires=" + expires + "; path=/";
    document.cookie = "tea=" + holdMarr[0] + "; expires=" + expires + "; path=/";
    document.cookie = "priceT=" + holdParr[0] + "; expires=" + expires + "; path=/";
    document.cookie = "coffee=" + holdMarr[1] + "; expires=" + expires + "; path=/";
    document.cookie = "priceC=" + holdParr[1] + "; expires=" + expires + "; path=/";
    document.cookie = "sandwitches=" + holdMarr[2] + "; expires=" + expires + "; path=/";
    document.cookie = "priceS=" + holdParr[2] + "; expires=" + expires + "; path=/";
    document.cookie = "biscuits=" + holdMarr[3] + "; expires=" + expires + "; path=/";
    document.cookie = "priceB=" + holdParr[3] + "; expires=" + expires + "; path=/";
    document.cookie = "conName=" + name + "; expires=" + expires + "; path=/";
    document.cookie = "conNumber=" + number + "; expires=" + expires + "; path=/";
    document.cookie = "conEmail=" + email + "; expires=" + expires + "; path=/";
    removeSelectDefaults();
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

//function to add all information to form
function changeSelect() {
    var sel = document.getElementById("prom");//gets the selected promotion value
    current = sel.selectedIndex;//gets the 

    //changes the form to the selected promotions data
    document.getElementById("Pname").value = arrPromName[current];
    document.getElementById("message").value = arrMessage[current];
    document.getElementById("Ptime").value = arrTime[current];
    document.getElementById("Pdate").value = arrDate[current];
    switch (arrDur[current]) {
        case ("1"):
            document.getElementById("duration1").checked = true;
            break;
        case ("2"):
            document.getElementById("duration2").checked = true;
            break;
        case ("3"):
            document.getElementById("duration3").checked = true;
            break;
    }//allchecked

    document.getElementById("Pvenue").value = arrVenue[current];
    document.getElementById("Pprom").value = arrProm[current];

    switch (arrService[current]) {
        case ("colour"):
            document.getElementById("service1").checked = true;
            break;
        case ("massage"):
            document.getElementById("service2").checked = true;
            break;
        case ("waxing"):
            document.getElementById("service3").checked = true;
            break;
    }//allchecked

    document.getElementById("price").value = arrPrice[current];

    if (arrTea[current] === "true") {
        document.getElementById("priceM1").value = arrPriceT[current];
        document.getElementById("tea").checked = true;
    } else {
        document.getElementById("tea").checked = false;
    }
    if (arrCoffee[current] === "true") {
        document.getElementById("priceM2").value = arrPriceC[current];
        document.getElementById("coffee").checked = true;
    } else {
        document.getElementById("coffee").checked = false;
    }
    if (arrSandwitches[current] === "true") {
        document.getElementById("priceM3").value = arrPriceS[current];
        document.getElementById("sand").checked = true;
    } else {
        document.getElementById("sand").checked = false;
    }
    if (arrBiscuits[current] === "true") {
        document.getElementById("priceM4").value = arrPriceB[current];
        document.getElementById("biscuits").checked = true;
    } else {
        document.getElementById("biscuits").checked = false;
    }

    document.getElementById("Cname").value = arrConName[current];
    document.getElementById("Cnum").value = arrConNum[current];
    document.getElementById("Cemail").value = arrConEmail[current];
    makeCookie = true;
}//end of function


//function to open edit form
function deleteForm() {
    makeCookie = false;
    var cookieString = document.cookie;
    var cookieArray = cookieString.split("; ");
    var holdItem;//holds the position of the =
    var holdLength;//holds the length of the item

    //regular expressions to determine what data the current item is 
    var promNamePattern = /^(promName=)/;
    var messPattern = /^(message=)/;
    var timePattern = /^(time=)/;
    var datePattern = /^(date=)/;
    var durPattern = /^(duration=)/;
    var venuePattern = /^(venue=)/;
    var promPattern = /^(promotion=)/;
    var servPattern = /^(service=)/;
    var pricePattern = /^(price=)/;
    var teaPattern = /^(tea=)/;
    var pTPattern = /^(priceT=)/;
    var coffPattern = /^(coffee=)/;
    var pCPattern = /^(priceC=)/;
    var sandPattern = /^(sandwitches=)/;
    var pSPattern = /^(priceS=)/;
    var bisPattern = /^(biscuits=)/;
    var pBPattern = /^(priceB=)/;
    var conNamePattern = /^(conName=)/;
    var conNumPattern = /^(conNumber=)/;
    var conEmailPattern = /^(conEmail=)/;

    //for loop that adds all cookie information to the arrays for holding
    for (var i = 0; i < cookieArray.length; i++) {
        holdItem = cookieArray[i].search("=");
        holdLength = cookieArray[i].length;
        holdItem = cookieArray[i].slice(holdItem + 1, holdLength);

        //checks what the item is what and adds to correct array
        if (promNamePattern.test(cookieArray[i]) === true) {
            arrPromName.push(holdItem);
        }
        if (messPattern.test(cookieArray[i]) === true) {
            arrMessage.push(holdItem);
        }
        if (timePattern.test(cookieArray[i]) === true) {
            arrTime.push(holdItem);
        }
        if (datePattern.test(cookieArray[i]) === true) {
            arrDate.push(holdItem);
        }
        if (durPattern.test(cookieArray[i]) === true) {
            arrDur.push(holdItem);
        }
        if (venuePattern.test(cookieArray[i]) === true) {
            arrVenue.push(holdItem);
        }
        if (promPattern.test(cookieArray[i]) === true) {
            arrProm.push(holdItem);
        }
        if (servPattern.test(cookieArray[i]) === true) {
            arrService.push(holdItem);
        }
        if (pricePattern.test(cookieArray[i]) === true) {
            arrPrice.push(holdItem);
        }
        if (teaPattern.test(cookieArray[i]) === true) {
            arrTea.push(holdItem);
        }
        if (pTPattern.test(cookieArray[i]) === true) {
            arrPriceT.push(holdItem);
        }
        if (coffPattern.test(cookieArray[i]) === true) {
            arrCoffee.push(holdItem);
        }
        if (pCPattern.test(cookieArray[i]) === true) {
            arrPriceC.push(holdItem);
        }
        if (sandPattern.test(cookieArray[i]) === true) {
            arrSandwitches.push(holdItem);
        }
        if (pSPattern.test(cookieArray[i]) === true) {
            arrPriceS.push(holdItem);
        }
        if (bisPattern.test(cookieArray[i]) === true) {
            arrBiscuits.push(holdItem);
        }
        if (pBPattern.test(cookieArray[i]) === true) {
            arrPriceB.push(holdItem);
        }
        if (conNamePattern.test(cookieArray[i]) === true) {
            arrConName.push(holdItem);
        }
        if (conNumPattern.test(cookieArray[i]) === true) {
            arrConNum.push(holdItem);
        }
        if (conEmailPattern.test(cookieArray[i]) === true) {
            arrConEmail.push(holdItem);
        }
    }
    promOption();
}

function createEventListeners() {
    calendar();
    //submit button
    var btnSubmit = document.getElementById("submit");
    if (btnSubmit.addEventListener) {
        btnSubmit.addEventListener("click", deleteCookie, false);
    } else if (btnSubmit.attachEvent) {
        btnSubmit.attachEvent("onclick", deleteCookie);
    }
    //clear button
    deleteForm();
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