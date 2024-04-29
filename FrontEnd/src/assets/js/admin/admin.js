

const API_URL = "http://localhost:8080/roadRescue";


var messagebox = document.querySelector("#messageBox");
var messageimg = document.querySelector("#messageBox #proccessing_boxes #icon img");
var messagetext = document.querySelector("#messageBox #proccessing_boxes #Text p");
var messagebutton = document.getElementById("proccessingBoxButtons");

// abc_abc ----> Abc Abc
function formatString(str) {
    var words = str.split('_').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
}

// 0712345678 ----> +94712345678
function formatPhoneNumber(phoneNumber) {
    var cleanedNumber = phoneNumber.replace(/\D/g, '');


    // if (cleanedNumber.startsWith('0')) {
    //     cleanedNumber = cleanedNumber.substring(1);
    // }


    // if (!cleanedNumber.startsWith('+94')) {
    //     cleanedNumber = '+94' + cleanedNumber;
    // }

    return cleanedNumber;
}

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
    document.querySelector("#techDropdown").classList.remove("dropDownActive");

    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";

    document.addEventListener("DOMContentLoaded", function () {
        // **************DashBoard-Recent moment bar chat*******************

        var xValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var yValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];
        var rdata = Array.from({ length: 12 }, () => 0);
        var ddata = Array.from({ length: 12 }, () => 0);
        var online = Array.from({ length: 12 }, () => 0);
        var cash = Array.from({ length: 12 }, () => 0);

        $("#load-container").show();

        $.ajax({
            url: API_URL + "/Admin/customerCard",
            method: "GET",
            success: function (res) {
                if (res.status == 200) {
                    $("#load-container").hide();

                    var currentDate = new Date();
                    var currentMonth = currentDate.getMonth();
                    console.log(currentMonth);
                    var currentYear = currentDate.getFullYear();
                    var monthsToShow = [];
                    var months = [];

                    var sp = res.data.serviceP;
                    var Analytics = res.data.analyticsData;
                    console.log(sp);
                    // Analytics Cards
                    document.querySelector("#registeredCustomersNum").innerHTML = Analytics[0].CustomerNum;
                    document.querySelector("#registeredSproviders").innerHTML = Analytics[0].sproviderNum;
                    document.querySelector("#completedTasksCount").innerHTML = Analytics[0].CompletedTaskCount;
                    document.querySelector("#reportCount").innerHTML = Analytics[0].SupportTicketCount;

                    var tableBody = document.querySelector("#RecentReportSection tbody");



                    // Recent 5 support cards table
                    var complaints = Analytics[1];
                    for (var i = 1; i < 6; i++) {
                        (function () {
                            var datai = complaints[i];

                            var row = tableBody.insertRow();
                            row.insertCell(0).textContent = datai.name || '';
                            row.insertCell(1).textContent = datai.title || '';
                            row.insertCell(2).textContent = datai.date || '';
                            row.insertCell(3).textContent = datai.status.charAt(0).toUpperCase() + datai.status.slice(1) || '';
                            var id = datai.ticketId;
                            row.addEventListener('click', function () {
                                var name = this.cells[0].textContent;
                                showsupportTicket(id, name, "getbyNameandId");
                            });
                        })();
                    }


                    // Verifications
                    // var verificationcount = 0;
                    // var templatecount = 0;
                    // sp.forEach(function (entry) {
                    //     if (entry.verify === "No") {
                    //         verificationcount++;
                    //         if (templatecount < 3) {
                    //             templatecount++;
                    //             var temp = document.getElementById("verificationRequestsTemplate");
                    //             var clone = temp.content.cloneNode(true);
                    //             var pElement = clone.querySelector("p"); // Adjusted selector
                    //             if (pElement) {
                    //                 pElement.textContent = entry.garageName || '-';
                    //                 document.querySelector(".table").appendChild(clone); // Changed selector
                    //             }
                    //         }
                    //     }
                    // });

                    // document.querySelector("#number").textContent = verificationcount;

                    // Charts Data
                    // Account Deletions and Registrations
                    var registation = Analytics[2];
                    var deletions = Analytics[3];
                    var Payment = Analytics[4];

                    registation.forEach(function (entry) {
                        var monthIndex = xValues.indexOf(entry.month);

                        if (monthIndex !== -1) {
                            rdata[monthIndex] += entry.registrations;
                        }
                    });

                    deletions.forEach(function (entry) {
                        var monthIndex = xValues.indexOf(entry.month);
                        if (monthIndex !== -1) {
                            ddata[monthIndex] += entry.deletion;
                        }
                    });

                    // Payment.forEach(function (entry) {
                    //     var monthIndex = entry.month - 1;

                    //     if (monthIndex !== -1) {
                    //         online[monthIndex] += entry.online;
                    //         cash[monthIndex] += entry.cash;
                    //     }
                    // });


                    for (var i = 0; i < 5; i++) {
                        var monthIndex = (currentMonth - i) % 12;

                        if (monthIndex < 0) {
                            monthIndex += 12;
                            currentYear -= 1;
                        }
                        months.unshift(`${xValues[monthIndex]}`);

                        monthsToShow.unshift(`${xValues[monthIndex]} ${currentYear}`);
                    }

                    var rdatafilter = [];
                    var ddatafilter = [];
                    // var onlinefilter = [];
                    // var cashfilter = [];
                    var i = 0;
                    months.forEach(function (month) {
                        var mindex = xValues.indexOf(month);

                        rdatafilter[i] = rdata[mindex];
                        ddatafilter[i] = ddata[mindex];
                        // onlinefilter[i] = online[mindex];
                        // cashfilter[i] = cash[mindex];

                        i++;
                    });

                    // var monthlyProfit = [];
                    // onlinefilter.forEach(function (value) {
                    //     monthlyProfit.push(value * 0.1);
                    // });


                    // **************DashBoard-Registation Bar Chart*******************
                    var ctx1 = document.getElementById("barchatRecent").getContext('2d');
                    new Chart("barchatRecent", {
                        type: "bar",
                        data: {
                            labels: monthsToShow,
                            datasets: [{
                                label: "Registations",
                                data: rdatafilter,
                                backgroundColor: "#54bebe"
                            }, {
                                label: "Account Deletions",
                                data: ddatafilter,
                                backgroundColor: "#c80064"
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
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



                    // // **************DashBoard-Payment line Chart*******************
                    // var ctx = document.getElementById("linePayment").getContext('2d');
                    // var myChart = new Chart(ctx, {
                    //     type: 'line',
                    //     data: {
                    //         labels: monthsToShow,
                    //         datasets: [{
                    //             label: 'Cash Payments',
                    //             data: cashfilter,
                    //             fill: false,
                    //             borderColor: '#2196f3',
                    //             backgroundColor: '#2196f3',
                    //             borderWidth: 1
                    //         },
                    //         {
                    //             label: 'Online Payments',
                    //             data: onlinefilter,
                    //             fill: false,
                    //             borderColor: '#00E096',
                    //             backgroundColor: '#00E096',
                    //             borderWidth: 1
                    //         }]
                    //     },
                    //     options: {
                    //         plugins: { legend: { labels: { color: "white" } } },
                    //         responsive: true,
                    //         maintainAspectRatio: false,
                    //         scales: {
                    //             x: {
                    //                 ticks: {
                    //                     color: "white"
                    //                 }
                    //             },
                    //             y: {
                    //                 ticks: {
                    //                     color: "white"
                    //                 }
                    //             }
                    //         }
                    //     }
                    // });

                    // // *************Mounthly Profit Pie Chart*******************
                    // barColors = ["#193741", "#3e5e63", "#588184", "#7ea996", "#90c5a7"]
                    // new Chart("lineChartProfit", {
                    //     type: "line",
                    //     data: {
                    //         labels: monthsToShow,
                    //         datasets: [{
                    //             label: 'Monthly Profit',
                    //             data: monthlyProfit,
                    //             fill: false,
                    //             borderColor: '#2196f3',
                    //             backgroundColor: '#2196f3',
                    //             borderWidth: 1
                    //         }]
                    //     },
                    //     options: {
                    //         plugins: { legend: { labels: { color: "white" } } },
                    //         responsive: true,
                    //         maintainAspectRatio: false,
                    //         scales: {
                    //             x: {
                    //                 ticks: {
                    //                     color: "white"
                    //                 }
                    //             },
                    //             y: {
                    //                 ticks: {
                    //                     color: "white"
                    //                 }
                    //             }
                    //         }
                    //     }
                    // });


                    // view location
                    var splocation = res.data.locations.ServiceProviders;
                    var srlocation = res.data.locations.ServiceRequests;

                    var spCoordinates = splocation.map(function (location) {
                        var coordinates = location.split(','); // Assuming coordinates are in format "latitude,longitude"
                        return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
                    });

                    const srcoordinates = srlocation.map(locationString => {
                        const matches = locationString.match(/latitude=(-?\d+\.\d+), longitude=(-?\d+\.\d+)/);
                        if (matches) {
                            return `${matches[1]},${matches[2]}`;
                        }
                    });

                    var srCoordinatesMark = srcoordinates.map(function (location) {
                        var coordinates = location.split(',');
                        return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
                    });


                    var map = L.map("spmap").setView(calculateMedianLocation(splocation), 12);


                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }).addTo(map);



                    spCoordinates.forEach(function (location) {

                        L.marker(location)
                            .addTo(map)
                            .bindPopup(location.name);
                    });



                    var map = L.map("map").setView(calculateMedianLocation(srcoordinates), 12);


                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }).addTo(map);



                    srCoordinatesMark.forEach(function (location) {

                        L.marker(location)
                            .addTo(map)
                            .bindPopup(location.name);
                    });



                    // Demand pie chart
                    var demand = res.data.demand;
                    const expertiseArray = demand.map(item => item.expertise);
                    const requestCountArray = demand.map(item => item.request_count);
                    var barColors = ["#54bebe", "#76c8c8", "#badbdb", "#dedad2", "#df979e", "#d7658b", "#c80064"]

                    new Chart("demandChart", {
                        type: "pie",
                        data: {
                            labels: expertiseArray,
                            datasets: [{
                                backgroundColor: barColors,
                                data: requestCountArray,
                                borderWidth: 0
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {

                                    position: 'right',
                                    labels: {
                                        color: "white"
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: "World Wide Wine Production"
                            }
                        }
                    });

                } else {
                    console.log("error");
                }
            }
        });



    });


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
    document.querySelector("#techDropdown").classList.remove("dropDownActive");

    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");




    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "block";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";

    $("#load-container").show();
    $("#CustomerList tbody").empty();

    $.ajax({
        url: API_URL + "/Admin/CustomerList",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();

                var tableBody = document.querySelector("#CustomerList tbody");

                // Start from index 1 to skip the first item in the JSON array
                for (var i = 0; i < res.data.length; i++) {
                    var datai = res.data[i];
                    var row = tableBody.insertRow();
                    // row.insertCell(0).textContent = datai.customerId || '';
                    row.insertCell(0).textContent = datai.FullName || '--';
                    row.insertCell(1).textContent = datai.contact || '';
                    row.insertCell(2).textContent = datai.nServiceRequest || '0';
                    row.insertCell(3).textContent = datai.nSupportTickets || '0';

                    row.setAttribute('data-customer-id', datai.customerId);

                    row.addEventListener('click', function () {
                        // Get the customer ID from the clicked row
                        var customerId = this.getAttribute('data-customer-id');
                        showprof(customerId);
                    });
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


function showprof(customerId) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "block";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.getElementById("editProfileForm").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.querySelector("#Reportcontent").style.display = "none";



    var data = {
        customerId: customerId,
        option: "getProfile"
    };

    $.ajax({
        url: API_URL + "/Admin/CustomerList",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {

            if (res.status == 201) {
                $("#load-container").hide();
                CustomerAnalytics(res, customerId);
            }
            else {
                console.log("error");
            }
        }
    });

}

function CustomerAnalytics(res, customerId) {


    var profile = res.data.profile;
    var ServiceRequests = res.data.requestLocations;
    var requestStatus = res.data.requestStatus;
    var Rating = res.data.ratings;
    var supportTickets = res.data.complaints;

    var title = document.querySelector("#cusprof .topRow h1");
    title.innerHTML = `Customer > ${profile.fname} ${profile.lname}`;
    // document.getElementById("cid").innerHTML = profile.customerId;
    document.getElementById("fname").innerHTML = profile.fname || '-';
    document.getElementById("lname").innerHTML = profile.lname || '-';
    document.getElementById("email").innerHTML = profile.email || '-';
    document.getElementById("cnum").innerHTML = profile.contact || '-';


    // Show Support Tickets and profile data
    if (supportTickets.length > 0) {

        // Remove created ticket cards
        // var ticketList = document.querySelectorAll(".SuppotTicketcard");

        // if (ticketList.length > 0) {
        //     ticketList.forEach(function (ticket) {
        //         ticket.remove();
        //     });
        // }

        // // request ticket details from backend
        // $.ajax({
        //     url: API_URL + "/customerSupport",
        //     method: "GET",
        //     success: function (res) {

        //         if (res.status == 200) {


        //             for (var i = 0; i < res.data.length; i++) {
        //                 (function () {
        //                     var datai = res.data[i];
        //                     if (datai.customerID == customerId) {


        //                         var temp = document.getElementById("supportTicketTemplate");
        //                         var clone = temp.content.cloneNode(true);
        //                         clone.querySelector(".SuppotTicketcard h1").textContent = `ST-${String(datai.ticketId).padStart(3, '0')}`;

        //                         var dateTime = new Date(datai.created_time);
        //                         var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
        //                         clone.querySelector(".SuppotTicketcard .row .date p").textContent = formattedDate;

        //                         // Update ticket title
        //                         clone.querySelector(".SuppotTicketcard .row .title p").textContent = datai.title;

        //                         // Change status button
        //                         var status = datai.status;
        //                         var sbutton = clone.querySelector(".SuppotTicketcard .solveButton button");

        //                         if (status.toLowerCase() == "pending") {
        //                             sbutton.classList.add("pending");
        //                             sbutton.textContent = "Pending";
        //                         }
        //                         else if (status.toLowerCase() == "solved") {
        //                             sbutton.classList.add("solved");
        //                             sbutton.textContent = "Solved";
        //                         }
        //                         else {
        //                             sbutton.classList.add("on_review");
        //                             sbutton.textContent = "On Review";
        //                         }

        //                         clone.querySelector(".SuppotTicketcard").addEventListener('click', function () {
        //                             showsupportTicket(datai.ticketId, name, "cus");


        //                         });
        //                         document.getElementById("no_support_tickets").style.display = "none";
        //                         document.getElementById("support_ticket_list").style.display = "block";
        //                         document.getElementById("support_ticket_list").appendChild(clone);
        //                     }
        //                 })();


        //             }
        //             $("#load-container").hide();
        //         }
        //         else {
        //             console.log("error");
        //         }
        //     }
        // })


        // Verifications                  
        // supportTickets.forEach(function (entry) {
        //     var temp = document.getElementById("customerComtemplate");
        //     var clone = temp.content.cloneNode(true);
        //     var pElement = clone.querySelector("p");
        //     if (pElement) {
        //         pElement.textContent = `H - ${entry.ticketId}`;
        //         clone.addEventListener('click', function () {
        //             showsupportTicket(entry.ticketId, profile.fname + " " + profile.lname, "cus");
        //         });
        //         document.querySelector(".table").appendChild(clone);
        //     }


        // });

        document.querySelector(".cutomerCWindow").innerHTML = `<template id="customerComtemplate">
                        <div class="customerComcards">
                          <p>Garage</p>
                          <span class="comstatus">Solved Tickets 8</span>
                        </div>
                        
                      </template>`;
        var complains = document.getElementById("PendingTickets");

        var complaintTemplate = document.querySelector("#customerComtemplate");
        if (complains.querySelector(".customerComcards") != null) {
            complains.querySelector(".customerComcards").remove();
        }

        for (var i = 0; i < supportTickets.length; i++) {
            var datai = supportTickets[i];
            var pcontent = `H${String(datai.ticketId).padStart(3, '0')}`;
            var spancontent = datai.status || 'No status';
            var clone = complaintTemplate.content.cloneNode(true);

            clone.querySelector("p").innerHTML = pcontent;
            clone.querySelector("span").innerHTML = `${spancontent}`;
            clone.querySelector(".customerComcards").addEventListener("click", function (ticketId) {
                return function () {
                    showsupportTicket(ticketId, profile.fname + " " + profile.lname, "cus");
                };
            }(datai.ticketId)); // Immediately invoked function to capture ticketId

            document.querySelector(".cutomerCWindow").appendChild(clone);

        }




    }
    else {
        $("#load-container").hide();
        document.querySelector("#PendingTickets").style.display = "none";

    }

    var editButton = document.createElement("button");
    editButton.id = "editProfileButton";
    editButton.className = "button";
    editButton.innerHTML = '<span class="material-symbols-outlined"> edit </span>Edit ';

    // Append edit button to the container
    var buttonContainer = document.getElementById("editButtonContainer");
    buttonContainer.innerHTML = ''; // Clear previous button
    buttonContainer.appendChild(editButton);

    // Save button
    var saveButton = document.createElement("button");
    saveButton.id = "saveProfileButton";
    saveButton.className = "button";
    saveButton.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 1vh; vertical-align: bottom;"> save </span>Save';
    saveButton.style.display = "none";

    // Append edit button to the container
    buttonContainer.appendChild(saveButton);

    // Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.id = "deletebutton";
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = '<span class="material-symbols-outlined"> delete </span>Delete';
    deleteButton.classList.add("button");


    // Append edit button to the container
    var deletebuttonContainer = document.getElementById("deleteButtonContainer");
    deletebuttonContainer.innerHTML = ''; // Clear previous button
    deletebuttonContainer.appendChild(deleteButton);

    // Add event listener to the edit button
    editButton.addEventListener("click", function () {

        var form = document.getElementById("editProfileForm");
        form.style.display = "block";
        document.getElementById("profile").style.display = "none";

        var form = document.getElementById("editProfileForm");
        form.style.display = "block";
        document.getElementById("profile").style.display = "none";

        // Display save button
        saveButton.style.display = "block";
        editButton.style.display = "none";

        // Disable delete button
        deletebutton.disabled = true;
        deletebutton.style.backgroundColor = "#6f102e";




        // document.querySelector("#editProfileForm #cid").innerHTML = datai.customerId;
        var datai = profile;
        document.querySelector("#editProfileForm #fname").value = datai.fname;
        document.querySelector("#editProfileForm #lname").value = datai.lname;
        document.querySelector("#editProfileForm #email").value = datai.email;
        document.querySelector("#editProfileForm #cnum").value = datai.contact;

        saveButton.addEventListener("click", function () {
            messagebox.style.display = "block";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
            messagetext.innerHTML = "Updating Profile...";
            messagebutton.style.display = "none";
            // Retrieve the updated values from the form fields
            // var customerId = document.querySelector("#editProfileForm #cid").innerHTML;
            var fname = document.querySelector("#editProfileForm #fname").value;
            var lname = document.querySelector("#editProfileForm #lname").value;
            var email = document.querySelector("#editProfileForm #email").value;
            var cnum = document.querySelector("#editProfileForm #cnum").value;

            // Perform validation if needed

            // Prepare the data to send via AJAX
            var data = {
                customerId: customerId,
                fname: fname,
                lname: lname,
                email: email,
                cnum: cnum,
                option: "updateDetails"
            };



            // Send an AJAX request to update the profile
            $.ajax({
                url: API_URL + '/Admin/CustomerList',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (response) {

                    messageimg.setAttribute("src", "../../assets/img/Tick.png");
                    messagetext.innerHTML = "Update Successful";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("editProfileForm").style.display = "none";
                    document.getElementById("profile").style.display = "block";
                    showprof(customerId);
                    deletebutton.disabled = false;
                    deletebutton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";



                },
                error: function (error) {

                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("editProfileForm").style.display = "none";
                    document.getElementById("profile").style.display = "block";
                    showprof(customerId);
                    deletebutton.disabled = false;
                    deletebutton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                    // Handle error response
                    console.error('Failed to update profile:', error);
                }
            });
        });
    });

    deleteButton.addEventListener("click", function () {
        messagebox.style.display = "block";
        messageimg.setAttribute("src", "../../assets/img/delete.png");
        messageimg.style.width = "13vh";
        messagetext.innerHTML = "Are you sure you want to delete this user?";

        var yesButton = document.createElement("button");
        yesButton.id = "yesButton";
        yesButton.className = "button";
        yesButton.innerHTML = "Yes";
        document.getElementById("proccessingBoxButtons").appendChild(yesButton);

        var NoBUtton = document.createElement("button");
        NoBUtton.id = "nobutton";
        NoBUtton.className = "button";
        NoBUtton.innerHTML = "No";
        NoBUtton.addEventListener("click", function () {
            messagebox.style.display = "none";
            messagebutton.innerHTML = '';

        });
        document.getElementById("proccessingBoxButtons").appendChild(NoBUtton);
        messagebutton.style.display = "block";

        yesButton.addEventListener("click", function () {
            messagetext.innerHTML = "Please Wait..."
            messagebox.style.display = "block"
            messagebutton.style.display = "none";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");

            $.ajax({
                url: API_URL + '/Admin/CustomerList?id=' + customerId,
                method: "DELETE",
                success: function (res) {
                    if (res.status == 200) {
                        messagetext.innerHTML = "Customer Deleted Successfully";
                        messageimg.setAttribute("src", "../../assets/img/Tick.png")
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        showcus();
                    }
                    else {
                        messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                        messagetext.innerHTML = "Something went wrong. Try Again";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                    }
                },
                error: function (error) {
                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                }

            })
        });
    });


    // Analytics
    // map-----------------------------------
    document.getElementById('mapcontainer').innerHTML = `<div id="customerRequestmap" class="map"></div>`
    const ServiceRequestsCordinatesArray = ServiceRequests.map(locationString => {
        const matches = locationString.match(/latitude=(-?\d+\.\d+), longitude=(-?\d+\.\d+)/);
        if (matches) {
            return `${matches[1]},${matches[2]}`;
        }
    });

    var ServiceRequestsCordinates = ServiceRequestsCordinatesArray.map(function (location) {
        var coordinates = location.split(',');
        return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
    });


    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("customerRequestmap").setView(calculateMedianLocation(ServiceRequestsCordinatesArray), 12);



    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);



    ServiceRequestsCordinates.forEach(function (location) {

        L.marker(location)
            .addTo(map)
            .bindPopup(location.name);
    });


    // Request Status------------------------------------------

    document.querySelector(".requestgraph").innerHTML = '<canvas id="srpieChart" style="width: 100%"></canvas>'
    var status = ["Completed Services", "Cancelled Services"];
    var count = [0, 0];
    requestStatus.forEach(function (entry) {
        if (entry.status == "Complete") {
            count[0] = entry.count;
        }
        else {
            count[1] = entry.count;
        }
    });
    document.querySelector(".requestChart h1").innerHTML = "Total Service Requests " + (Number(count[0]) + Number(count[1]));

    var barColors = ["#54bebe", "#c80064"]

    new Chart("srpieChart", {
        type: "pie",
        data: {
            labels: status,
            datasets: [{
                backgroundColor: barColors,
                data: count,
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {


                    labels: {
                        color: "white"
                    }
                }
            },
            title: {
                display: true,
                text: "World Wide Wine Production"
            }
        }
    });


    // Rating------------------------------------------
    var ratingCounts = Rating.map(item => ({ rating: parseInt(item.rating), count: parseInt(item.count) }));
    var rating = ratingCounts.map(item => item.rating);
    var halfcount = ratingCounts.map(item => item.count);


    var total = 0;
    var count = [0, 0, 0, 0, 0, 0];
    for (i = 0; i <= 5; i++) {
        if (rating.includes(i)) {
            count[i] = halfcount[rating.indexOf(i)];
            total += halfcount[rating.indexOf(i)];
        }
    }

    var percentageRatings = []
    count.forEach(function (entry) {
        if (entry == 0) {
            percentageRatings.push({ percentage: '0%' });
        }
        else {
            percentageRatings.push({ percentage: `${(entry / total) * 100}%` });
        }
    });

    console.log(rating);
    console.log(halfcount);
    console.log(percentageRatings);
    console.log(count);


    document.querySelector(".bar-5").style.width = percentageRatings[5].percentage;
    document.querySelector(".bar-4").style.width = percentageRatings[4].percentage;
    document.querySelector(".bar-3").style.width = percentageRatings[3].percentage;
    document.querySelector(".bar-2").style.width = percentageRatings[2].percentage;
    document.querySelector(".bar-1").style.width = percentageRatings[1].percentage;


    document.querySelector(".text-5 div").innerHTML = count[0] || '0';
    document.querySelector(".text-4 div").innerHTML = count[1] || '0';
    document.querySelector(".text-3 div").innerHTML = count[2] || '0';
    document.querySelector(".text-2 div").innerHTML = count[3] || '0';
    document.querySelector(".text-1 div").innerHTML = count[4] || '0';

}


function showsupportTicket(ticketId, name, type) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "block";

    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";

    // Update the title
    var ttitle = document.querySelector("#SupportTicketDatail .topRow h1");
    ttitle.innerHTML = `Complaints > H${String(ticketId).padStart(3, '0')}`;

    if (type == "getbyNameandId") {
        var ajaxurl = API_URL + `/Admin/supportTicket?name=${name}&id=${String(ticketId)}&type=getbyNameandId&option=getSTbyid`;
    }
    else {
        var ajaxurl = API_URL + `/Admin/supportTicket?id=${String(ticketId)}&option=getSTbyid&type=${type}`;
    }

    $.ajax({
        url: ajaxurl,
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();
                var datai = res.data;
                document.getElementById("ticketID").innerHTML = datai.ticketId;
                document.getElementById("CustomerSupportID").innerHTML = datai.customer_support_member_id || '-';
                // document.getElementById("userID").innerHTML = datai.customerID || datai.SPid || '-';
                document.getElementById("userName").innerHTML = name || '-';
                document.getElementById("title").innerHTML = datai.title || '-';
                document.getElementById("description").innerHTML = datai.description || 'No Description Provided';
                var dateTime = new Date(datai.created_time);
                var formattedDate = dateTime.toLocaleDateString();
                document.getElementById("Date").innerHTML = formattedDate || '-';

                var ticketStatus = datai.status;
                var ticketid = ticketId;

                var asignbtn = document.getElementById("assignbtn");
                if (ticketStatus.toLowerCase() == "pending") {
                    asignbtn.style.display = "block";
                    document.querySelector(".info textarea").innerHTML = "";
                    document.querySelector(".info textarea").disabled = false;
                    document.querySelector(".info textarea").classList.remove("disabledText");
                    document.querySelector(".topRow .button").style.display = "block";
                }
                else if (ticketStatus.toLowerCase() == "solved") {
                    asignbtn.style.display = "none";
                    document.querySelector(".info textarea").innerHTML = datai.solution || "-";
                    document.querySelector(".info textarea").disabled = true;
                    document.querySelector(".info textarea").classList.add("disabledText");
                    document.querySelector(".topRow .button").style.display = "none";
                }
                else {
                    asignbtn.style.display = "none";
                    document.querySelector(".info textarea").innerHTML = "";
                    document.querySelector(".info textarea").disabled = false;
                    document.querySelector(".info textarea").classList.remove("disabledText");
                    document.querySelector(".topRow .button").style.display = "block";
                }

                asignbtn.addEventListener("click", function () {
                    $("#load-container").show();
                    var assignWindow = document.getElementById("assignCSM");
                    assignWindow.style.display = "block";
                    var csmtemplate = document.querySelector("#CSMCardtemplate");
                    if (assignWindow.querySelector(".csmcards") != null) {
                        assignWindow.querySelector(".csmcards").remove();
                    }
                    $.ajax({
                        url: API_URL + "/Admin/CustomerSupportList",
                        method: "GET",
                        success: function (res) {

                            if (res.status == 200) {
                                // Start from index 1 to skip the first item in the JSON array
                                for (var i = 0; i < res.data.length; i++) {
                                    var datai = res.data[i];
                                    var pcontent = `CS${String(datai.CSid).padStart(3, '0')} - ${datai.fname} ${datai.lname}`;
                                    var spancontent = datai.tickets_solved || '0';
                                    var clone = csmtemplate.content.cloneNode(true);

                                    clone.querySelector("p").innerHTML = pcontent;
                                    clone.querySelector("span").innerHTML = `Solved Tickets ${spancontent}`;
                                    clone.querySelector(".csmcards").setAttribute("data-csmid", datai.CSid);
                                    clone.querySelector(".csmcards").addEventListener("click", function () {
                                        messagebox.style.display = "block";
                                        messageimg.setAttribute("src", "../../assets/img/Gear-0.3s-200px.gif");
                                        messagetext.innerHTML = "Customer Support Member Assigning...";
                                        messagebutton.style.display = "none";

                                        var csmid = this.getAttribute("data-csmid");

                                        var data = {
                                            ticketId: String(ticketid),
                                            csmid: csmid,
                                            status: "On Review",
                                            option: "assignCSM"
                                        };
                                        console.log(JSON.stringify(data));
                                        $.ajax({
                                            url: API_URL + "/customerSupport",
                                            method: "POST",
                                            contentType: 'application/json',
                                            data: JSON.stringify(data),
                                            success: function (res) {
                                                if (res.status == 201) {

                                                    messagebox.style.display = "block";
                                                    messageimg.setAttribute("src", "../../assets/img/Tick.png");
                                                    messagetext.innerHTML = "Customer Support Member Assigned Successfully";
                                                    messagebutton.style.display = "none";
                                                    setTimeout(function () {
                                                        messagebox.style.display = "none";
                                                    }, 1500);
                                                    assignWindow.style.display = "none";
                                                    asignbtn.style.display = "none";
                                                    showsupportTicket(ticketId, name, type);
                                                }
                                                else {
                                                    console.log("error");
                                                }
                                            }
                                        });
                                    });
                                    document.querySelector(".csmwindow").appendChild(clone);


                                }
                                $("#load-container").hide();
                            }
                            else {
                                console.log("error");
                            }
                        }
                    });
                }
                );

                var solvedbtn = document.getElementById("Solvedbutton");

                solvedbtn.addEventListener("click", function () {
                    var solution = document.querySelector("textarea").value;
                    if (solution == "") {
                        messagebox.style.display = "block";
                        messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                        messagetext.innerHTML = "Please provide a solution";
                        messageimg.style.width = "13vh";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                    }
                    else {
                        messagebox.style.display = "block";
                        messageimg.setAttribute("src", "../../assets/img/Gear-0.3s-200px.gif");
                        messagetext.innerHTML = "Updating Ticket...";
                        messagebutton.style.display = "none";
                        var data = {
                            ticketId: ticketid,
                            status: "Solved",
                            solution: solution,
                            option: "solveTicket",

                        };

                        $.ajax({
                            url: API_URL + "/customerSupport",
                            method: "POST",
                            contentType: 'application/json',
                            data: JSON.stringify(data),
                            success: function (res) {
                                if (res.status == 201) {
                                    messagebox.style.display = "block";
                                    messageimg.setAttribute("src", "../../assets/img/Tick.png");
                                    messagetext.innerHTML = "Ticket Updated Successfully";
                                    messagebutton.style.display = "none";
                                    setTimeout(function () {
                                        messagebox.style.display = "none";
                                    }, 1500);
                                    showsupportTicket(ticketId, name);
                                }
                                else {
                                    console.log("error");
                                }
                            }
                        });
                    }

                });
                $("#load-container").hide();

            }
            else {
                console.log("error");
            }
        }
    });
}


function showServiceProviders() {

    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.remove("dropDownActive");

    // document.querySelector("#GarageDropDown").classList.add("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "block";
    // document.querySelector("#garageOwners").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";

    var garage = document.getElementById("garages");
    var mp = document.getElementById("maintainancep");
    var tableBody = document.querySelector("#SPList tbody");
    $("#load-container").show();
    $.ajax({
        url: API_URL + "/Admin/SPlist?option=getallsp",
        method: "GET",
        success: function (res) {


            if (res.status == 200) {
                $("#load-container").hide();
                tableBody.innerHTML = "";
                for (var i = 0; i < res.data.length; i++) {

                    var datai = res.data[i];
                    if (datai.verify == "Yes") {
                        var row = tableBody.insertRow();
                        // row.insertCell(0).textContent = datai.id || '-';
                        row.insertCell(0).textContent = datai.garageName || '--';
                        row.insertCell(1).textContent = datai.phoneNumber || '-';
                        row.insertCell(2).textContent = datai.comRequests || '0';
                        row.insertCell(3).textContent = datai.supTickets || '0';
                        row.insertCell(4).textContent = datai.type || '-';
                        row.cells[4].style.display = 'none';
                        row.setAttribute('data-sp-id', datai.id);

                        row.addEventListener('click', function () {
                            // Get the customer ID from the clicked row
                            var spid = this.getAttribute('data-sp-id');
                            showSPprof(spid);
                        });
                    }


                }



            }
            else {
                console.log("error");
            }
        }
    });



    // Search spprovider
    document.getElementById("searchsp").addEventListener("input", function () {
        var searchValue = this.value.toUpperCase();
        var table = document.getElementById("SPList");
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


    // garage.addEventListener("change", function () {

    //     var table = document.getElementById("SPList");
    //     var tr = table.getElementsByTagName("tr");

    //     for (var i = 1; i < tr.length; i++) {


    //         var td = tr[i].getElementsByTagName("td")[5];
    //         var textValue = td.textContent || td.innerText;
    //         if (garage.checked == true && mp.checked == true) {
    //             tr[i].style.display = "";

    //         }
    //         else if (garage.checked == true && mp.checked == false) {
    //             if (textValue == "Garage") {
    //                 tr[i].style.display = "";
    //             }
    //             else {
    //                 tr[i].style.display = "none";
    //             }
    //         }
    //         else if (garage.checked == false && mp.checked == true) {
    //             if (textValue == "Mp") {
    //                 tr[i].style.display = "";
    //             }
    //             else {
    //                 tr[i].style.display = "none";
    //             }
    //         }

    //         else {

    //             tr[i].style.display = "none";


    //         }
    //     }
    // });

    // mp.addEventListener("change", function () {

    //     var table = document.getElementById("SPList");
    //     var tr = table.getElementsByTagName("tr");

    //     for (var i = 1; i < tr.length; i++) {


    //         var td = tr[i].getElementsByTagName("td")[5];
    //         var textValue = td.textContent || td.innerText;
    //         if (garage.checked == true && mp.checked == true) {
    //             tr[i].style.display = "";

    //         }
    //         else if (garage.checked == true && mp.checked == false) {
    //             if (textValue == "Garage") {
    //                 tr[i].style.display = "";
    //             }
    //             else {
    //                 tr[i].style.display = "none";
    //             }
    //         }
    //         else if (garage.checked == false && mp.checked == true) {
    //             if (textValue == "Mp") {
    //                 tr[i].style.display = "";
    //             }
    //             else {
    //                 tr[i].style.display = "none";
    //             }
    //         }

    //         else {

    //             tr[i].style.display = "none";


    //         }
    //     }
    // });


}

function showSPprof(spid) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "block";
    // document.querySelector("#maintainancePersonnel").style.display = "none";

    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
    // Update the title
    var title = document.querySelector("#GarageProf .topRow h1");

    $.ajax({
        url: API_URL + "/Admin/SPlist?option=getSPbyid&id=" + spid,
        method: "GET",
        success: function (res) {

            showSPAnalytics(res, spid);

        }



    })

}

function showSPAnalytics(res, spid) {
    var profile = res.data.profile;
    var tickets = res.data.tickets;
    var location = res.data.locations;
    var Rating = res.data.rating;
    datai = res.data;
    title.innerHTML = `Servie Provider > ${profile.garageName}`;
    $("#load-container").hide();


    // document.getElementById("id").innerHTML = datai.id;
    document.getElementById("gname").innerHTML = profile.garageName || '-';
    document.getElementById("oname").innerHTML = profile.owner_name || '-';
    document.getElementById("pnum").innerHTML = profile.phoneNumber || '-';
    document.getElementById("spemail").innerHTML = profile.email || '-';
    document.getElementById("tech").innerHTML = profile.technicians || '0';
    document.getElementById("avgres").innerHTML = profile.avgrResponce + " min" || '0 min';
    document.getElementById("avgcom").innerHTML = profile.avgcomplete + " min" || '0 min';


    // set locaton link
    // var locationpoints = datai.location.split(",");
    // var link = `https://www.google.com/maps/search/?api=1&query=${locationpoints[0]},${locationpoints[1]}`;

    // document.getElementById("location").setAttribute("href", link);
    // document.getElementById("compservice").innerHTML = datai.comRequests || '0';

    // // format date
    // var dateTime = new Date(datai.Date);
    // var formattedDate = dateTime.toLocaleDateString();
    // document.getElementById("date").innerHTML = formattedDate || '0';

    var name = profile.owner_name;
    // View support Tickets
    if (profile.supTickets > 0) {

        // Remove created ticket cards
        // var ticketList = document.querySelectorAll(".SuppotTicketcard");

        // if (ticketList.length > 0) {
        //     ticketList.forEach(function (ticket) {
        //         ticket.remove();
        //     });
        // }

        // // request ticket details from backend
        // $.ajax({
        //     url: API_URL + "/customerSupport",
        //     method: "GET",
        //     success: function (res) {

        //         if (res.status == 200) {


        //             for (var i = 0; i < res.data.length; i++) {
        //                 (function () {
        //                     var datai = res.data[i];
        //                     if (datai.customerID == customerId) {


        //                         var temp = document.getElementById("supportTicketTemplate");
        //                         var clone = temp.content.cloneNode(true);
        //                         clone.querySelector(".SuppotTicketcard h1").textContent = `ST-${String(datai.ticketId).padStart(3, '0')}`;

        //                         var dateTime = new Date(datai.created_time);
        //                         var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
        //                         clone.querySelector(".SuppotTicketcard .row .date p").textContent = formattedDate;

        //                         // Update ticket title
        //                         clone.querySelector(".SuppotTicketcard .row .title p").textContent = datai.title;

        //                         // Change status button
        //                         var status = datai.status;
        //                         var sbutton = clone.querySelector(".SuppotTicketcard .solveButton button");

        //                         if (status.toLowerCase() == "pending") {
        //                             sbutton.classList.add("pending");
        //                             sbutton.textContent = "Pending";
        //                         }
        //                         else if (status.toLowerCase() == "solved") {
        //                             sbutton.classList.add("solved");
        //                             sbutton.textContent = "Solved";
        //                         }
        //                         else {
        //                             sbutton.classList.add("on_review");
        //                             sbutton.textContent = "On Review";
        //                         }

        //                         clone.querySelector(".SuppotTicketcard").addEventListener('click', function () {
        //                             showsupportTicket(datai.ticketId, name, "cus");


        //                         });
        //                         document.getElementById("no_support_tickets").style.display = "none";
        //                         document.getElementById("support_ticket_list").style.display = "block";
        //                         document.getElementById("support_ticket_list").appendChild(clone);
        //                     }
        //                 })();


        //             }
        //             $("#load-container").hide();
        //         }
        //         else {
        //             console.log("error");
        //         }
        //     }
        // })


        // Verifications                  
        // supportTickets.forEach(function (entry) {
        //     var temp = document.getElementById("customerComtemplate");
        //     var clone = temp.content.cloneNode(true);
        //     var pElement = clone.querySelector("p");
        //     if (pElement) {
        //         pElement.textContent = `H - ${entry.ticketId}`;
        //         clone.addEventListener('click', function () {
        //             showsupportTicket(entry.ticketId, profile.fname + " " + profile.lname, "cus");
        //         });
        //         document.querySelector(".table").appendChild(clone);
        //     }


        // });

        document.querySelector(".spCWindow").innerHTML = `<template id="spComtemplate">
                        <div class="spComcards">
                          <p>Garage</p>
                          <span class="spcomstatus">Solved Tickets 8</span>
                        </div>
                        
                      </template>`;
        var complains = document.getElementById("spPendingTickets");

        var complaintTemplate = document.querySelector("#spComtemplate");
        if (complains.querySelector(".spComcards") != null) {
            complains.querySelector(".spComcards").remove();
        }

        for (var i = 0; i < tickets.length; i++) {
            var datai = tickets[i];
            var pcontent = `H${String(datai.ticketId).padStart(3, '0')}`;
            var spancontent = datai.status || 'No status';
            var clone = complaintTemplate.content.cloneNode(true);

            clone.querySelector("p").innerHTML = pcontent;
            clone.querySelector("span").innerHTML = `${spancontent}`;
            clone.querySelector(".spComcards").addEventListener("click", function (ticketId) {
                return function () {
                    showsupportTicket(ticketId, profile.fname + " " + profile.lname, "SP");
                };
            }(datai.ticketId)); // Immediately invoked function to capture ticketId

            document.querySelector(".spCWindow").appendChild(clone);

        }




    }
    else {
        $("#load-container").hide();
        document.querySelector("#spPendingTickets").style.display = "none";

    }
    var editButton = document.createElement("button");
    editButton.id = "spditProfileButton";
    editButton.className = "button";

    editButton.innerHTML = '<span class="material-symbols-outlined"> edit </span>Edit ';

    // Append edit button to the container
    var buttonContainer = document.querySelector(".spbuttonDiv #speditButtonContainer");
    buttonContainer.innerHTML = ''; // Clear previous button
    buttonContainer.appendChild(editButton);

    // Save button
    var saveButton = document.createElement("button");
    saveButton.id = "saveProfileButton";
    saveButton.className = "button";

    saveButton.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 1vh; vertical-align: bottom;"> save </span>Save';
    saveButton.style.display = "none";

    // Append edit button to the container
    buttonContainer.appendChild(saveButton);

    // Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.id = "spdeletebutton";
    deleteButton.className = "deleteButton";

    deleteButton.innerHTML = '<span class="material-symbols-outlined"> delete </span>Delete';
    deleteButton.classList.add("button");


    // Append edit button to the container
    var deletebuttonContainer = document.querySelector(".spbuttonDiv #spdeleteButtonContainer");
    deletebuttonContainer.innerHTML = ''; // Clear previous button
    deletebuttonContainer.appendChild(deleteButton);

    // Add event listener to the edit button
    editButton.addEventListener("click", function () {

        var form = document.getElementById("speditProfileForm");
        form.style.display = "block";
        document.getElementById("spprofile").style.display = "none";

        var form = document.getElementById("speditProfileForm");
        form.style.display = "block";
        document.getElementById("spprofile").style.display = "none";

        // Display save button
        saveButton.style.display = "block";
        editButton.style.display = "none";

        // Disable delete button
        deleteButton.disabled = true;
        deleteButton.style.backgroundColor = "#6f102e";




        // document.querySelector("#speditProfileForm #cid").innerHTML = datai.id;

        document.querySelector("#speditProfileForm #spgname").value = profile.garageName;
        document.querySelector("#speditProfileForm #sponame").value = profile.owner_name;
        document.querySelector("#speditProfileForm #speemail").value = profile.email;
        document.querySelector("#speditProfileForm #spcnum").value = profile.phoneNumber;

        document.querySelector("#speditProfileForm #spetech").innerHTML = profile.tech || '0';
        document.querySelector("#speditProfileForm #spavgres").innerHTML = profile.avgrResponce + " min" || '0 min';

        document.querySelector("#speditProfileForm #spavgcom").innerHTML = profile.avgcomplete + " min" || '0 min';


        saveButton.addEventListener("click", function () {
            messagebox.style.display = "block";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
            messagetext.innerHTML = "Updating Profile...";
            messagebutton.style.display = "none";
            // Retrieve the updated values from the form fields
            // var Id = document.querySelector("#speditProfileForm #cid").innerHTML;
            var gname = document.querySelector("#speditProfileForm #spgname").value;
            var oname = document.querySelector("#speditProfileForm #sponame").value;
            var email = document.querySelector("#speditProfileForm #speemail").value;
            var cnum = document.querySelector("#speditProfileForm #spcnum").value;



            // Prepare the data to send via AJAX
            var data = {
                spId: spid,
                garage: gname,
                owner: oname,
                email: email,
                cnum: cnum,
                option: "updateDetails"
            };
            console.log(JSON.stringify(data))


            console.log(JSON.stringify(data));
            // Send an AJAX request to update the profile
            $.ajax({
                url: API_URL + '/Admin/SPlist',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.status == 201) {
                        messageimg.setAttribute("src", "../../assets/img/Tick.png");
                        messagetext.innerHTML = "Update Successful";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        document.getElementById("speditProfileForm").style.display = "none";
                        document.getElementById("spprofile").style.display = "block";
                        showSPprof(spid);
                        deleteButton.disabled = false;
                        deleteButton.style.backgroundColor = "#c41950";

                        // Change to save button
                        saveButton.style.display = "none";
                        editButton.style.display = "block";
                    }
                    else {
                        messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                        messagetext.innerHTML = "Something went wrong. Try Again";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        document.getElementById("speditProfileForm").style.display = "none";
                        document.getElementById("spprofile").style.display = "block";
                        showSPprof(spid);
                        deleteButton.disabled = false;
                        deleteButton.style.backgroundColor = "#c41950";

                        // Change to save button
                        saveButton.style.display = "none";
                        editButton.style.display = "block";
                        // Handle error response
                        console.error('Failed to update profile:', error);
                    }
                },
                error: function (error) {

                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("speditProfileForm").style.display = "none";
                    document.getElementById("spprofile").style.display = "block";
                    showSPprof(spid);
                    deleteButton.disabled = false;
                    deleteButton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                    // Handle error response
                    console.error('Failed to update profile:', error);
                }
            });
        });
    });

    deleteButton.addEventListener("click", function () {
        messagebox.style.display = "block";
        messageimg.setAttribute("src", "../../assets/img/delete.png");
        messageimg.style.width = "13vh";
        messagetext.innerHTML = "Are you sure you want to delete this user?";

        var yesButton = document.createElement("button");
        yesButton.id = "yesButton";
        yesButton.className = "button";
        yesButton.innerHTML = "Yes";
        document.getElementById("proccessingBoxButtons").appendChild(yesButton);

        var NoBUtton = document.createElement("button");
        NoBUtton.id = "nobutton";
        NoBUtton.className = "button";
        NoBUtton.innerHTML = "No";
        NoBUtton.addEventListener("click", function () {
            messagebox.style.display = "none";
            messagebutton.innerHTML = '';

        });
        document.getElementById("proccessingBoxButtons").appendChild(NoBUtton);
        messagebutton.style.display = "block";

        yesButton.addEventListener("click", function () {
            messagetext.innerHTML = "Please Wait..."
            messagebox.style.display = "block"
            messagebutton.style.display = "none";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");

            $.ajax({
                url: API_URL + "/Admin/SPlist?id=" + spid,
                method: "DELETE",
                success: function (res) {
                    messagetext.innerHTML = "Service Provider Deleted Successfully";
                    messageimg.setAttribute("src", "../../assets/img/Tick.png")
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    showServiceProviders();
                },
                error: function (error) {
                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                }

            })
        });

    });

    // Analytics
    // map-----------------------------------

    // document.querySelector('#spmapcontainer').innerHTML = `<div id="spRequestmap" class="map"></div>`
    var setview = profile.location.split(",");

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    var map = L.map("spRequestmap").setView([parseFloat(setview[0]), parseFloat(setview[1])], 12);
    if (location.length != 0) {
        const ServiceRequestsCordinatesArray = location.map(locationString => {
            const matches = locationString.match(/latitude=(-?\d+\.\d+), longitude=(-?\d+\.\d+)/);
            if (matches) {
                return `${matches[1]},${matches[2]}`;
            }
        });

        var ServiceRequestsCordinates = ServiceRequestsCordinatesArray.map(function (location) {
            var coordinates = location.split(',');
            return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
        });





        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        console.log(ServiceRequestsCordinates);
        console.log(ServiceRequestsCordinatesArray);
        console.log(calculateMedianLocation(ServiceRequestsCordinatesArray));
        console.log(location);


        ServiceRequestsCordinates.forEach(function (location) {

            L.marker(location)
                .addTo(map)
                .bindPopup("Service Request Location");
        });
    }



    // Request Status------------------------------------------

    // document.querySelector(".requestgraph").innerHTML = '<canvas id="srpieChart" style="width: 100%"></canvas>'
    // var status = ["Completed Services", "Cancelled Services"];
    // var count = [0, 0];
    // requestStatus.forEach(function (entry) {
    //     if (entry.status == "Complete") {
    //         count[0] = entry.count;
    //     }
    //     else {
    //         count[1] = entry.count;
    //     }
    // });
    // document.querySelector(".requestChart h1").innerHTML = "Total Service Requests " + (Number(count[0]) + Number(count[1]));

    // var barColors = ["#54bebe", "#c80064"]

    // new Chart("srpieChart", {
    //     type: "pie",
    //     data: {
    //         labels: status,
    //         datasets: [{
    //             backgroundColor: barColors,
    //             data: count,
    //             borderWidth: 0
    //         }]
    //     },
    //     options: {
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {


    //                 labels: {
    //                     color: "white"
    //                 }
    //             }
    //         },
    //         title: {
    //             display: true,
    //             text: "World Wide Wine Production"
    //         }
    //     }
    // });


    // // Rating------------------------------------------
    var ratingCounts = Rating.map(item => ({ rating: parseInt(item.rating), count: parseInt(item.count) }));
    var rating = ratingCounts.map(item => item.rating);
    var halfcount = ratingCounts.map(item => item.count);


    var total = 0;
    var count = [0, 0, 0, 0, 0, 0];
    for (i = 0; i <= 5; i++) {
        if (rating.includes(i)) {
            count[i] = halfcount[rating.indexOf(i)];
            total += halfcount[rating.indexOf(i)];
        }
    }

    var percentageRatings = []
    count.forEach(function (entry) {
        if (entry == 0) {
            percentageRatings.push({ percentage: '0%' });
        }
        else {
            percentageRatings.push({ percentage: `${(entry / total) * 100}%` });
        }
    });

    console.log(rating);
    console.log(halfcount);
    console.log(percentageRatings);
    console.log(count);


    document.querySelector("#spratings .bar-5").style.width = percentageRatings[5].percentage;
    document.querySelector("#spratings .bar-4").style.width = percentageRatings[4].percentage;
    document.querySelector("#spratings .bar-3").style.width = percentageRatings[3].percentage;
    document.querySelector("#spratings .bar-2").style.width = percentageRatings[2].percentage;
    document.querySelector("#spratings .bar-1").style.width = percentageRatings[1].percentage;


    document.querySelector("#spratings .text-5 div").innerHTML = count[5] || '0';
    document.querySelector("#spratings .text-4 div").innerHTML = count[4] || '0';
    document.querySelector("#spratings .text-3 div").innerHTML = count[3] || '0';
    document.querySelector("#spratings .text-2 div").innerHTML = count[2] || '0';
    document.querySelector("#spratings .text-1 div").innerHTML = count[1] || '0';
}

function showTechnicians() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "block";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";

    $("#load-container").show();
    $("#TechnicianList tbody").empty();

    $.ajax({
        url: API_URL + "/Admin/technician?option=getalltech",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();

                var tableBody = document.querySelector("#TechnicianList tbody");

                // Start from index 1 to skip the first item in the JSON array
                for (var i = 0; i < res.data.length; i++) {
                    var datai = res.data[i];
                    var row = tableBody.insertRow();
                    // row.insertCell(0).textContent = datai.id || '';
                    row.insertCell(0).textContent = datai.f_name + " " + datai.l_name || '--';
                    row.insertCell(1).textContent = datai.garageName || '';
                    row.insertCell(2).textContent = datai.phoneNumber || '0';
                    row.insertCell(3).textContent = datai.tasks || '0';

                    row.setAttribute('data-tech-id', datai.id);

                    row.addEventListener('click', function () {

                        var techId = this.getAttribute('data-tech-id');
                        showTechprof(techId);
                    });
                }

            }
            else {
                console.log("error");
            }
        }
    });

    // Search Customer
    document.getElementById("searchTechnitian").addEventListener("input", function () {
        var searchValue = this.value.toUpperCase();
        var table = document.getElementById("TechnicianList");
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
function showTechprof(techId) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
    // Update the title


    $.ajax({
        url: API_URL + "/Admin/technician?option=getTechbyid&id=" + techId,
        method: "GET",
        contentType: 'application/json',

        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();
                TechnicianAnalytics(res, techId);
            }
            else {
                console.log("error");
            }
        }
    });

}


