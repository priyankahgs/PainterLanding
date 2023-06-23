

$(document).ready(function () {

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $('#btnDownloadApp').hide();
    }
    else {
        $('#btnDownloadApp').show();
    }

    $('#btnDownloadApp').click(function (event) {
        event.preventDefault();

        window.open("https://play.google.com/store/apps/details?id=com.berger.app.consumer");
    });
});



function ProceedToStep1() {
   // showloader();
    if (validateExp()) {
         var ret = SaveExp();
		return true;
    }
    else {
      //  hideloader();
        return false;
    }
}

function showloader() {
    $('.loading').removeAttr("style");
    $('.loading').attr("style", "display:block");
}
function hideloader() {
    $('.loading').removeAttr("style");
    $('.loading').attr("style", "display:none");
}


function isAlphabetKey(evt, txt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(charCode >= 65 && charCode <= 122) && (charCode != 32 && charCode != 0) && charCode > 31 || (charCode >= 91 && charCode <= 96)) {
        if (txt == 'name') {
            $('#spnName').text('Special characters & numbers are not allowed');
        }
        return false;
    }
    $('#spnName').text('');
    return true;
}

function isAlphabetKeyCity(evt, txt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(charCode >= 65 && charCode <= 122) && (charCode != 32 && charCode != 0) && charCode > 31 || (charCode >= 91 && charCode <= 96)) {
        if (txt == 'city') {
            $('#spnCity').text('Special characters & numbers are not allowed');
        }
        return false;
    }
    $('#spnCity').text('');
    return true;
}
function isAlphabetKeyState(evt, txt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!(charCode >= 65 && charCode <= 122) && (charCode != 32 && charCode != 0) && charCode > 31 || (charCode >= 91 && charCode <= 96)) {
        if (txt == 'state') {
            $('#spnState').text('Special characters & numbers are not allowed');
        }
        return false;
    }
    $('#spnState').text('');
    return true;
}
 
function isNumberKey(evt, txt) {
    evt = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode >= 96 && charCode <= 105) && (charCode != 17 && charCode != 86)) {
        if (txt == 'number') {
            $('#spnMobileNumber').text('Special characters & alphabets are not allowed');
        }
        if (txt == 'pincode') {
            $('#spnPinCode').text('Special characters & alphabets are not allowed');
        }
        return false;
    }
    $('#spnMobileNumber').text('');
    $('#spnPinCode').text('');
    return true;
}

function bindGetInTouch() {
    $.getJSON("/microsites/getintouch-july2019/js/getintouch.json", function (data) {
        if (typeof (getUrlVars()["utm_adgroup"]) == 'undefined') {
            // console.log(data.GetInTouch[0].prop2)
            $('#headerContent').html(data.GetInTouch[0].prop2);
        }
        else {
            // console.log('2');
        }

        if (data === null) return false;
        var divdata = '';
        var isGeneric = true;
        $.each(data.GetInTouch, function (key, val) {
            if ((getUrlVars()["utm_adgroup"] || '') !== '') {
                var url = getUrlVars()["utm_adgroup"];
                if (val.prop1.trim().toLowerCase() == url.trim().toLowerCase()) {
                    $('#headerContent').html(val.prop2);
                    isGeneric = false;
                }
            }
        })

        if (isGeneric == true) {
            $('#headerContent').html(data.GetInTouch[0].prop2);
        }

    });
}


