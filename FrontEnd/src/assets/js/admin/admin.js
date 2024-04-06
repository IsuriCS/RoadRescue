

const API_URL = "http://localhost:8080/roadRescue/Admin";


// Navigate
function showDashboard() {
    document.querySelector("#dashboardLink").classList.add("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#verification").style.display = "none";



}
function showcus() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");




    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "block";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";

    $("#load-container").show();
    $("#CustomerList tbody").empty();

    $.ajax({
        url: API_URL + "/CustomerList",
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#load-container").hide();

                var tableBody = document.querySelector("#CustomerList tbody");

                // Start from index 1 to skip the first item in the JSON array
                for (var i = 0; i < res.data.length; i++) {
                    var datai = res.data[i];
                    var row = tableBody.insertRow();
                    row.insertCell(0).textContent = datai.customerId || '';
                    row.insertCell(1).textContent = datai.FullName || '--';
                    row.insertCell(2).textContent = datai.contact || '';
                    row.insertCell(3).textContent = datai.nServiceRequest || '0';
                    row.insertCell(4).textContent = datai.nSupportTickets || '0';

                    row.addEventListener('click', function () {
                        var customerId = this.cells[0].textContent;
                        showprof(res, customerId);

                    })
                }

            }
            else {
                console.log("error");
            }
        }
    });

    // Search Customer
    document.getElementById("searchCustomer").addEventListener("input", function () {
        var searchValue = this.value.toUpperCase();
        var table = document.getElementById("CustomerList");
        var tr = table.getElementsByTagName("tr");
        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                var textValue = td.textContent || td.innerText;
                if (textValue.toUpperCase().indexOf(searchValue) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    );


}


function showprof(res, customerId) {

    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "block";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";

    // Update the title
    var title = document.querySelector("#cusprof .topRow h1");
    title.innerHTML = `Customer > C${customerId.padStart(3, '0')}`;



    for (var i = 0; i < res.data.length; i++) {

        if (res.data[i].customerId == customerId) {
            var datai = res.data[i];
            console.log(datai);
            document.getElementById("cid").innerHTML = datai.customerId;
            document.getElementById("fname").innerHTML = datai.fname || '-';
            document.getElementById("lname").innerHTML = datai.lname || '-';
            document.getElementById("email").innerHTML = datai.email || '-';
            document.getElementById("cnum").innerHTML = datai.contact || '-';

            if (datai.nSupportTickets > 0) {

                var ticketList = document.querySelectorAll(".SuppotTicketcard");
                console.log(ticketList);
                while (ticketList.length > 0) {
                    console.log("inside while");
                    ticketList.forEach(function (ticket) {
                        ticket.remove();
                    });
                }
                console.log("inside if");
                var temp = document.getElementById("supportTicketTemplate");
                var clone = temp.content.cloneNode(true);
                document.getElementById("no_support_tickets").style.display = "none";
                document.getElementById("support_ticket_list").style.display = "block";
                document.getElementById("support_ticket_list").appendChild(clone);

            }
            else {
                console.log("inside else");

                document.getElementById("no_support_tickets").style.display = "block";
                document.getElementById("support_ticket_list").style.display = "none";

            }
        }

    }


}

function showGarageOwner() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.add("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";

}

function showGarageProf() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "block";
    document.querySelector("#maintainancePersonnel").style.display = "none";

    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";

}

function showMaintainancePersonnel() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.add("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "block";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";

}

function showMPProf() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "block";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";


}

function showcsmember() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "block";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";


}

function showcsprof() {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "block";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";

}

function showVerification() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "block";
    document.querySelector("#reports").style.display = "none";
}

function showReports() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.add("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "block";

    document.querySelector("#verification").style.display = "none";



}

function showProfile() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

    document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#maintainancePersonnel").style.display = "none";
    document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#adminProfile").style.display = "block";
}

// Dropdown side menu

let dropDownContainer = document.querySelector(".dropdown-container");
function toggleDropdown() {
    dropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}

let spdropDownContainer = document.querySelector(".spdropdown-container");
function sptoggleDropdown() {
    spdropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}

// Link table rows
const tableRows = document.querySelectorAll('tr[data-href]');
tableRows.forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = row.getAttribute('data-href');
    });
});


// **************DashBoard-Recent moment bar chat*******************
var ctx = document.getElementById("barchatRecent").getContext('2d');
const xValues = ["January", "February", "March", "April", "May"];
const yValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];

new Chart("barchatRecent", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            label: "Registations",
            data: [12, 19, 3, 17, 28, 24, 7],
            backgroundColor: "#0095FF"
        }, {
            label: "Account Deletions",
            data: [30, 29, 5, 5, 20, 3, 10],
            backgroundColor: "#00E096"
        }]
    },
    options: {
        plugins: { legend: { labels: { color: "white" } } },
        barThickness: 20,
        scales: {
            x: {
                ticks: {
                    color: "white"
                }
            },
            y: {
                ticks: {
                    color: "white"
                }
            }
        }

    }



});

// **************DashBoard-Payment line Chart*******************
var ctx = document.getElementById("linePayment").getContext('2d');


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [{
            label: 'Cash Payments', // Name the series
            data: [500, 50, 2424, 1440, 1441, 411, 544, 47, 555, 811], // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1
        },
        {
            label: 'Online Payments', // Name the series
            data: [50, 50, 424, 140, 141, 411, 44, 47, 55, 871], // Specify the data values array
            fill: false,
            borderColor: '#00E096', // Add custom color border (Line)
            backgroundColor: '#00E096', // Add custom color background (Points and Fill)
            borderWidth: 1
        }]
    },
    options: {
        plugins: { legend: { labels: { color: "white" } } },
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        scales: {
            x: {
                ticks: {
                    color: "white"
                }
            },
            y: {
                ticks: {
                    color: "white"
                }
            }
        }
    }
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


// ---------------------------------------------------------------------------------------------------------------------Ajex

// ++++++++++++++++++++++++Dashboard****************
$("#load-container").show();

$.ajax({
    url: API_URL + "/customerCard",
    method: "GET",
    success: function (res) {
        if (res.status == 200) {
            $("#load-container").hide();
            document.querySelector("#registeredCustomersNum").innerHTML = res.data[0].CustomerNum;
            document.querySelector("#registeredSproviders").innerHTML = res.data[0].sproviderNum;
            document.querySelector("#completedTasksCount").innerHTML = res.data[0].CompletedTaskCount;
            document.querySelector("#reportCount").innerHTML = res.data[0].SupportTicketCount;

            var tableBody = document.querySelector("#RecentReportSection tbody");

            // Start from index 1 to skip the first item in the JSON array
            for (var i = 1; i < res.data.length; i++) {
                var datai = res.data[i];
                var row = tableBody.insertRow();
                row.insertCell(0).textContent = datai.name || '';
                row.insertCell(1).textContent = datai.title || '';
                row.insertCell(2).textContent = datai.date || '';
                row.insertCell(3).textContent = datai.status.charAt(0).toUpperCase() + datai.status.slice(1) || '';
            }

        }
        else {
            console.log("error");
        }
    }
});

