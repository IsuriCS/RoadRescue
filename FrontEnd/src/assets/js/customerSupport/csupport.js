var API_URL = "http://localhost:8082/roadRescueBackend";


// Navigate
function showDashboard() {
    document.querySelector("#dashboardLink").classList.add("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    // document.querySelector("#GarageDropDown").classList.remove("submenuActive");
    // document.querySelector("#MPDropDown").classList.remove("submenuActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");



    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    // document.querySelector("#garageOwners").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#maintainancePersonnel").style.display = "none";
    // document.querySelector("#MaintainacePersonnelProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";


}




function showcus() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#customerDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");



    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "block";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";


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
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    // document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    
    // Update the title
    var title = document.querySelector("#cusprof .topRow h1");
    title.innerHTML = `Customer > C${customerId.padStart(3, '0')}`;



    for (var i = 0; i < res.data.length; i++) {

        if (res.data[i].customerId == customerId) {

            var datai = res.data[i];
            var name = datai.fname + " " + datai.lname;
            document.getElementById("cid").innerHTML = datai.customerId;
            document.getElementById("fname").innerHTML = datai.fname || '-';
            document.getElementById("lname").innerHTML = datai.lname || '-';
            document.getElementById("email").innerHTML = datai.email || '-';
            document.getElementById("cnum").innerHTML = datai.contact || '-';

            if (datai.nSupportTickets > 0) {

                // Remove created ticket cards
                var ticketList = document.querySelectorAll(".SuppotTicketcard");
                console.log(ticketList);
                if (ticketList.length > 0) {
                    ticketList.forEach(function (ticket) {
                        ticket.remove();
                    });
                }

                // request ticket details from backend
                $.ajax({
                    url: API_URL + "/customerSupport",
                    method: "GET",
                    success: function (res) {
                        console.log(res);
                        if (res.status == 200) {


                            for (var i = 0; i < res.data.length; i++) {
                                (function () {
                                    var datai = res.data[i];
                                    if (datai.customerID == customerId) {


                                        var temp = document.getElementById("supportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".SuppotTicketcard h1").textContent = `ST-${String(datai.ticketId).padStart(3, '0')}`;
                                        console.log(datai.ticketId);
                                        var dateTime = new Date(datai.created_time);
                                        var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
                                        clone.querySelector(".SuppotTicketcard .row .date p").textContent = formattedDate;

                                        // Update ticket title
                                        clone.querySelector(".SuppotTicketcard .row .title p").textContent = datai.title;

                                        // Change status button
                                        var status = datai.status;
                                        var sbutton = clone.querySelector(".SuppotTicketcard .solveButton button");

                                        if (status.toLowerCase() == "pending") {
                                            sbutton.classList.add("pending");
                                            sbutton.textContent = "Pending";
                                        }
                                        else if (status.toLowerCase() == "solved") {
                                            sbutton.classList.add("solved");
                                            sbutton.textContent = "Solved";
                                        }
                                        else {
                                            sbutton.classList.add("on_review");
                                            sbutton.textContent = "On Review";
                                        }

                                        clone.querySelector(".SuppotTicketcard").addEventListener('click', function () {
                                            showsupportTicket(res, datai.ticketId, name);
                                            console.log(res, datai.ticketId, name);

                                        });
                                        document.getElementById("no_support_tickets").style.display = "none";
                                        document.getElementById("support_ticket_list").style.display = "block";
                                        document.getElementById("support_ticket_list").appendChild(clone);
                                    }
                                })();


                            }
                            $("#load-container").hide();
                        }
                        else {
                            console.log("error");
                        }
                    }
                })

            }
            else {
                $("#load-container").hide();
                document.getElementById("no_support_tickets").style.display = "block";
                document.getElementById("support_ticket_list").style.display = "none";

            }
        }

    }

}



function showsupportTicket(res, ticketId, name) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "block";
    // document.querySelector("#csmember").style.display = "none";
    // document.querySelector("#csprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";


    // Update the title
    var ttitle = document.querySelector("#SupportTicketDatail .topRow h1");
    ttitle.innerHTML = `Reports > ST${String(ticketId).padStart(3, '0')}`;


    for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].ticketId == ticketId) {
            var datai = res.data[i];

            document.getElementById("ticketID").innerHTML = datai.ticketId;
            document.getElementById("CustomerSupportID").innerHTML = datai.customer_support_member_id || '-';
            document.getElementById("userID").innerHTML = datai.customerID || '-';
            document.getElementById("userName").innerHTML = name || '-';
            document.getElementById("title").innerHTML = datai.title || '-';
            document.getElementById("description").innerHTML = datai.description || '-';
            var dateTime = new Date(datai.created_time);
            var formattedDate = dateTime.toLocaleDateString();
            document.getElementById("Date").innerHTML = formattedDate || '-';

            var ticketStatus = datai.status;

            var asignbtn = document.getElementById("assignbtn");
            if (ticketStatus.toLowerCase() == "pending") {
                asignbtn.style.display = "block";
                document.querySelector(".info textarea").innerHTML = "";
                document.querySelector(".info textarea").disabled = false;
                document.querySelector(".info textarea").classList.remove("disabledText");
                document.querySelector(".topRow #button").style.display = "block";
            }
            else if (ticketStatus.toLowerCase() == "solved") {
                asignbtn.style.display = "none";
                document.querySelector(".info textarea").innerHTML = datai.solution || "-";
                document.querySelector(".info textarea").disabled = true;
                document.querySelector(".info textarea").classList.add("disabledText");
                document.querySelector(".topRow #button").style.display = "none";
            }
            else {
                asignbtn.style.display = "none";
                document.querySelector(".info textarea").innerHTML = "";
                document.querySelector(".info textarea").disabled = false;
                document.querySelector(".info textarea").classList.remove("disabledText");
                document.querySelector(".topRow #button").style.display = "block";
            }
            $("#load-container").hide();
        }
    }
}