function GetPostData() {
    var source = '';
    var medium = '';
    var campaign = '';
    var term = '';
    var keyword = '';
    var adgroup = '';
    var content = '';

    if ((getUrlVars()["utm_source"] || '') !== '') {
        source = (getUrlVars()["utm_source"] || '');
        medium = (getUrlVars()["utm_medium"] || '');
        campaign = (getUrlVars()["utm_campaign"] || '');
        term = (getUrlVars()["utm_term"] || '');
        keyword = (getUrlVars()["utm_keyword"] || '');
        adgroup = (getUrlVars()["utm_adgroup"] || '');
        content = (getUrlVars()["utm_content"] || '');
    }

    var previousurl = document.referrer;
    var fullname = $('#txtexpName').val();
    var emailid = $('#txtexpEmail').val();
    var location = $('#txtexpCity').val();
    var contactno = $('#txtexpPhone').val();
    var Message = $('#txtexpQuery').val();
    Message = $('#language').val() + " - " + Message;

    var model = {
        Name: fullname,
        Telephone: contactno,
        Email: emailid,
        Location: location,
        Query: Message,
        Source: source,
        Medium: medium,
        Campaign: campaign
    };

    return model;
}



function PushToBergerCRM() {
debugger;
    var postData = { UserId: "1" };
    $.ajax({
        url: $('#UatBaseUrl').val() + 'BergerApi/api/InsertPainterLandingData',
        type: "post",
        contentType: "application/json;charset=utf-8",
        headers: {
            'Token': $('#APIToken').val(),
        },
        data: JSON.stringify(postData),
        cache: false,
        async: false,
        success: function (data) {
            
            if (!data.Flag) { 
                return false;

            }
            else {
                return true;

            }

        },
        error: function (xhr, status) {
            return false;
        }
    }); 
}


function SaveExp() {
    //var postData = GetPostData();

    var IsResult = false;

    var Fullname = $('#txtexpName').val();
    var txtexpPhone = $('#txtexpPhone').val(); 
    var Pincode = $('#txtexpPinCode').val();
    var city = $('#txtexpCity').val();
    var state = $('#txtexpState').val(); 
    var language = $('#txtexpLanguage').val(); 
    var IsAssociated = $('#inlineRadio1').prop('checked');
    
    var finalquery;
    var location;
    //if (query !== '' || query !== undefined) {
    //finalquery = "Pincode - " + Pincode + " || Language - " + Language + " || Query - " + query;
    //}
    //else {

    finalquery = "Language - " + language;
    location = "City - " + city + " || Pincode - " + Pincode + "";
    

    var source = '';
    var medium = '';
    var campaign = '';
    var term = '';
    var keyword = '';
    var adgroup = '';
    var content = '';

    var wedding = '';
    var gclid = '';

    if ((getUrlVars()["utm_source"] || '') !== '') {
        source = (getUrlVars()["utm_source"] || '');
        medium = (getUrlVars()["utm_medium"] || '');
        campaign = (getUrlVars()["utm_campaign"] || '');
        term = (getUrlVars()["utm_term"] || '');
        keyword = (getUrlVars()["utm_keyword"] || '');
        adgroup = (getUrlVars()["utm_adgroup"] || '');
        content = (getUrlVars()["utm_content"] || '');
        wedding = (getUrlVars()["wedding"] || '');
        gclid = (getUrlVars()["gclid"] || '');
    }

    var previousurl = document.referrer;
    $("#send").prop('disabled', true);
    var postdata = {
        Name: Fullname, Telephone: txtexpPhone, Pincode: Pincode, City: city, State: state, PreferredLanguage: language, IsAssociated: IsAssociated, Source: source,
        Campaign: campaign, Medium: medium, PreviousUrl: previousurl
    };
    $.ajax({
        url: '/Home/InserPaintertData',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(postdata),
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            console.log(data);
            $("#send").prop('disabled', false);
            if (data.succeeded) {
                ResetForm();
                $('#consultFormModal').modal('show');
                IsResult = true;

            }
            else {
                $("#send").prop('disabled', false);
                ShowErrorMessage(data.message);
                return false;
            }

        },
        error: function (xhr, status) {
            $("#send").prop('disabled', false);
            var msg = 'Please try again!';
            ShowErrorMessage(msg);
            //return false;
        }
    });
    return IsResult;
}


