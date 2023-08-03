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

//adds in promotion as a cookie
function createCookie() {
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
    //converts into the time date format
    var holdDate = Pdate.substring(8, 10);
    holdDate = parseInt(holdDate);
    //adds the duration to the date
    holdDate += parseInt(duration);
    //converts back to a  string to work correctly in the date 
    holdDate = holdDate.toString();
    //adds a 0 if it is less than 10
    if (holdDate.length < 2) {
        holdDate = "0" + holdDate;
    }
    //converts into the date format
    var myDate = (Pdate.substring(0, 4)) + "-" + Pdate.substring(5, 7) + "-" + holdDate + "T" + (Ptime.substring(0, 2)) + ":" + (Ptime.substring(3, 5)) + ":" + "00Z";
    var selectDate = new Date(myDate);
    var expires = "expires=" + selectDate.toUTCString();

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
}

//validate form 4
function validateForm4() {
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

//validates form 3
function validateForm3() {
    var menueArr = document.getElementsByName("menue");
    var priceArr = document.getElementsByName("priceM");
    var messM = document.getElementById("messM0");
    messM.innerHTML = "";
    messM = document.getElementById("messM1");
    messM.innerHTML = "";
    messM = document.getElementById("messM2");
    messM.innerHTML = "";
    messM = document.getElementById("messM3");
    messM.innerHTML = "";

    //checks if the menue item is checked
    //if checked it will test the value of the corresponding price
    try {
        if (menueArr[0].checked) {
            if (priceArr[0].value < 0 || isNaN(priceArr[0].value) === true) {
                messM = document.getElementById("messM0");
                throw "Please enter the price as a number";
            }
        }
        if (menueArr[1].checked) {
            if (priceArr[1].value < 0 || isNaN(priceArr[1].value) === true) {
                messM = document.getElementById("messM1");
                throw "Please enter the price as a number";
            }
        }
        if (menueArr[2].checked) {
            if (priceArr[2].value < 0 || isNaN(priceArr[2].value) === true) {
                messM = document.getElementById("messM2");
                throw "Please enter the price as a number";
            }
        }
        if (menueArr[3].checked) {
            if (priceArr[3].value < 0 || isNaN(priceArr[3].value) === true) {
                messM = document.getElementById("messM3");
                throw "Please enter the price as a number";
            }
        }
    }
    catch (err) {
        messM.innerHTML = err;
        allVallid = false;
    }
    validateForm4();
}

//validates form 2
function validateForm2() {
    var price = document.getElementById("price").value;
    //get the error fields and reset them
    var messS = document.getElementById("messS");
    messS.innerHTML = "";
    var messP = document.getElementById("messP");
    messP.innerHTML = "";

    //checks if a service has been checked
    try {
        if (!(document.getElementById("service1").checked || document.getElementById("service2").checked || document.getElementById("service3").checked)) throw "Please select a service";
    }
    catch (err) {
        messS.innerHTML = err;
        allVallid = false;
    }

    //checks if the price is a number and positive
    try {
        if (isNaN(price) === true) throw "Please enter a number";
        if (price < 0) throw "Please enter a positive whole number";
    }
    catch (err) {
        messP.innerHTML = err;
        allVallid = false
    }

    validateForm3();
}

function validateForm1() {
    //reset the allvalid variable so that it can validate everything from begining
    allVallid = true;

    //get all input of the first form
    var Pname = document.getElementById("Pname").value;
    var Ptime = document.getElementById("Ptime").value;
    var Pdate = document.getElementById("Pdate").value;
    var duration = document.getElementsByName("duration");

    //get all error fields where errors will be displayed
    var messT = document.getElementById("messT");
    messT.innerHTML = "";//removes previous error
    var messD = document.getElementById("messD");
    messD.innerHTML = "";
    var messDu = document.getElementById("messDu");
    messDu.innerHTML = "";
    var messPN = document.getElementById("messPN");
    messPN.innerHTML = "";

    //validate promotion name
    try {
        if (Pname === "" || Pname === null) throw "Please enter a promotion name";
    }
    catch (err) {
        messPN.innerHTML = err;
        allVallid = false;
    }

    //validate time
    //regular expression for the time pattern
    //checks if the time is in the 24  hour margin
    var timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    try {
        if (Ptime === "") throw "Please enter a time";
        if (isNaN(Ptime.substring(0, 2)) === true || isNaN(Ptime.substring(3, 5)) === true) throw "Please enter the time as a number";
        if (timePattern.test(Ptime) === false) throw "Please enter the time in the correct format HH:MM";
    }
    catch (err) {
        messT.innerHTML = err;
        allVallid = false;
    }

    //validate date
    try {
        //divides the input in the correct sections
        var year = Pdate.substring(0, 4);
        var month = Pdate.substring(5, 7);
        var day = Pdate.substring(8, 10);
        //checks if the characters are all numbers
        if (isNaN(year) === true || isNaN(month) === true || isNaN(day) === true) throw "The date has to be in numbers";
        //checks if the month does not exceed 12
        if (month > 12 || month < 1) throw "The month needs to be between 1-12";
        month = parseInt(month);
        day = parseInt(day);
        //switch statement to check if the month has the correct number of days
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                if (day > 31) throw "Please enter a correct number of days";
                break;
            case 4: case 6: case 9: case 11:
                if (day > 30) throw "There cannot be more than 30 days in this month";
                break;
            case 2:
                //checks if the current year is a leap year and checks if the days do not exceed the limit
                if (year % 4 === 0) {
                    if (year % 100 === 0) {
                        if (year % 400 === 0) {
                            if (day > 29) throw "There cannot be more than 29 days in this month";
                        } else {
                            if (day > 28) throw "There cannot be more than 28 days in this month";
                        }
                    } else {
                        if (day > 29) throw "There cannot be more than 29 days in this month";
                    }
                } else {
                    if (day > 28) throw "There cannot be more than 28 days in this month";
                }
                break;
        }
        //checks if the date selected is in the past
        var selectDate = new Date(Pdate);
        var dateToday = new Date();
        if (selectDate < dateToday) throw "This date cannot be in past";
    }
    catch (err) {
        messD.innerHTML = err;
        allVallid = false;
    }

    //validates if a duration has been selected
    try {
        if (!(document.getElementById("duration1").checked || document.getElementById("duration2").checked || document.getElementById("duration3").checked)) throw "Please select a duration";
    }
    catch (err) {
        messDu.innerHTML = err;
        allVallid = false;
    }

    validateForm2();
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

function removeSelectDefaults() {
    //works with the clear button
    document.getElementById("myForm1").reset();
    document.getElementById("myForm2").reset();
    document.getElementById("myForm3").reset();
    document.getElementById("myForm4").reset();
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
            document.getElementById("duration3").checked=true;
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
function editForm() {
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
        btnSubmit.addEventListener("click", validateForm1, false);
    } else if (btnSubmit.attachEvent) {
        btnSubmit.attachEvent("onclick", validateForm1);
    }
    //clear button
    editForm();
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