function TechnicianAnalytics(res, techId) {


    var profile = res.data.profile;
    var expertise = res.data.analytics.expertice;
    var servicehistory = res.data.analytics.activity;

    var title = document.querySelector("#techprof .topRow h1");
    title.innerHTML = `Technician > ${profile.f_name} ${profile.l_name}`;
    // document.getElementById("techid").innerHTML = profile.id;
    document.getElementById("techfname").innerHTML = profile.f_name || '-';
    document.getElementById("techlname").innerHTML = profile.l_name || '-';
    document.getElementById("techgarage").innerHTML = profile.garageName || '-';
    document.getElementById("techemail").innerHTML = profile.email || '-';
    document.getElementById("techcnum").innerHTML = profile.phoneNumber || '-';
    document.getElementById("techservices").innerHTML = profile.tasks || '0';

    var ex = ""
    expertise.forEach(function (entry) {
        ex += entry + "<br/>";
    });
    document.getElementById("techExpertice").innerHTML = ex || '-';

    // Show Support Tickets and profile data
    // if (supportTickets.length > 0) {

    //     // Remove created ticket cards
    //     // var ticketList = document.querySelectorAll(".SuppotTicketcard");

    //     // if (ticketList.length > 0) {
    //     //     ticketList.forEach(function (ticket) {
    //     //         ticket.remove();
    //     //     });
    //     // }

    //     // // request ticket details from backend
    //     // $.ajax({
    //     //     url: API_URL + "/customerSupport",
    //     //     method: "GET",
    //     //     success: function (res) {

    //     //         if (res.status == 200) {


    //     //             for (var i = 0; i < res.data.length; i++) {
    //     //                 (function () {
    //     //                     var datai = res.data[i];
    //     //                     if (datai.customerID == customerId) {


    //     //                         var temp = document.getElementById("supportTicketTemplate");
    //     //                         var clone = temp.content.cloneNode(true);
    //     //                         clone.querySelector(".SuppotTicketcard h1").textContent = `ST-${String(datai.ticketId).padStart(3, '0')}`;

    //     //                         var dateTime = new Date(datai.created_time);
    //     //                         var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
    //     //                         clone.querySelector(".SuppotTicketcard .row .date p").textContent = formattedDate;

    //     //                         // Update ticket title
    //     //                         clone.querySelector(".SuppotTicketcard .row .title p").textContent = datai.title;

    //     //                         // Change status button
    //     //                         var status = datai.status;
    //     //                         var sbutton = clone.querySelector(".SuppotTicketcard .solveButton button");

    //     //                         if (status.toLowerCase() == "pending") {
    //     //                             sbutton.classList.add("pending");
    //     //                             sbutton.textContent = "Pending";
    //     //                         }
    //     //                         else if (status.toLowerCase() == "solved") {
    //     //                             sbutton.classList.add("solved");
    //     //                             sbutton.textContent = "Solved";
    //     //                         }
    //     //                         else {
    //     //                             sbutton.classList.add("on_review");
    //     //                             sbutton.textContent = "On Review";
    //     //                         }

    //     //                         clone.querySelector(".SuppotTicketcard").addEventListener('click', function () {
    //     //                             showsupportTicket(datai.ticketId, name, "cus");


    //     //                         });
    //     //                         document.getElementById("no_support_tickets").style.display = "none";
    //     //                         document.getElementById("support_ticket_list").style.display = "block";
    //     //                         document.getElementById("support_ticket_list").appendChild(clone);
    //     //                     }
    //     //                 })();


    //     //             }
    //     //             $("#load-container").hide();
    //     //         }
    //     //         else {
    //     //             console.log("error");
    //     //         }
    //     //     }
    //     // })


    //     // Verifications                  
    //     // supportTickets.forEach(function (entry) {
    //     //     var temp = document.getElementById("customerComtemplate");
    //     //     var clone = temp.content.cloneNode(true);
    //     //     var pElement = clone.querySelector("p");
    //     //     if (pElement) {
    //     //         pElement.textContent = `H - ${entry.ticketId}`;
    //     //         clone.addEventListener('click', function () {
    //     //             showsupportTicket(entry.ticketId, profile.fname + " " + profile.lname, "cus");
    //     //         });
    //     //         document.querySelector(".table").appendChild(clone);
    //     //     }


    //     // });

    //     document.querySelector(".cutomerCWindow").innerHTML = `<template id="customerComtemplate">
    //                     <div class="customerComcards">
    //                       <p>Garage</p>
    //                       <span class="comstatus">Solved Tickets 8</span>
    //                     </div>

    //                   </template>`;
    //     var complains = document.getElementById("PendingTickets");

    //     var complaintTemplate = document.querySelector("#customerComtemplate");
    //     if (complains.querySelector(".customerComcards") != null) {
    //         complains.querySelector(".customerComcards").remove();
    //     }

    //     for (var i = 0; i < supportTickets.length; i++) {
    //         var datai = supportTickets[i];
    //         var pcontent = `H${String(datai.ticketId).padStart(3, '0')}`;
    //         var spancontent = datai.status || 'No status';
    //         var clone = complaintTemplate.content.cloneNode(true);

    //         clone.querySelector("p").innerHTML = pcontent;
    //         clone.querySelector("span").innerHTML = `${spancontent}`;
    //         clone.querySelector(".customerComcards").addEventListener("click", function (ticketId) {
    //             return function () {
    //                 showsupportTicket(ticketId, profile.fname + " " + profile.lname, "cus");
    //             };
    //         }(datai.ticketId)); // Immediately invoked function to capture ticketId

    //         document.querySelector(".cutomerCWindow").appendChild(clone);

    //     }




    // }
    // else {
    //     $("#load-container").hide();
    //     document.querySelector("#PendingTickets").style.display = "none";

    // }

    var editButton = document.createElement("button");
    editButton.id = "teditProfileButton";
    editButton.className = "button";
    editButton.innerHTML = '<span class="material-symbols-outlined"> edit </span>Edit ';

    // Append edit button to the container
    var buttonContainer = document.getElementById("teditButtonContainer");
    buttonContainer.innerHTML = ''; // Clear previous button
    buttonContainer.appendChild(editButton);

    // Save button
    var saveButton = document.createElement("button");
    saveButton.id = "tsaveProfileButton";
    saveButton.className = "button";
    saveButton.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 1vh; vertical-align: bottom;"> save </span>Save';
    saveButton.style.display = "none";

    // Append edit button to the container
    buttonContainer.appendChild(saveButton);

    // Delete Button
    // var deleteButton = document.createElement("button");
    // deleteButton.id = "deletebutton";
    // deleteButton.className = "deleteButton";
    // deleteButton.innerHTML = '<span class="material-symbols-outlined"> delete </span>Delete';
    // deleteButton.classList.add("button");


    // // Append edit button to the container
    // var deletebuttonContainer = document.getElementById("deleteButtonContainer");
    // deletebuttonContainer.innerHTML = ''; // Clear previous button
    // deletebuttonContainer.appendChild(deleteButton);

    // Add event listener to the edit button
    editButton.addEventListener("click", function () {

        var form = document.getElementById("techeditProfileForm");
        form.style.display = "block";
        document.getElementById("techprofile").style.display = "none";

        // var form = document.getElementById("editProfileForm");
        // form.style.display = "block";
        // document.getElementById("profile").style.display = "none";

        // Display save button
        saveButton.style.display = "block";
        editButton.style.display = "none";

        // // Disable delete button
        // deletebutton.disabled = true;
        // deletebutton.style.backgroundColor = "#6f102e";




        // document.querySelector("#editProfileForm #cid").innerHTML = datai.customerId;
        var datai = profile;
        document.querySelector("#techeditProfileForm #tfname").value = datai.f_name;
        document.querySelector("#techeditProfileForm #tlname").value = datai.l_name;
        document.querySelector("#techeditProfileForm #temail").value = datai.email;
        document.querySelector("#techeditProfileForm #tcnum").value = datai.phoneNumber;
        document.querySelector("#techeditProfileForm #tgarage").innerHTML = datai.garageName;
        document.querySelector("#techeditProfileForm #tservices").innerHTML = datai.tasks;



        saveButton.addEventListener("click", function () {
            messagebox.style.display = "block";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
            messagetext.innerHTML = "Updating Profile...";
            messagebutton.style.display = "none";
            // Retrieve the updated values from the form fields
            // var customerId = document.querySelector("#editProfileForm #cid").innerHTML;
            var fname = document.querySelector("#techeditProfileForm #tfname").value;
            var lname = document.querySelector("#techeditProfileForm #tlname").value;
            var email = document.querySelector("#techeditProfileForm #temail").value;
            var cnum = document.querySelector("#techeditProfileForm #tcnum").value;

            // Perform validation if needed

            // Prepare the data to send via AJAX
            var data = {
                techId: techId,
                fname: fname,
                lname: lname,
                email: email,
                cnum: cnum,
                option: "updateDetails"
            };

            console.log(JSON.stringify(data));

            // Send an AJAX request to update the profile
            $.ajax({
                url: API_URL + '/Admin/technician',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.status == 201) {
                        messageimg.setAttribute("src", "../../assets/img/Tick.png");
                        messagetext.innerHTML = "Update Successful";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        document.getElementById("techeditProfileForm").style.display = "none";
                        document.getElementById("techprofile").style.display = "block";
                        showTechprof(techId);
                        // deletebutton.disabled = false;
                        // deletebutton.style.backgroundColor = "#c41950";

                        // Change to save button
                        saveButton.style.display = "none";
                        editButton.style.display = "block";
                    }




                },
                error: function (error) {

                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("techeditProfileForm").style.display = "none";
                    document.getElementById("techprofile").style.display = "block";
                    showTechprof(techId);
                    // deletebutton.disabled = false;
                    // deletebutton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                    // Handle error response
                    console.log('Failed to update profile:', error);
                }
            });
        });
    });




    // Analytics
    // map-----------------------------------
    // document.getElementById('mapcontainer').innerHTML = `<div id="customerRequestmap" class="map"></div>`
    // const ServiceRequestsCordinatesArray = ServiceRequests.map(locationString => {
    //     const matches = locationString.match(/latitude=(-?\d+\.\d+), longitude=(-?\d+\.\d+)/);
    //     if (matches) {
    //         return `${matches[1]},${matches[2]}`;
    //     }
    // });

    // var ServiceRequestsCordinates = ServiceRequestsCordinatesArray.map(function (location) {
    //     var coordinates = location.split(',');
    //     return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
    // });


    // var container = L.DomUtil.get('map');
    // if (container != null) {
    //     container._leaflet_id = null;
    // }

    // var map = L.map("customerRequestmap").setView(calculateMedianLocation(ServiceRequestsCordinatesArray), 12);



    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(map);



    // ServiceRequestsCordinates.forEach(function (location) {

    //     L.marker(location)
    //         .addTo(map)
    //         .bindPopup(location.name);
    // });


    // // Request Status------------------------------------------

    // document.querySelector(".requestgraph").innerHTML = '<canvas id="srpieChart" style="width: 100%"></canvas>'
    // var status = ["Completed Services", "Cancelled Services"];
    // var count = [0, 0];
    // requestStatus.forEach(function (entry) {
    //     if (entry.status == "Complete") {
    //         count[0] = entry.count;
    //     }
    //     else {
    //         count[1] = entry.count;
    //     }
    // });
    // document.querySelector(".requestChart h1").innerHTML = "Total Service Requests " + (Number(count[0]) + Number(count[1]));

    // var barColors = ["#54bebe", "#c80064"]

    // new Chart("srpieChart", {
    //     type: "pie",
    //     data: {
    //         labels: status,
    //         datasets: [{
    //             backgroundColor: barColors,
    //             data: count,
    //             borderWidth: 0
    //         }]
    //     },
    //     options: {
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {


    //                 labels: {
    //                     color: "white"
    //                 }
    //             }
    //         },
    //         title: {
    //             display: true,
    //             text: "World Wide Wine Production"
    //         }
    //     }
    // });


    // // Rating------------------------------------------
    // var ratingCounts = Rating.map(item => ({ rating: parseInt(item.rating), count: parseInt(item.count) }));
    // var rating = ratingCounts.map(item => item.rating);
    // var halfcount = ratingCounts.map(item => item.count);


    // var total = 0;
    // var count = [0, 0, 0, 0, 0, 0];
    // for (i = 0; i <= 5; i++) {
    //     if (rating.includes(i)) {
    //         count[i] = halfcount[rating.indexOf(i)];
    //         total += halfcount[rating.indexOf(i)];
    //     }
    // }

    // var percentageRatings = []
    // count.forEach(function (entry) {
    //     if (entry == 0) {
    //         percentageRatings.push({ percentage: '0%' });
    //     }
    //     else {
    //         percentageRatings.push({ percentage: `${(entry / total) * 100}%` });
    //     }
    // });

    // console.log(rating);
    // console.log(halfcount);
    // console.log(percentageRatings);
    // console.log(count);


    // document.querySelector(".bar-5").style.width = percentageRatings[5].percentage;
    // document.querySelector(".bar-4").style.width = percentageRatings[4].percentage;
    // document.querySelector(".bar-3").style.width = percentageRatings[3].percentage;
    // document.querySelector(".bar-2").style.width = percentageRatings[2].percentage;
    // document.querySelector(".bar-1").style.width = percentageRatings[1].percentage;


    // document.querySelector(".text-5 div").innerHTML = count[0] || '0';
    // document.querySelector(".text-4 div").innerHTML = count[1] || '0';
    // document.querySelector(".text-3 div").innerHTML = count[2] || '0';
    // document.querySelector(".text-2 div").innerHTML = count[3] || '0';
    // document.querySelector(".text-1 div").innerHTML = count[4] || '0';


    // monthly activities
    // **************technitian-Registation Bar Chart*******************
    // Get current year and month
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    // Generate labels for the past six months
    document.querySelector(".techgraph").innerHTML = '<canvas id="techComrequest" ></canvas>'
    var labels = [];
    for (var i = 0; i <= 5; i++) {
        var month = currentMonth - i;
        var year = currentYear;
        if (month <= 0) {
            month += 12;
            year--;
        }
        labels.push(year + '-' + (month < 10 ? '0' + month : month));
    }

    // Initialize data array with zeros
    var data = Array(6).fill(0);

    // Aggregate data for the past six months
    servicehistory.forEach(function (item) {
        var year = parseInt(item.year);
        var month = parseInt(item.month);
        var index = (currentYear - year) * 12 + (currentMonth - month);
        if (index >= 0 && index < 6) {
            data[index] += parseInt(item.requests);
        }
    });
    // servicehistory.forEach(function (item) {
    //     labels.push(item.year + '-' + item.month);
    //     data.push(parseInt(item.requests));
    // });

    // Create chart
    // var ctx = document.getElementById('requestChart').getContext('2d');
    new Chart("techComrequest", {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Service Requests',
                data: data,
                fill: true,
                backgroundColor: "#54bebe",

                borderWidth: 1
            }]
        },
        options: {
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
            },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },

        }
    });
    // new Chart("techExpertice", {
    //     type: "bar",
    //     data: {
    //         labels: monthsToShow,
    //         datasets: [{
    //             label: "Registations",
    //             data: rdatafilter,
    //             backgroundColor: "#54bebe"
    //         }, {
    //             label: "Account Deletions",
    //             data: ddatafilter,
    //             backgroundColor: "#c80064"
    //         }]
    //     },
    //     options: {
    //         maintainAspectRatio: false,
    //         plugins: { legend: { labels: { color: "white" } } },
    //         barThickness: 20,
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: "white"
    //                 }
    //             },
    //             y: {
    //                 ticks: {
    //                     color: "white"
    //                 }
    //             }
    //         }
    //     }
    // });
}
// document.getElementById("CSMadd").addEventListener("click", function () {