$(".btnModalClose").click(function () {
    console.log("hi");
    $('#consultFormModal').modal('hide')
});

function CloseModal() {
    $('#consultFormModal').modal('hide');

}

function ShowErrorMessage(msg) {
    $('#SuccessMsgExp').hide();
    $('#ErrorMsgExp').show();
    $('#ErrorMsgExp').html(msg);
}

function ResetForm() {
    $('#txtexpLanguage').val('0');
    $('#txtexpName').val("");
    $('#txtexpPhone').val("");
    $('#txtexpPinCode').val("");
    $('#txtexpState').val("");
    $('#txtexpCity').val("");
    $('#txtexpQuery').val("");
    $('#language').val("0");
    $('#inlineRadio2').prop('checked', true);
}

function getValidationMessageName() {
    var name = document.getElementById("txtexpName").value;
    if (name.trim() == "" || name.trim() == "Please enter your name") {
        $('#spnName').text('Please enter your name')
    }
    else if (name.trim() != "" && name.trim() != "Please enter your name" && ischar(name.trim()) == false) {
        $('#spnName').text('Please enter valid name');
    }
    else if (!(chkSpecialchar(name.trim()))) {
        $('#spnName').text('Please enter valid name');
    }
    else {
        $('#spnName').text('')
    }
}