function showServiceProviders() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";   
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    
  
    

    var garage = document.getElementById("garages");
    var mp = document.getElementById("maintainancep");
    var tableBody = document.querySelector("#SPList tbody");
    $("#load-container").show();
    $.ajax({
        url: API_URL + "/Admin/SPlist",
        method: "GET",
        success: function (res) {

            $("#load-container").hide();
            if (res.status == 200) {

                tableBody.innerHTML = "";
                for (var i = 0; i < res.data.length; i++) {

                    var datai = res.data[i];
                    var row = tableBody.insertRow();
                    row.insertCell(0).textContent = datai.id || '-';
                    row.insertCell(1).textContent = datai.garageName || '--';
                    row.insertCell(2).textContent = datai.phoneNumber || '-';
                    row.insertCell(3).textContent = datai.comRequests || '0';
                    row.insertCell(4).textContent = datai.supTickets || '0';
                    row.insertCell(5).textContent = datai.type || '-';
                    row.cells[5].style.display = 'none';
                    row.addEventListener('click', function () {
                        var id = this.cells[0].textContent;
                        showSPprof(res, id);

                    })

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


    garage.addEventListener("change", function () {

        var table = document.getElementById("SPList");
        var tr = table.getElementsByTagName("tr");

        for (var i = 1; i < tr.length; i++) {


            var td = tr[i].getElementsByTagName("td")[5];
            var textValue = td.textContent || td.innerText;
            if (garage.checked == true && mp.checked == true) {
                tr[i].style.display = "";

            }
            else if (garage.checked == true && mp.checked == false) {
                if (textValue == "Garage") {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
            else if (garage.checked == false && mp.checked == true) {
                if (textValue == "Mp") {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }

            else {

                tr[i].style.display = "none";


            }
        }
    });

    mp.addEventListener("change", function () {

        var table = document.getElementById("SPList");
        var tr = table.getElementsByTagName("tr");

        for (var i = 1; i < tr.length; i++) {


            var td = tr[i].getElementsByTagName("td")[5];
            var textValue = td.textContent || td.innerText;
            if (garage.checked == true && mp.checked == true) {
                tr[i].style.display = "";

            }
            else if (garage.checked == true && mp.checked == false) {
                if (textValue == "Garage") {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
            else if (garage.checked == false && mp.checked == true) {
                if (textValue == "Mp") {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }

            else {

                tr[i].style.display = "none";


            }
        }
    });


}



function showSPprof(res, spid) {
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "block";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";

    // Update the title
    var title = document.querySelector("#GarageProf .topRow h1");




    for (var i = 0; i < res.data.length; i++) {

        if (res.data[i].id == spid) {

            var datai = res.data[i];
            if (datai.type == "Garage") {
                title.innerHTML = `Servie Provider > G${spid.padStart(3, '0')}`;
            }
            else {
                title.innerHTML = `Servie Provider > M${spid.padStart(3, '0')}`;
            }

            document.getElementById("id").innerHTML = datai.id;
            document.getElementById("gname").innerHTML = datai.garageName || '-';
            document.getElementById("oname").innerHTML = datai.owner_name || '-';
            document.getElementById("pnum").innerHTML = datai.phoneNumber || '-';
            document.getElementById("email").innerHTML = datai.email || '-';

            // set locaton link
            var locationpoints = datai.location.split(",");
            var link = `https://www.google.com/maps/search/?api=1&query=${locationpoints[0]},${locationpoints[1]}`;

            document.getElementById("location").setAttribute("href", link);
            document.getElementById("compservice").innerHTML = datai.comRequests || '0';

            // format date
            var dateTime = new Date(datai.Date);
            var formattedDate = dateTime.toLocaleDateString();
            document.getElementById("date").innerHTML = datai.formattedDate || '0';

            var name = datai.owner_name;
            // View support Tickets
            if (datai.supTickets > 0) {

                // Remove created ticket cards
                var ticketList = document.querySelectorAll(".spSuppotTicketcard");
                console.log(ticketList);
                if (ticketList.length > 0) {
                    ticketList.forEach(function (ticket) {
                        ticket.remove();
                    });
                }

                // request ticket details from backend
                $.ajax({
                    url: API_URL + "/SPSupportTicket",
                    method: "GET",
                    success: function (tres) {
                        console.log(tres);
                        if (tres.status == 200) {


                            for (var i = 0; i < tres.data.length; i++) {
                                (function () {
                                    var sdatai = tres.data[i];
                                    if (sdatai.SPid == spid) {
                                        console.log("inside if");

                                        var temp = document.getElementById("spsupportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".spSuppotTicketcard h1").textContent = `ST-${String(sdatai.ticketId).padStart(3, '0')}`;
                                        console.log(sdatai.ticketId);
                                        var dateTime = new Date(sdatai.created_time);
                                        var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
                                        clone.querySelector(".spSuppotTicketcard .row .date p").textContent = formattedDate;

                                        // Update ticket title
                                        clone.querySelector(".spSuppotTicketcard .row .title p").textContent = sdatai.title;

                                        // Change status button
                                        var status = sdatai.status;
                                        var sbutton = clone.querySelector(".spSuppotTicketcard .solveButton button");

                                        if (status.toLowerCase() == "pending") {
                                            sbutton.classList.add("pending");
                                            sbutton.textContent = "Pending";
                                        }
                                        else if (status.toLowerCase() == "solved") {
                                            sbutton.classList.add("solved");
                                            sbutton.textContent = "Solved";
                                        }
                                        else {
                                            sbutton.classList.add("on_review");
                                            sbutton.textContent = "On Review";
                                        }

                                        clone.querySelector(".spSuppotTicketcard").addEventListener('click', function () {
                                            showsupportTicket(tres, sdatai.ticketId, name);
                                            console.log(tres, sdatai.ticketId, name);

                                        });
                                        document.getElementById("spno_support_tickets").style.display = "none";
                                        document.getElementById("spsupport_ticket_list").style.display = "block";
                                        document.getElementById("spsupport_ticket_list").appendChild(clone);
                                        console.log("appended");
                                    }
                                })();


                            }
                            $("#load-container").hide();
                        }
                        else {
                            console.log("error");
                        }
                    }
                })

            }
            else {
                $("#load-container").hide();
                document.getElementById("spno_support_tickets").style.display = "block";
                document.getElementById("spsupport_ticket_list").style.display = "none";

            }
        }

    }
}




function showTicket(){
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "block";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
 

}


function showProfile  (){
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "block";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";

}



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

//             }catch{
//                 console.log("error");
//             }


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






// const API_URL = "http://localhost:8082/roadRescueBackend";
$.ajax({
    url: API_URL + "/customerSupport",
    method: "GET",
    success: function (res) {
        // res = $.parseJSON(res);
        if (res.status == 200) {
            try{
                res.data.forEach(customer => {
                    document.querySelector("#customer_support_member_id").innerHTML = res.data[0].customer_support_member_id;
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



// function postData() {
//     let jsonObj = {
//         solution : document.getElementById("solution").value,
//         supportTickerId : parseInt(document.querySelector("#customer_support_member_id").innerHTML)
//     }

//     console.log(JSON.stringify(jsonObj));

//     $.ajax({
//         url: API_URL + "/customerSupport",
//         method: "PUT",
//         data: JSON.stringify(jsonObj),
//         success: function (res) {
//             res = $.parseJSON(res);
//             if (res.status == 200) {
//                 alert(res.message);
//             }
//         }
//     });
// }