//     document.getElementById("firstName").value.innerHTML = "";
//     document.getElementById("lastName").value.innerHTML = "";
//     document.getElementById("regemail").value.innerHTML = "";
//     document.getElementById("phone").value.innerHTML = "";
//     document.querySelector("#addCSM").style.display = "block";
//     document.querySelector("#registercsm").addEventListener("click", function () {
//         messagebox.style.display = "block";
//         messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
//         messagetext.innerHTML = "Adding Customer Support Member...";
//         messagebutton.style.display = "none";
//         var fname = document.getElementById("firstName").value;
//         var lname = document.getElementById("lastName").value;
//         var emailc = document.getElementById("regemail").value;
//         var cnum = document.getElementById("phone").value;
//         var phoneNumber = formatPhoneNumber(cnum);
//         console.log(phoneNumber);
//         var datacsm = {
//             fname: fname,
//             lname: lname,
//             email: emailc,
//             cnum: phoneNumber,
//             option: "addCSM"
//         };


//         console.log(JSON.stringify(datacsm));
//         $.ajax({
//             url: API_URL + "/Admin/CustomerSupportList",
//             method: "PUT",
//             contentType: 'application/json',
//             data: JSON.stringify(datacsm),
//             success: function (res) {

//                 if (res.status == 200) {
//                     messagebox.style.display = "block";
//                     messageimg.setAttribute("src", "../../assets/img/Tick.png");
//                     messagetext.innerHTML = "Customer Support Member Added Successfully";
//                     messagebutton.style.display = "none";
//                     setTimeout(function () {
//                         messagebox.style.display = "none";
//                     }, 1500);
//                     document.querySelector("#addCSM").style.display = "none";
//                     showcsmember();
//                 }
//                 else {
//                     messagebox.style.display = "block";
//                     messageimg.setAttribute("src", "../../assets/img/exclamation.png");
//                     messagetext.innerHTML = "Something went wrong. Try Again";
//                     messagebutton.style.display = "none";
//                     setTimeout(function () {
//                         messagebox.style.display = "none";
//                     }, 1500);
//                 }
//             }
//         });
//     });
// });
function showcsmember() {

    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.remove("dropDownActive");
    document.querySelector("#Reportcontent").style.display = "none";
    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "block";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";


    $("#load-container").show();
    $("#CSupportList tbody").empty();

    $.ajax({
        url: API_URL + "/Admin/CustomerSupportList",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();

                var tableBody = document.querySelector("#CSupportList tbody");

                // Start from index 1 to skip the first item in the JSON array
                for (var i = 0; i < res.data.length; i++) {
                    var datai = res.data[i];
                    var row = tableBody.insertRow();
                    // row.insertCell(0).textContent = datai.CSid || '-';
                    row.insertCell(0).textContent = datai.fname + " " + datai.lname || '--';
                    row.insertCell(1).textContent = datai.phone_number || '-';
                    row.insertCell(2).textContent = datai.tickets_solved || '0';


                    row.setAttribute('data-tech-id', datai.CSid);

                    row.addEventListener('click', function () {

                        var csid = this.getAttribute('data-tech-id');
                        showcsprof(csid);
                    });
                }

            }
            else {
                console.log("error");
            }
        }
    });

    // Search Customer Support Member
    document.getElementById("searchCSMember").addEventListener("input", function () {
        var searchValue = this.value.toUpperCase();
        var table = document.getElementById("CSupportList");
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

    document.getElementById("CSMadd").addEventListener("click", function () {

        document.getElementById("firstName").value.innerHTML = "";
        document.getElementById("lastName").value.innerHTML = "";
        document.getElementById("regemail").value.innerHTML = "";
        document.getElementById("phone").value.innerHTML = "";
        document.querySelector("#addCSM").style.display = "block";
        document.querySelector("#registercsm").addEventListener("click", function () {
            messagebox.style.display = "block";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
            messagetext.innerHTML = "Adding Customer Support Member...";
            messagebutton.style.display = "none";
            var fname = document.getElementById("firstName").value;
            var lname = document.getElementById("lastName").value;
            var emailc = document.getElementById("regemail").value;
            var cnum = document.getElementById("phone").value;
            var phoneNumber = formatPhoneNumber(cnum);
            console.log(phoneNumber);
            var datacsm = {
                fname: fname,
                lname: lname,
                email: emailc,
                cnum: phoneNumber,
                option: "addCSM"
            };


            console.log(JSON.stringify(datacsm));
            $.ajax({
                url: API_URL + "/Admin/CustomerSupportList",
                method: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(datacsm),
                success: function (res) {

                    if (res.status == 200) {
                        messagebox.style.display = "block";
                        messageimg.setAttribute("src", "../../assets/img/Tick.png");
                        messagetext.innerHTML = "Customer Support Member Added Successfully";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        document.querySelector("#addCSM").style.display = "none";
                        showcsmember();
                    }
                    else {
                        messagebox.style.display = "block";
                        messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                        messagetext.innerHTML = "Something went wrong. Try Again";
                        messagebutton.style.display = "none";
                        setTimeout(function () {
                            messagebox.style.display = "none";
                        }, 1500);
                        showcsmember();
                    }
                }
            });
        });
    });

}

function showcsprof(csid) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "block";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
    // Update the title


    var data = {
        csmId: csid,
        option: "getCSMById"
    };

    console.log(JSON.stringify(data));
    $.ajax({
        url: API_URL + "/Admin/CustomerSupportList",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {

            if (res.status == 201) {
                $("#load-container").hide();
                csmAnalytics(res, csid);
            }
            else {
                console.log("error");
            }
        }
    });

    // for (var i = 0; i < res.data.length; i++) {

    //     if (res.data[i].CSid == csid) {

    //         var datai = res.data[i];
    //         var name = datai.fname + " " + datai.lname;
    //         document.getElementById("csid").innerHTML = datai.CSid;
    //         document.getElementById("csfname").innerHTML = datai.fname || '-';
    //         document.getElementById("cslname").innerHTML = datai.lname || '-';
    //         document.getElementById("csemail").innerHTML = datai.email || '-';
    //         document.getElementById("cscnum").innerHTML = datai.phone_number || '-';

    //         if (datai.tickets_solved > 0) {

    //             // Remove created ticket cards
    //             var ticketList = document.querySelectorAll(".csSuppotTicketcard");
    //             console.log(ticketList);
    //             if (ticketList.length > 0) {
    //                 ticketList.forEach(function (ticket) {
    //                     ticket.remove();
    //                 });
    //             }

    //             // request ticket details from backend
    //             $.ajax({
    //                 url: API_URL + "/customerSupport",
    //                 method: "GET",
    //                 success: function (res) {
    //                     console.log(res);
    //                     if (res.status == 200) {
    //                         // $("#load-container").hide();

    //                         for (var i = 0; i < res.data.length; i++) {
    //                             (function () {
    //                                 var datai = res.data[i];
    //                                 if (datai.customer_support_member_id == csid) {


    //                                     var temp = document.getElementById("cssupportTicketTemplate");
    //                                     var clone = temp.content.cloneNode(true);
    //                                     clone.querySelector(".csSuppotTicketcard h1").textContent = `CST-${String(datai.ticketId).padStart(3, '0')}`;
    //                                     console.log(datai.ticketId);
    //                                     var dateTime = new Date(datai.created_time);
    //                                     var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
    //                                     clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

    //                                     // Update ticket title
    //                                     clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

    //                                     // Change status button
    //                                     var status = datai.status;
    //                                     var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

    //                                     if (status.toLowerCase() == "pending") {
    //                                         sbutton.classList.add("pending");
    //                                         sbutton.textContent = "Pending";
    //                                     }
    //                                     else if (status.toLowerCase() == "solved") {
    //                                         sbutton.classList.add("solved");
    //                                         sbutton.textContent = "Solved";
    //                                     }
    //                                     else {
    //                                         sbutton.classList.add("on_review");
    //                                         sbutton.textContent = "On Review";
    //                                     }

    //                                     clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
    //                                         showsupportTicket(datai.ticketId, name, "cus");


    //                                     });
    //                                     document.getElementById("csno_support_tickets").style.display = "none";
    //                                     document.getElementById("cssupport_ticket_list").style.display = "block";
    //                                     document.getElementById("cssupport_ticket_list").appendChild(clone);
    //                                 }
    //                             })();


    //                         }
    //                         $("#load-container").hide();
    //                     }
    //                     else {
    //                         console.log("error");
    //                     }
    //                 }
    //             })

    //             $.ajax({
    //                 url: API_URL + "/SPSupportTicket",
    //                 method: "GET",
    //                 success: function (res) {
    //                     $("#load-container").hide();
    //                     console.log(res);
    //                     if (res.status == 200) {


    //                         for (var i = 0; i < res.data.length; i++) {
    //                             (function () {
    //                                 var datai = res.data[i];
    //                                 if (datai.customer_support_member_id == csid) {


    //                                     var temp = document.getElementById("cssupportTicketTemplate");
    //                                     var clone = temp.content.cloneNode(true);
    //                                     clone.querySelector(".csSuppotTicketcard h1").textContent = `SST-${String(datai.ticketId).padStart(3, '0')}`;
    //                                     console.log(datai.ticketId);
    //                                     var dateTime = new Date(datai.created_time);
    //                                     var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
    //                                     clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

    //                                     // Update ticket title
    //                                     clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

    //                                     // Change status button
    //                                     var status = datai.status;
    //                                     var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

    //                                     if (status.toLowerCase() == "pending") {
    //                                         sbutton.classList.add("pending");
    //                                         sbutton.textContent = "Pending";
    //                                     }
    //                                     else if (status.toLowerCase() == "solved") {
    //                                         sbutton.classList.add("solved");
    //                                         sbutton.textContent = "Solved";
    //                                     }
    //                                     else {
    //                                         sbutton.classList.add("on_review");
    //                                         sbutton.textContent = "On Review";
    //                                     }

    //                                     clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
    //                                         showsupportTicket(datai.ticketId, name, "SP");


    //                                     });
    //                                     document.getElementById("csno_support_tickets").style.display = "none";
    //                                     document.getElementById("cssupport_ticket_list").style.display = "block";
    //                                     document.getElementById("cssupport_ticket_list").appendChild(clone);
    //                                 }
    //                             })();


    //                         }
    //                         $("#load-container").hide();
    //                     }
    //                     else {
    //                         console.log("error");
    //                     }
    //                 }
    //             })

    //         }
    //         else {
    //             $("#load-container").hide();
    //             document.getElementById("csno_support_tickets").style.display = "block";
    //             document.getElementById("cssupport_ticket_list").style.display = "none";

    //         }
    //     }

    // }

}

