const API_URL = "http://localhost:8080/roadRescue";

var otp;
function sendOTP() {
    var phone = document.getElementById("phone").value;
    console.log(phone);
    $.ajax({
        url: API_URL + "/login?option=admin&searchId=" + String(phone),
        method: "GET",
        success: function (response) {
            if (response.status == 200) {
                var message = response.message;
                otp = message.split("-")[1];

                alert("OTP sent successfully");
            }
        }
    });
}

function submitLogin() {
    var enterdotp = document.getElementById("otp").value;
    if (otp == enterdotp) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid OTP");
    }
}