function getValidationMessagePhone() {
    var phoneNumber = document.getElementById("txtexpPhone").value;
    if (phoneNumber == "" || phoneNumber == "Mobile Number") {
        $('#spnMobileNumber').text('Please enter your mobile number')
    }
    else if (isInteger(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter numbers only')
    }
    else if (phoneNumber.length != 10) {
        $('#spnMobileNumber').text('Your mobile number must contain 10 digits')
    }
    else if (phoneNumber == "0000000000" || phoneNumber == "6666666666" || phoneNumber == "7777777777" || phoneNumber == "8888888888" || phoneNumber == "9999999999" || phoneNumber == "9876543210" || phoneNumber == "0123456789") {
        $('#spnMobileNumber').text('Please enter valid mobile number');
    }
    else if (/^[6-9][0-9]{9}$/.test(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter valid mobile number');
    }
    else {
        $('#spnMobileNumber').text('');
    }
}

function getValidationMessagePinCode() {
    var pincode = document.getElementById("txtexpPinCode").value;
    if (pincode.trim() == "" || pincode.trim() == "0") {
        $('#spnPinCode').text('Please enter valid pin code');
        IsValid = false;
    }
    else if (isInteger(pincode) == false) {
        $('#spnPinCode').text('Please enter numbers only')
        IsValid = false;
    }
    else if (pincode.length < 6) {
        $('#spnPinCode').text('Your pin code must contain 6 digits')
        IsValid = false;
    }
    else {
        $('#spnPinCode').text('');
    }

}

function getValidationMsgCity() {
    var city = document.getElementById("txtexpCity").value;
    if (city.trim() == "" || city.trim() == "Please enter your City") {
        $('#spnCity').text('Please enter your City')
    }
    else if (city.trim() != "" && city.trim() != "Please enter your City" && ischar(city.trim()) == false) {
        $('#spnCity').text('Please enter valid City');
    }
    else if (!(chkSpecialchar(city.trim()))) {
        $('#spnCity').text('Please enter valid City');
    }
    else {
        $('#spnCity').text('')
    }
}

function getValidationMsgState() {
    var state = document.getElementById("txtexpState").value;
    if (state.trim() == "" || state.trim() == "Please enter your state") {
        $('#spnState').text('Please enter your state')
    }
    else if (state.trim() != "" && state.trim() != "Please enter your state" && ischar(state.trim()) == false) {
        $('#spnState').text('Please enter valid State');
    }
    else if (!(chkSpecialchar(state.trim()))) {
        $('#spnState').text('Please enter valid State');
    }
    else {
        $('#spnState').text('')
    }
}

// function getValidationMessageEmail() {
//     var email = document.getElementById("txtexpEmail").value;
//     if (email.trim() == "" || email.trim() == "Email Address") {
//         $('#spnEmail').text('Please enter your email address');
//     }
//     else if (ValidateEmail(email.trim()) == false) {
//         $('#spnEmail').text('Please enter valid email address');
//     }
//     else {
//         $('#spnEmail').text('');
//     }
// }

function getValidationMessageGst() {
    var gst = $("#txtexpGst").val();
    if (gst.trim() == "" || gst.trim() == "0") {
        $('#spnGst').text('Please enter your GSTIN Number');
        return false; 
    }
    else {
     var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
     if (regex.test($("#txtexpGst").val())) {
         $('#spnGst').text('');
         return true; 
     } else {
         $('#spnGst').text('Please enter your valid GSTIN Number');
         return false; 
     }
    } 
}



/* Start Get in Touch */
function validateExp() {
    var IsValid = true;
    //Name   
    var name = document.getElementById("txtexpName").value;
    if (name.trim() == "" || name.trim() == "Please enter your name") {
        $('#spnName').text('Please enter your name')
        IsValid = false;
    }
    else if (name.trim() != "" && name.trim() != "Please enter your name" && ischar(name.trim()) == false) {
        $('#spnName').text('Please enter valid name');
        IsValid = false;
    }
    else if (!(chkSpecialchar(name.trim()))) {
        $('#spnName').text('Please enter valid name');
        IsValid = false;
    }
    else {
        $('#spnName').text('')
    }

    //Mobile Number


    var phoneNumber = document.getElementById("txtexpPhone").value;
    if (phoneNumber == "" || phoneNumber == "Mobile Number") {
        $('#spnMobileNumber').text('Please enter your mobile number')
        IsValid = false;
    }
    else if (isInteger(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter numbers only')
        IsValid = false;
    }
    else if (phoneNumber.length != 10) {
        $('#spnMobileNumber').text('Your mobile number must contain 10 digits')
        IsValid = false;
    }
    else if (phoneNumber == "0000000000" || phoneNumber == "6666666666" || phoneNumber == "7777777777" || phoneNumber == "8888888888" || phoneNumber == "9999999999" || phoneNumber == "9876543210" || phoneNumber == "0123456789") {
        $('#spnMobileNumber').text('Please enter valid mobile number');
        IsValid = false;
    }
    else if (/^[6-9][0-9]{9}$/.test(phoneNumber) == false) {
        $('#spnMobileNumber').text('Please enter valid mobile number');
        IsValid = false;
    }
    else {
        $('#spnMobileNumber').text('');
    }

    //Pincode 
    var pincode = document.getElementById("txtexpPinCode").value;
    if (pincode.trim() == "" || pincode.trim() == "0") {
        $('#spnPinCode').text('Please enter valid pin code');
        IsValid = false;
    }
    else if (isInteger(pincode) == false) {
        $('#spnPinCode').text('Please enter numbers only')
        IsValid = false;
    }
    else if (pincode.length < 6) {
        $('#spnPinCode').text('Your pin code must contain 6 digits')
        IsValid = false;
    }
    else {
        $('#spnPinCode').text('');
    }

      //City
      var city = document.getElementById("txtexpCity").value;
      if (city.trim() == "" || city.trim() == "Please enter your City") {
          $('#spnCity').text('Please enter your city')
          IsValid = false;
      }
      else if (city.trim() != "" && city.trim() != "Please enter your City" && ischar(city.trim()) == false) {
          $('#spnCity').text('Please enter valid City');
          IsValid = false;
      }
      else if (!(chkSpecialchar(city.trim()))) {
          $('#spnCity').text('Please enter valid City');
          IsValid = false;
      }
      else {
          $('#spnCity').text('')
      }

       //City
       var state = document.getElementById("txtexpState").value;
       if (state.trim() == "" || state.trim() == "Please enter your state") {
           $('#spnState').text('Please enter your state')
           IsValid = false;
       }
       else if (state.trim() != "" && state.trim() != "Please enter your state" && ischar(state.trim()) == false) {
           $('#spnState').text('Please enter valid State');
           IsValid = false;
       }
       else if (!(chkSpecialchar(state.trim()))) {
           $('#spnState').text('Please enter valid State');
           IsValid = false;
       }
       else {
           $('#spnState').text('')
       } 
    //Prefered Language 
    var language = $("#txtexpLanguage").val();
    if (language.trim() == "" || language.trim() == "0") {
        $('#spnLanguage').text('Please select your preferred language');
        IsValid = false;
    }
    else {
        $('#spnLanguage').text('');
    }


  

    //Accept Terms and Condition
    var isTermsAccepted = document.getElementById("chkAccept");
    if (!isTermsAccepted.checked) {
        $('#spnAccept').text('Please accept terms and conditions');
        IsValid = false;
    }
    else {
        $('#spnAccept').text('');
    }

    if (IsValid) {
        return true;
    }

}

function ischar(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.

        var c = s.charAt(i);
        if (!((c < "0") || (c > "9"))) {
            return false;
        }
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function chkSpecialchar(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.

        var c = s.charAt(i);
        if (c == "!" || c == "#" || c == "'" || c == "^" || c == ":" || c == "\"" || c == "*" || c == ":" || c == "(" || c == ")" || c == "+" || c == "=" || c == "|" || c == "<" || c == ">" || c == "%" || c == "?" || c == "/" || c == "@") {
            return false;
        }
    }
    // All characters are numbers.
    return true;
}

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) {
            return false;
        }
    }
    // All characters are numbers.
    return true;
}