function csmAnalytics(res, csid) {
    var datai = res.data.profile;
    var ticketcount = res.data.ticketCount;
    var name = datai.fname + " " + datai.lname;
    var title = document.querySelector("#csprof .topRow h1");
    title.innerHTML = `Customer Support Member > ${name}`;
    // document.getElementById("csid").innerHTML = datai.CSid;
    document.getElementById("csfname").innerHTML = datai.fname || '-';
    document.getElementById("cslname").innerHTML = datai.lname || '-';
    document.getElementById("csemail").innerHTML = datai.email || '-';
    document.getElementById("cscnum").innerHTML = datai.phone_number || '-';

    // if (datai.tickets_solved > 0) {

    //     // Remove created ticket cards
    //     var ticketList = document.querySelectorAll(".csSuppotTicketcard");
    //     console.log(ticketList);
    //     if (ticketList.length > 0) {
    //         ticketList.forEach(function (ticket) {
    //             ticket.remove();
    //         });
    //     }

    //     // request ticket details from backend
    //     $.ajax({
    //         url: API_URL + "/customerSupport",
    //         method: "GET",
    //         success: function (res) {
    //             console.log(res);
    //             if (res.status == 200) {
    //                 // $("#load-container").hide();

    //                 for (var i = 0; i < res.data.length; i++) {
    //                     (function () {
    //                         var datai = res.data[i];
    //                         if (datai.customer_support_member_id == csid) {


    //                             var temp = document.getElementById("cssupportTicketTemplate");
    //                             var clone = temp.content.cloneNode(true);
    //                             clone.querySelector(".csSuppotTicketcard h1").textContent = `CST-${String(datai.ticketId).padStart(3, '0')}`;
    //                             console.log(datai.ticketId);
    //                             var dateTime = new Date(datai.created_time);
    //                             var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
    //                             clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

    //                             // Update ticket title
    //                             clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

    //                             // Change status button
    //                             var status = datai.status;
    //                             var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

    //                             if (status.toLowerCase() == "pending") {
    //                                 sbutton.classList.add("pending");
    //                                 sbutton.textContent = "Pending";
    //                             }
    //                             else if (status.toLowerCase() == "solved") {
    //                                 sbutton.classList.add("solved");
    //                                 sbutton.textContent = "Solved";
    //                             }
    //                             else {
    //                                 sbutton.classList.add("on_review");
    //                                 sbutton.textContent = "On Review";
    //                             }

    //                             clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
    //                                 showsupportTicket(datai.ticketId, name, "cus");


    //                             });
    //                             document.getElementById("csno_support_tickets").style.display = "none";
    //                             document.getElementById("cssupport_ticket_list").style.display = "block";
    //                             document.getElementById("cssupport_ticket_list").appendChild(clone);
    //                         }
    //                     })();


    //                 }
    //                 $("#load-container").hide();
    //             }
    //             else {
    //                 console.log("error");
    //             }
    //         }
    //     })

    //     $.ajax({
    //         url: API_URL + "/SPSupportTicket",
    //         method: "GET",
    //         success: function (res) {
    //             // $("#load-container").hide();
    //             console.log(res);
    //             if (res.status == 200) {


    //                 for (var i = 0; i < res.data.length; i++) {
    //                     (function () {
    //                         var datai = res.data[i];
    //                         if (datai.customer_support_member_id == csid) {


    //                             var temp = document.getElementById("cssupportTicketTemplate");
    //                             var clone = temp.content.cloneNode(true);
    //                             clone.querySelector(".csSuppotTicketcard h1").textContent = `SST-${String(datai.ticketId).padStart(3, '0')}`;
    //                             console.log(datai.ticketId);
    //                             var dateTime = new Date(datai.created_time);
    //                             var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
    //                             clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

    //                             // Update ticket title
    //                             clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

    //                             // Change status button
    //                             var status = datai.status;
    //                             var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

    //                             if (status.toLowerCase() == "pending") {
    //                                 sbutton.classList.add("pending");
    //                                 sbutton.textContent = "Pending";
    //                             }
    //                             else if (status.toLowerCase() == "solved") {
    //                                 sbutton.classList.add("solved");
    //                                 sbutton.textContent = "Solved";
    //                             }
    //                             else {
    //                                 sbutton.classList.add("on_review");
    //                                 sbutton.textContent = "On Review";
    //                             }

    //                             clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
    //                                 showsupportTicket(datai.ticketId, name, "SP");


    //                             });
    //                             document.getElementById("csno_support_tickets").style.display = "none";
    //                             document.getElementById("cssupport_ticket_list").style.display = "block";
    //                             document.getElementById("cssupport_ticket_list").appendChild(clone);
    //                         }
    //                     })();


    //                 }
    //                 $("#load-container").hide();
    //             }
    //             else {
    //                 console.log("error");
    //             }
    //         }
    //     })
    //     $("#load-container").hide();

    // }
    // else {
    //     $("#load-container").hide();
    //     document.getElementById("csno_support_tickets").style.display = "block";
    //     document.getElementById("cssupport_ticket_list").style.display = "none";

    // }

    var editButton = document.createElement("button");
    editButton.id = "cseditProfileButton";
    editButton.className = "button";
    editButton.innerHTML = '<span class="material-symbols-outlined"> edit </span>Edit ';

    // Append edit button to the container
    var buttonContainer = document.querySelector(".csmbuttonDiv #cseditButtonContainer");
    buttonContainer.innerHTML = ''; // Clear previous button
    buttonContainer.appendChild(editButton);

    // Save button
    var saveButton = document.createElement("button");
    saveButton.id = "cssaveProfileButton";
    saveButton.className = "button";
    saveButton.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 1vh; vertical-align: bottom;"> save </span>Save';
    saveButton.style.display = "none";

    // Append edit button to the container
    buttonContainer.appendChild(saveButton);

    // Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.id = "csdeletebutton";
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = '<span class="material-symbols-outlined"> delete </span>Delete';
    deleteButton.classList.add("button");


    // Append edit button to the container
    var deletebuttonContainer = document.querySelector(".csmbuttonDiv #csdeleteButtonContainer");
    deletebuttonContainer.innerHTML = ''; // Clear previous button
    deletebuttonContainer.appendChild(deleteButton);

    // Add event listener to the edit button
    editButton.addEventListener("click", function () {

        var form = document.getElementById("csmeditProfileForm");
        form.style.display = "block";
        document.getElementById("csmprofile").style.display = "none";

        var form = document.getElementById("csmeditProfileForm");
        form.style.display = "block";
        document.getElementById("csmprofile").style.display = "none";

        // Display save button
        saveButton.style.display = "block";
        editButton.style.display = "none";

        // Disable delete button
        deleteButton.disabled = true;
        deleteButton.style.backgroundColor = "#6f102e";




        // document.querySelector("#csmeditProfileForm #cecid").innerHTML = datai.CSid;

        document.querySelector("#csmeditProfileForm #cefname").value = datai.fname;
        document.querySelector("#csmeditProfileForm #celname").value = datai.lname;
        document.querySelector("#csmeditProfileForm #ceemail").value = datai.email;
        document.querySelector("#csmeditProfileForm #cecnum").value = datai.phone_number;

        saveButton.addEventListener("click", function () {
            messagebox.style.display = "block";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");
            messagetext.innerHTML = "Updating Profile...";
            messagebutton.style.display = "none";
            // Retrieve the updated values from the form fields
            // var csmId = document.querySelector("#csmeditProfileForm #cecid").innerHTML;
            var fname = document.querySelector("#csmeditProfileForm #cefname").value;
            var lname = document.querySelector("#csmeditProfileForm #celname").value;
            var email = document.querySelector("#csmeditProfileForm #ceemail").value;
            var cnum = document.querySelector("#csmeditProfileForm #cecnum").value;

            // Perform validation if needed

            // Prepare the data to send via AJAX
            var data = {
                csmId: csid,
                fname: fname,
                lname: lname,
                email: email,
                cnum: cnum,
                option: "updateDetails"
            };


            console.log(JSON.stringify(data));
            // Send an AJAX request to update the profile
            $.ajax({
                url: API_URL + '/Admin/CustomerSupportList',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (response) {

                    messageimg.setAttribute("src", "../../assets/img/Tick.png");
                    messagetext.innerHTML = "Update Successful";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("csmeditProfileForm").style.display = "none";
                    document.getElementById("csmprofile").style.display = "block";
                    showcsprof(csmId);
                    deleteButton.disabled = false;
                    deleteButton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                },
                error: function (error) {

                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    document.getElementById("csmeditProfileForm").style.display = "none";
                    document.getElementById("csmprofile").style.display = "block";
                    showcsprof(csmId);
                    deleteButton.disabled = false;
                    deleteButton.style.backgroundColor = "#c41950";

                    // Change to save button
                    saveButton.style.display = "none";
                    editButton.style.display = "block";
                    // Handle error response
                    console.error('Failed to update profile:', error);
                }
            });
        });
    });

    deleteButton.addEventListener("click", function () {
        messagebox.style.display = "block";
        messageimg.setAttribute("src", "../../assets/img/delete.png");
        messageimg.style.width = "13vh";
        messagetext.innerHTML = "Are you sure you want to delete this user?";

        var yesButton = document.createElement("button");
        yesButton.id = "yesButton";
        yesButton.className = "button";
        yesButton.innerHTML = "Yes";
        document.getElementById("proccessingBoxButtons").appendChild(yesButton);

        var NoBUtton = document.createElement("button");
        NoBUtton.id = "nobutton";
        NoBUtton.className = "button";
        NoBUtton.innerHTML = "No";
        NoBUtton.addEventListener("click", function () {
            messagebox.style.display = "none";
            messagebutton.innerHTML = '';

        });
        document.getElementById("proccessingBoxButtons").appendChild(NoBUtton);

        yesButton.addEventListener("click", function () {
            messagetext.innerHTML = "Please Wait..."
            messagebox.style.display = "block"
            messagebutton.style.display = "none";
            messageimg.setAttribute("src", "../../assets/img//Gear-0.3s-200px.gif");

            $.ajax({
                url: API_URL + '/Admin/CustomerSupportList?id=' + csmId,
                method: "DELETE",
                success: function (res) {
                    messagetext.innerHTML = "Customer Support Member Deleted Successfully";
                    messageimg.setAttribute("src", "../../assets/img/Tick.png")
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                    showcsmember();
                },
                error: function (error) {
                    messageimg.setAttribute("src", "../../assets/img/exclamation.png");
                    messagetext.innerHTML = "Something went wrong. Try Again";
                    messagebutton.style.display = "none";
                    setTimeout(function () {
                        messagebox.style.display = "none";
                    }, 1500);
                }

            })
        });
    });

    document.querySelector(".complaintCountgraph").innerHTML = '<canvas id="complaintCountgraph" style="width: 100%"></canvas>'
    var status = ["On Review", "Solved"];
    var count = [0, 0];
    count[0] = ticketcount.onReview;
    count[1] = ticketcount.Solved;
    document.querySelector(".complaintCount h1").innerHTML = "Total Complaints " + (Number(count[0]) + Number(count[1]));

    var barColors = ["#54bebe", "#c80064"]

    new Chart("complaintCountgraph", {
        type: "pie",
        data: {
            labels: status,
            datasets: [{
                backgroundColor: barColors,
                data: count,
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {


                    labels: {
                        color: "white"
                    }
                }
            },
            title: {
                display: true,

            }
        }
    });

}

function showVerification() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.remove("dropDownActive");

    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");


    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#verification").style.display = "block";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
    $("#load-container").show();
    $("#verificationList tbody").empty();

    $.ajax({
        url: API_URL + "/Admin/SPlist?option=getallsp",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();

                var tableBody = document.querySelector("#verificationList tbody");
                var nodata = document.querySelector("#nodata");
                // Start from index 1 to skip the first item in the JSON array
                for (var i = 0; i < res.data.length; i++) {

                    var datai = res.data[i];
                    if (datai.verify == "No") {
                        var row = tableBody.insertRow();
                        row.insertCell(0).textContent = datai.garageName || '-';
                        row.insertCell(1).textContent = datai.phoneNumber || '-';
                        if (datai.type == "Garage") {
                            row.insertCell(2).textContent = "Garage" || '-';
                        }
                        else {
                            row.insertCell(2).textContent = "Maintainance Personnel" || '-';
                        }




                        // Add buttons
                        var viewButtonCell = row.insertCell(3);
                        var viewButton = document.createElement("button");
                        viewButton.type = "button";
                        viewButton.className = "verifyBu locView";
                        viewButton.textContent = "View";
                        var locationpoints = datai.location.split(",");
                        var link = `https://www.google.com/maps/search/?api=1&query=${locationpoints[0]},${locationpoints[1]}`;

                        viewButton.setAttribute("onclick", "window.open('" + link + "', '_blank')");
                        viewButtonCell.appendChild(viewButton);

                        var actionButtonCell = row.insertCell(4);
                        var verifyButton = document.createElement("button");
                        verifyButton.type = "button";
                        verifyButton.className = "verifyBu verify";
                        verifyButton.textContent = "Verify";

                        actionButtonCell.appendChild(verifyButton);

                        var cancelButton = document.createElement("button");
                        cancelButton.type = "button";
                        cancelButton.className = "verifyBu cancle";
                        cancelButton.textContent = "Cancel";
                        actionButtonCell.appendChild(cancelButton);


                        (function (verifyButton, cancelButton, row, datai) {

                            verifyButton.addEventListener('click', function () {
                                messagetext.innerHTML = "Please Wait..."
                                messagebox.style.display = "block"
                                messagebutton.style.display = "none";
                                datai.verify = "Yes";
                                const data = {
                                    id: datai.id,
                                    verify: "Yes",
                                    option: "verify"
                                }

                                $.ajax({
                                    url: API_URL + "/Admin/SPlist",
                                    method: "PUT",

                                    contentType: "application/json",
                                    data: JSON.stringify(data),
                                    success: function (res) {
                                        if (res.status == 200) {
                                            messagebutton.style.display = "none";
                                            messagetext.innerHTML = "Verification Successfull"
                                            messageimg.setAttribute("src", "../../assets/img/Tick.png")
                                            row.remove();
                                            setTimeout(function () {
                                                messagebox.style.display = "none";
                                            }, 1500);
                                        } else {
                                            console.log("error");
                                        }
                                    }
                                });
                            });
                            cancelButton.addEventListener('click', function () {
                                messagetext.innerHTML = "Please Wait..."
                                messagebox.style.display = "block"
                                messagebutton.style.display = "none";
                                $.ajax({
                                    url: API_URL + "/Admin/SPlist?id=" + datai.id,
                                    method: "DELETE",
                                    contentType: "application/json",
                                    success: function (res) {
                                        if (res.status == 200) {
                                            messagebutton.style.display = "none";
                                            messagetext.innerHTML = "Cancle Verification Successfull"
                                            messageimg.setAttribute("src", "../../assets/img/Tick.png")
                                            row.remove();
                                            setTimeout(function () {
                                                messagebox.style.display = "none";
                                            }, 1000);
                                        } else {
                                            console.log("error");
                                        }
                                    }
                                });
                            });

                            if (tableBody.rows.length == 0) {
                                document.querySelector("#verificationList").innerHTML = '';
                                nodata.style.display = "block";
                            }
                        })(verifyButton, cancelButton, row, datai);




                    }

                }

                if (tableBody.rows.length == 0) {
                    document.querySelector("#verificationList").innerHTML = '';
                    nodata.style.display = "block";
                }


            }
            else {
                console.log("error");
            }
        }
    });

}

