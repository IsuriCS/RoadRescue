// Navigate
function showDashboard() {
    document.querySelector("#dashboardLink").classList.add("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");



    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";


}


function showcus() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#customerDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "block";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    

}

function showprof() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "block";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    

}

function showGarageOwner() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");  
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#GarageDropDown").classList.add("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";



}

function showGarageProf() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "block";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
   


}

function showMaintainancePersonnel() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.add("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "block";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
 


}

function showMPProf() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "block";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";



}

function showTicket(){
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "block";
    document.querySelector("#csProfile").style.display = "none";
 

}


function showProfile  (){
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "block";
 

}


// const API_URL = "http://localhost:8080/roadRescueBackend";
// $.ajax({
//     url: API_URL + "/supportMember",
//     method: "GET",
//     success: function (res) {
//         res = $.parseJSON(res);
//         if (res.status == 200) {
//             try{
//                 res.data.forEach(supportMember => {
//                     document.querySelector("#id").innerHTML = res.data[0].supportMemberId;
//                     document.querySelector("#f_name").innerHTML = res.data[0].f_name;
//                     document.querySelector("#l_name").innerHTML = res.data[0].l_name;
//                     document.querySelector("#phone_number").innerHTML = res.data[0].phone_number;
//                     document.querySelector("#reg_timestamp").innerHTML = res.data[0].reg_timestamp;
//                 });
//
//             }catch{
//                 console.log("error");
//             }
//
//
//         }
//     }
// });



// Dropdown side menu

let dropDownContainer = document.querySelector(".dropdown-container");
function toggleDropdown() {
    dropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}

// Link table rows
const tableRows = document.querySelectorAll('tr[data-href]');
tableRows.forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = row.getAttribute('data-href');
    });
});



// **************FAQ-Toggle answer of question*******************

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;

            // Toggle the visibility of the answer
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }

            const faqItem = question.parentElement;
            faqItem.classList.toggle("active");

            // Toggle a 'clicked' class on the question to change its background color
            question.classList.toggle("clicked");



        });
    });
});

// ****************Nav bar drop down*******************
// document.addEventListener("DOMContentLoaded", function () {
//     const button = document.querySelectorAll(".dropDownBu");

//     button.forEach(function (question) {
//         question.addEventListener("click", function () {
//             const answer = this.nextElementSibling;

//             // Toggle the visibility of the answer
//             if (answer.style.display === "block") {
//                 answer.style.display = "none";
//             } else {
//                 answer.style.display = "block";
//             }

//             const faqItem = question.parentElement;
//             faqItem.classList.toggle("active");

//             // Toggle a 'clicked' class on the question to change its background color
//             question.classList.toggle("clicked");



//         });
//     });
// });






// }

const API_URL = "http://localhost:8080/roadRescueBackend";
$.ajax({
    url: API_URL + "/customerSupport",
    method: "GET",
    success: function (res) {
        res = $.parseJSON(res);
        if (res.status == 200) {
            try{
                res.data.forEach(customer => {
                    document.querySelector("#customer_support_member_id").innerHTML = res.data[0].customer_support_member_id;
                    // document.querySelector("#registeredCustomersNum").innerHTML = res.data[0].ticketId;
                    // document.querySelector("#registeredSproviders").innerHTML = res.data[0].status;
                    document.querySelector("#description").innerHTML = res.data[0].description;
                    document.querySelector("#title").innerHTML = res.data[0].title;
                    document.querySelector("#created_time").innerHTML = res.data[0].created_time;
                });
                
            }catch{
                console.log("error");
            }
         
        
    }
}
});



function postData() {
    let jsonObj = {
        solution : document.getElementById("solution").value,
        supportTickerId : parseInt(document.querySelector("#customer_support_member_id").innerHTML)
    }

    console.log(JSON.stringify(jsonObj));

    $.ajax({
        url: API_URL + "/customerSupport",
        method: "PUT",
        data: JSON.stringify(jsonObj),
        success: function (res) {
            res = $.parseJSON(res);
            if (res.status == 200) {
                alert(res.message);
            }
        }
    });
}