// START the "trim" function
function trim(inputString) {
    // Removes leading and trailing spaces from the passed string. Also removes
    // consecutive spaces and replaces it with one space. If something besides
    // a string is passed in (null, custom object, etc.) then return the input.
    if (typeof inputString != "string") { return inputString; }

    var retValue = inputString;
    var ch = retValue.substring(0, 1);

    while (ch == " ") { // Check for spaces at the beginning of the string
        retValue = retValue.substring(1, retValue.length);
        ch = retValue.substring(0, 1);
    }

    ch = retValue.substring(retValue.length - 1, retValue.length);

    while (ch == " ") { // Check for spaces at the end of the string
        retValue = retValue.substring(0, retValue.length - 1);
        ch = retValue.substring(retValue.length - 1, retValue.length);
    }

    while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
        retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ") + 1, retValue.length); // Again, there are two spaces in each of the strings
    }

    return retValue; // Return the trimmed string back to the user
}
// END the "trim" function

function ValidateEmail(email) {
    var isValid = false;
    //var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    isValid = regex.test(email);
    return isValid;
}

function HasConsucutiveRepeatNumbers(number, repeatCounter) {

    var _number = number.toString();
    for (var i = 0; i <= 9; i++) {
        var repeatNumber = Array(repeatCounter).join(i);

        if (_number.indexOf(repeatNumber) != -1) {
            return true;
        }
    }

    return false;

}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

$("#txtexpLanguage").change(function () {
    var language = $(this).val();
    if (language.trim() == "" || language.trim() == "0") {
        $('#spnLanguage').text('Please select your language');
    }
    else {
        $('#spnLanguage').text('');
    }
});

$('#chkAccept').on('change', function () {
    // From the other examples
    if (!this.checked) {
        $('#spnAccept').text('Please accept terms and conditions');
    }
    else {
        $('#spnAccept').text('');
    }
});

function ShowStep2Error(msg) {
    $('#lblStep2Error').text(msg);
    $('#lblStep2Error').show();
}
function HideStep2Error() {
    $('#lblStep2Error').text(' ');
    $('#lblStep2Error').hide();
}