function showReports() {
    $("#load-container").show();
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.add("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.remove("dropDownActive");
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#adminProfile").style.display = "none";
    document.querySelector("#reports").style.display = "block";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
    var customerCols;
    var spCols;
    var csmemberCols;
    var supportTicketCols;
    var paymentCols;

    $("#load-container").hide();

    // $.ajax({
    //     url: API_URL + "/Report",
    //     method: "GET",
    //     success: function (res) {

    //         if (res.status == 200) {
    //             $("#load-container").hide();
    //             customerCols = res.data[0];
    //             spCols = res.data[1];
    //             csmemberCols = res.data[2];
    //             supportTicketCols = res.data[3];
    //             paymentCols = res.data[4];



    //         }
    //         else {
    //             console.log("error");
    //         }
    //     }
    // });

    // var areabuttonArray = document.querySelectorAll(".reportArea .areaButtons div button");

    // var selectedIndex = -1; // Initialize selectedIndex variable

    // areabuttonArray.forEach(function (button, index) {

    //     button.addEventListener('click', function () {
    //         // Remove 'selected' class from all buttons
    //         areabuttonArray.forEach(function (btn) {
    //             btn.classList.remove('selected');
    //         });

    //         // Add 'selected' class to the clicked button
    //         this.classList.add('selected');

    //         // Update selectedIndex with the index of the clicked button
    //         selectedIndex = index;
    //         console.log("Selected index: " + selectedIndex);

    //         var selectedCols;
    //         switch (selectedIndex) {
    //             case 0:
    //                 selectedCols = customerCols;
    //                 break;
    //             case 1:
    //                 selectedCols = spCols;
    //                 break;
    //             case 2:
    //                 selectedCols = spCols;
    //                 break;
    //             case 3:
    //                 selectedCols = csmemberCols;
    //                 break;
    //             case 4:
    //                 selectedCols = supportTicketCols;
    //                 break;
    //             case 5:
    //                 selectedCols = paymentCols;
    //                 break;
    //         }

    //         var columnsCB = document.querySelector(".columnsCB");
    //         var title = document.querySelector(".columnsCB h1");
    //         columnsCB.style.display = "block";
    //         columnsCB.innerHTML = ""; // Clear existing checkboxes
    //         columnsCB.appendChild(title);

    //         selectedCols.forEach(function (columnName) {
    //             var texttag = formatString(columnName);
    //             var checkboxDiv = document.createElement("div");
    //             var checkbox = document.createElement("input");
    //             checkbox.type = "checkbox";
    //             checkbox.name = "column";
    //             checkbox.value = columnName;
    //             var label = document.createElement("label");
    //             if (columnName == "f_name") {
    //                 label.textContent = "First Name";
    //             }
    //             else if (columnName == "l_name") {
    //                 label.textContent = "Last Name";
    //             }
    //             else {
    //                 label.textContent = texttag;
    //             }

    //             checkboxDiv.appendChild(checkbox);
    //             checkboxDiv.appendChild(label);
    //             columnsCB.appendChild(checkboxDiv);
    //         });
    //     });
    // });

    // document.querySelector('.ButtonsRow .preview').addEventListener('click', function () {

    //     var reportName = document.querySelector('#reports input[placeholder="Report Name"]').value;
    //     var checkedValues = [];

    //     // Loop through the checkboxes to get the checked values
    //     var checkboxes = document.querySelectorAll('.columnsCB input[type="checkbox"]');
    //     checkboxes.forEach(function (checkbox) {
    //         if (checkbox.checked) {
    //             var labelText = checkbox.nextSibling.textContent.trim();
    //             checkedValues.push(labelText);
    //         }
    //     });
    //     console.log(checkedValues);

    //     // Construct the query parameter string
    //     var queryParams = '?checkedValues=' + encodeURIComponent(JSON.stringify(checkedValues)) +
    //         '&reportTitle=' + encodeURIComponent(reportName) +
    //         '&selectedAreaIndex=' + selectedIndex;

    //     // Open the preview.html file in a new window/tab with the query parameters
    //     window.open('invoice.html' + queryParams);
    // });

    // document.addEventListener('DOMContentLoaded', function () {
    //     document.querySelector('.ButtonsRow .download').addEventListener('click', function () {
    //         var scriptElement = document.createElement('script');
    //         scriptElement.src = 'invoice.js'; // Replace 'invoice.js' with the correct path to your invoice.js file
    //         document.body.appendChild(scriptElement);
    //     });
    // });




    // var reportName = document.querySelector('#reports input[placeholder="Report Name"]').value;
    // var reportType = document.querySelector('#reports select[name="reportType"]').value;
    // var reportFormat = document.querySelector('#reports select[name="reportFormat"]').value;
    // var selectedAreas = document.querySelectorAll('.areaButtons button.selected')
    // var selectedColumns = Array.from(document.querySelectorAll('.columnsCB input[type="checkbox"]:checked')).map(checkbox => checkbox.nextSibling.textContent.trim());
    // var selectedRowId = document.querySelector('.rowsSec select').value;
    // var specialFilters = {
    //     key: document.querySelector('.spfilters select:first-of-type').value,
    //     value: document.querySelector('.spfilters select:last-of-type').value
    // };

    // console.log(reportName, reportType, reportFormat, selectedAreas)
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var monthsToShow = [];
    var months = [];


    for (var i = 0; i < 5; i++) {
        var monthIndex = (currentMonth - i) % 12;

        if (monthIndex < 0) {
            monthIndex += 12;
            currentYear -= 1;
        }
        months.unshift(`${xValues[monthIndex]}`);

        monthsToShow.unshift(`${xValues[monthIndex]} ${currentYear}`);
    }

    var rdatafilter = [];
    var ddatafilter = [];
    // var onlinefilter = [];
    // var cashfilter = [];
    var i = 0;
    months.forEach(function (month) {
        var mindex = xValues.indexOf(month);

        rdatafilter[i] = rdata[mindex];
        ddatafilter[i] = ddata[mindex];
        // onlinefilter[i] = online[mindex];
        // cashfilter[i] = cash[mindex];

        i++;
    });

    // var monthlyProfit = [];
    // onlinefilter.forEach(function (value) {
    //     monthlyProfit.push(value * 0.1);
    // });


    // **************DashBoard-Registation Bar Chart*******************

    new Chart("barchatRecent", {
        type: "bar",
        data: {
            labels: monthsToShow,
            datasets: [{
                label: "Registations",
                data: rdatafilter,
                backgroundColor: "#54bebe"
            }, {
                label: "Account Deletions",
                data: ddatafilter,
                backgroundColor: "#c80064"
            }]
        },
        options: {
            maintainAspectRatio: false,
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

}

function showProfile() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");
    document.querySelector("#techDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csmember").style.display = "none";
    document.querySelector("#csprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#verification").style.display = "none";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#adminProfile").style.display = "block";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#technitian").style.display = "none";
    document.querySelector("#techprof").style.display = "none";
    document.querySelector("#Reportcontent").style.display = "none";
}


// Dropdown side menu

let dropDownContainer = document.querySelector(".dropdown-container");
function toggleDropdown() {
    dropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}


// Calculate the mean location of a set of coordinates
// function calculateMeanLocation(coordinates) {
//     let totalLat = 0;
//     let totalLng = 0;


//     coordinates.forEach(coord => {
//         const [lat, lng] = coord.split(',').map(parseFloat);
//         totalLat += lat;
//         totalLng += lng;
//     });

//     const meanLat = totalLat / coordinates.length;
//     const meanLng = totalLng / coordinates.length;

//     return [meanLat, meanLng];
// }


function calculateMedianLocation(coordinates) {
    // Convert coordinates to an array of [latitude, longitude] pairs
    const coordsArray = coordinates.map(coord => coord.split(',').map(parseFloat));

    // Sort the coordinates based on latitude
    const sortedByLat = coordsArray.slice().sort((a, b) => a[0] - b[0]);

    // Sort the coordinates based on longitude
    const sortedByLng = coordsArray.slice().sort((a, b) => a[1] - b[1]);

    // Find the median latitude
    const medianLat = sortedByLat[Math.floor(sortedByLat.length / 2)][0];

    // Find the median longitude
    const medianLng = sortedByLng[Math.floor(sortedByLng.length / 2)][1];

    return [medianLat, medianLng];
}

document.addEventListener("DOMContentLoaded", function () {
    // **************DashBoard-Recent moment bar chat*******************

    var xValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];
    var rdata = Array.from({ length: 12 }, () => 0);
    var ddata = Array.from({ length: 12 }, () => 0);
    var online = Array.from({ length: 12 }, () => 0);
    var cash = Array.from({ length: 12 }, () => 0);

    $("#load-container").show();

    $.ajax({
        url: API_URL + "/Admin/customerCard",
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#load-container").hide();

                var currentDate = new Date();
                var currentMonth = currentDate.getMonth();

                var currentYear = currentDate.getFullYear();
                var monthsToShow = [];
                var months = [];

                var sp = res.data.serviceP;
                var Analytics = res.data.analyticsData;

                // Analytics Cards
                document.querySelector("#registeredCustomersNum").innerHTML = Analytics[0].CustomerNum;
                document.querySelector("#registeredSproviders").innerHTML = Analytics[0].sproviderNum;
                document.querySelector("#completedTasksCount").innerHTML = Analytics[0].CompletedTaskCount;
                document.querySelector("#reportCount").innerHTML = Analytics[0].SupportTicketCount;

                var tableBody = document.querySelector("#RecentReportSection tbody");



                // Recent 5 support cards table
                var complaints = Analytics[1];
                for (var i = 1; i < 6; i++) {
                    (function () {
                        var datai = complaints[i];

                        var row = tableBody.insertRow();
                        row.insertCell(0).textContent = datai.name || '';
                        row.insertCell(1).textContent = datai.title || '';
                        row.insertCell(2).textContent = datai.date || '';
                        row.insertCell(3).textContent = datai.status.charAt(0).toUpperCase() + datai.status.slice(1) || '';
                        var id = datai.ticketId;
                        row.addEventListener('click', function () {
                            var name = this.cells[0].textContent;
                            showsupportTicket(id, name, "getbyNameandId");
                        });
                    })();
                }


                // Verifications
                // var verificationcount = 0;
                // var templatecount = 0;
                // sp.forEach(function (entry) {
                //     if (entry.verify === "No") {
                //         verificationcount++;
                //         if (templatecount < 3) {
                //             templatecount++;
                //             var temp = document.getElementById("verificationRequestsTemplate");
                //             var clone = temp.content.cloneNode(true);
                //             var pElement = clone.querySelector("p"); // Adjusted selector
                //             if (pElement) {
                //                 pElement.textContent = entry.garageName || '-';
                //                 document.querySelector(".table").appendChild(clone); // Changed selector
                //             }
                //         }
                //     }
                // });

                // document.querySelector("#number").textContent = verificationcount;

                // Charts Data
                // Account Deletions and Registrations
                var registation = Analytics[2];
                var deletions = Analytics[3];
                // var Payment = Analytics[4];

                registation.forEach(function (entry) {
                    var monthIndex = xValues.indexOf(entry.month);

                    if (monthIndex !== -1) {
                        rdata[monthIndex] += entry.registrations;
                    }
                });

                deletions.forEach(function (entry) {
                    var monthIndex = xValues.indexOf(entry.month);
                    if (monthIndex !== -1) {
                        ddata[monthIndex] += entry.deletion;
                    }
                });

                // Payment.forEach(function (entry) {
                //     var monthIndex = entry.month - 1;

                //     if (monthIndex !== -1) {
                //         online[monthIndex] += entry.online;
                //         cash[monthIndex] += entry.cash;
                //     }
                // });


                for (var i = 0; i < 5; i++) {
                    var monthIndex = (currentMonth - i) % 12;

                    if (monthIndex < 0) {
                        monthIndex += 12;
                        currentYear -= 1;
                    }
                    months.unshift(`${xValues[monthIndex]}`);

                    monthsToShow.unshift(`${xValues[monthIndex]} ${currentYear}`);
                }

                var rdatafilter = [];
                var ddatafilter = [];
                // var onlinefilter = [];
                // var cashfilter = [];
                var i = 0;
                months.forEach(function (month) {
                    var mindex = xValues.indexOf(month);

                    rdatafilter[i] = rdata[mindex];
                    ddatafilter[i] = ddata[mindex];
                    // onlinefilter[i] = online[mindex];
                    // cashfilter[i] = cash[mindex];

                    i++;
                });

                // var monthlyProfit = [];
                // onlinefilter.forEach(function (value) {
                //     monthlyProfit.push(value * 0.1);
                // });


                // **************DashBoard-Registation Bar Chart*******************
                var ctx1 = document.getElementById("barchatRecent").getContext('2d');
                new Chart("barchatRecent", {
                    type: "bar",
                    data: {
                        labels: monthsToShow,
                        datasets: [{
                            label: "Registations",
                            data: rdatafilter,
                            backgroundColor: "#54bebe"
                        }, {
                            label: "Account Deletions",
                            data: ddatafilter,
                            backgroundColor: "#c80064"
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
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



                // // **************DashBoard-Payment line Chart*******************
                // var ctx = document.getElementById("linePayment").getContext('2d');
                // var myChart = new Chart(ctx, {
                //     type: 'line',
                //     data: {
                //         labels: monthsToShow,
                //         datasets: [{
                //             label: 'Cash Payments',
                //             data: cashfilter,
                //             fill: false,
                //             borderColor: '#2196f3',
                //             backgroundColor: '#2196f3',
                //             borderWidth: 1
                //         },
                //         {
                //             label: 'Online Payments',
                //             data: onlinefilter,
                //             fill: false,
                //             borderColor: '#00E096',
                //             backgroundColor: '#00E096',
                //             borderWidth: 1
                //         }]
                //     },
                //     options: {
                //         plugins: { legend: { labels: { color: "white" } } },
                //         responsive: true,
                //         maintainAspectRatio: false,
                //         scales: {
                //             x: {
                //                 ticks: {
                //                     color: "white"
                //                 }
                //             },
                //             y: {
                //                 ticks: {
                //                     color: "white"
                //                 }
                //             }
                //         }
                //     }
                // });

                // // *************Mounthly Profit Pie Chart*******************
                // barColors = ["#193741", "#3e5e63", "#588184", "#7ea996", "#90c5a7"]
                // new Chart("lineChartProfit", {
                //     type: "line",
                //     data: {
                //         labels: monthsToShow,
                //         datasets: [{
                //             label: 'Monthly Profit',
                //             data: monthlyProfit,
                //             fill: false,
                //             borderColor: '#2196f3',
                //             backgroundColor: '#2196f3',
                //             borderWidth: 1
                //         }]
                //     },
                //     options: {
                //         plugins: { legend: { labels: { color: "white" } } },
                //         responsive: true,
                //         maintainAspectRatio: false,
                //         scales: {
                //             x: {
                //                 ticks: {
                //                     color: "white"
                //                 }
                //             },
                //             y: {
                //                 ticks: {
                //                     color: "white"
                //                 }
                //             }
                //         }
                //     }
                // });


                // view location
                var splocation = res.data.locations.ServiceProviders;
                var srlocation = res.data.locations.ServiceRequests;

                var spCoordinates = splocation.map(function (location) {
                    var coordinates = location.split(','); // Assuming coordinates are in format "latitude,longitude"
                    return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
                });

                const srcoordinates = srlocation.map(locationString => {
                    const matches = locationString.match(/latitude=(-?\d+\.\d+), longitude=(-?\d+\.\d+)/);
                    if (matches) {
                        return `${matches[1]},${matches[2]}`;
                    }
                });

                var srCoordinatesMark = srcoordinates.map(function (location) {
                    var coordinates = location.split(',');
                    return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
                });


                var map = L.map("spmap").setView(calculateMedianLocation(splocation), 12);


                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);



                spCoordinates.forEach(function (location) {

                    L.marker(location)
                        .addTo(map)
                        .bindPopup(location.name);
                });



                var map = L.map("map").setView(calculateMedianLocation(srcoordinates), 12);


                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);



                srCoordinatesMark.forEach(function (location) {

                    L.marker(location)
                        .addTo(map)
                        .bindPopup(location.name);
                });



                // Demand pie chart
                var demand = res.data.demand;
                const expertiseArray = demand.map(item => item.expertise);
                const requestCountArray = demand.map(item => item.request_count);
                var barColors = ["#54bebe", "#76c8c8", "#badbdb", "#dedad2", "#df979e", "#d7658b", "#c80064"]
                console.log(expertiseArray);
                console.log(requestCountArray);
                new Chart("demandChart", {
                    type: "pie",
                    data: {
                        labels: expertiseArray,
                        datasets: [{
                            backgroundColor: barColors,
                            data: requestCountArray,
                            borderWidth: 0
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {

                                position: 'right',
                                labels: {
                                    color: "white"
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: "World Wide Wine Production"
                        }
                    }
                });

            } else {
                console.log("error");
            }
        }
    });



});


// **************FAQ-Toggle answer of question*******************

// document.addEventListener("DOMContentLoaded", function () {
//     const questions = document.querySelectorAll(".question");

//     questions.forEach(function (question) {
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


