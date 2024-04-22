

const API_URL = "http://localhost:8080/roadRescue";


var messagebox = document.querySelector("#messageBox");
var messageimg = document.querySelector("#messageBox #proccessing_boxes #icon img");
var messagetext = document.querySelector("#messageBox #proccessing_boxes #Text p");

// abc_abc ----> Abc Abc
function formatString(str) {
    var words = str.split('_').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
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
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

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



    var garage = document.getElementById("garages");
    var mp = document.getElementById("maintainancep");
    var tableBody = document.querySelector("#SPList tbody");
    $("#load-container").show();
    $.ajax({
        url: API_URL + "/Admin/SPlist",
        method: "GET",
        success: function (res) {


            if (res.status == 200) {
                $("#load-container").hide();
                tableBody.innerHTML = "";
                for (var i = 0; i < res.data.length; i++) {

                    var datai = res.data[i];
                    if (datai.verify == "Yes") {
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

function showcsmember() {

    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");

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
                    row.insertCell(0).textContent = datai.CSid || '-';
                    row.insertCell(1).textContent = datai.fname + " " + datai.lname || '--';
                    row.insertCell(2).textContent = datai.phone_number || '-';
                    row.insertCell(3).textContent = datai.tickets_solved || '0';


                    row.addEventListener('click', function () {
                        var csid = this.cells[0].textContent;
                        showcsprof(res, csid);

                    })
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


}

function showcsprof(res, csid) {
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


    // Update the title
    var title = document.querySelector("#csprof .topRow h1");
    title.innerHTML = `Customer Support Member > CS${csid.padStart(3, '0')}`;



    for (var i = 0; i < res.data.length; i++) {

        if (res.data[i].CSid == csid) {

            var datai = res.data[i];
            var name = datai.fname + " " + datai.lname;
            document.getElementById("csid").innerHTML = datai.CSid;
            document.getElementById("csfname").innerHTML = datai.fname || '-';
            document.getElementById("cslname").innerHTML = datai.lname || '-';
            document.getElementById("csemail").innerHTML = datai.email || '-';
            document.getElementById("cscnum").innerHTML = datai.phone_number || '-';

            if (datai.tickets_solved > 0) {

                // Remove created ticket cards
                var ticketList = document.querySelectorAll(".csSuppotTicketcard");
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
                            // $("#load-container").hide();

                            for (var i = 0; i < res.data.length; i++) {
                                (function () {
                                    var datai = res.data[i];
                                    if (datai.customer_support_member_id == csid) {


                                        var temp = document.getElementById("cssupportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".csSuppotTicketcard h1").textContent = `CST-${String(datai.ticketId).padStart(3, '0')}`;
                                        console.log(datai.ticketId);
                                        var dateTime = new Date(datai.created_time);
                                        var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
                                        clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

                                        // Update ticket title
                                        clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

                                        // Change status button
                                        var status = datai.status;
                                        var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

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

                                        clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
                                            showsupportTicket(res, datai.ticketId, name);
                                            console.log(res, datai.ticketId, name);

                                        });
                                        document.getElementById("csno_support_tickets").style.display = "none";
                                        document.getElementById("cssupport_ticket_list").style.display = "block";
                                        document.getElementById("cssupport_ticket_list").appendChild(clone);
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

                $.ajax({
                    url: API_URL + "/SPSupportTicket",
                    method: "GET",
                    success: function (res) {
                        $("#load-container").hide();
                        console.log(res);
                        if (res.status == 200) {


                            for (var i = 0; i < res.data.length; i++) {
                                (function () {
                                    var datai = res.data[i];
                                    if (datai.customer_support_member_id == csid) {


                                        var temp = document.getElementById("cssupportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".csSuppotTicketcard h1").textContent = `SST-${String(datai.ticketId).padStart(3, '0')}`;
                                        console.log(datai.ticketId);
                                        var dateTime = new Date(datai.created_time);
                                        var formattedDate = dateTime.toLocaleDateString(); // Format the date as per locale
                                        clone.querySelector(".csSuppotTicketcard .row .date p").textContent = formattedDate;

                                        // Update ticket title
                                        clone.querySelector(".csSuppotTicketcard .row .title p").textContent = datai.title;

                                        // Change status button
                                        var status = datai.status;
                                        var sbutton = clone.querySelector(".csSuppotTicketcard .solveButton button");

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

                                        clone.querySelector(".csSuppotTicketcard").addEventListener('click', function () {
                                            showsupportTicket(res, datai.ticketId, name);
                                            console.log(res, datai.ticketId, name);

                                        });
                                        document.getElementById("csno_support_tickets").style.display = "none";
                                        document.getElementById("cssupport_ticket_list").style.display = "block";
                                        document.getElementById("cssupport_ticket_list").appendChild(clone);
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
                document.getElementById("csno_support_tickets").style.display = "block";
                document.getElementById("cssupport_ticket_list").style.display = "none";

            }
        }

    }

}

function showVerification() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
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
    document.querySelector("#verification").style.display = "block";
    document.querySelector("#reports").style.display = "none";
    document.querySelector("#SupportTicketDatail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";

    $("#load-container").show();
    $("#verificationList tbody").empty();

    $.ajax({
        url: API_URL + "/Admin/SPlist",
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
                                            messagetext.innerHTML = "Verification Successfull"
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
                            cancelButton.addEventListener('click', function () {
                                messagetext.innerHTML = "Please Wait..."
                                messagebox.style.display = "block"
                                $.ajax({
                                    url: API_URL + "/Admin/SPlist?id=" + datai.id,
                                    method: "DELETE",
                                    contentType: "application/json",
                                    success: function (res) {
                                        if (res.status == 200) {
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
    var customerCols;
    var spCols;
    var csmemberCols;
    var supportTicketCols;
    var paymentCols;



    $.ajax({
        url: API_URL + "/Report",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();
                customerCols = res.data[0];
                spCols = res.data[1];
                csmemberCols = res.data[2];
                supportTicketCols = res.data[3];
                paymentCols = res.data[4];



            }
            else {
                console.log("error");
            }
        }
    });

    var areabuttonArray = document.querySelectorAll(".reportArea .areaButtons div button");

    var selectedIndex = -1; // Initialize selectedIndex variable

    areabuttonArray.forEach(function (button, index) {

        button.addEventListener('click', function () {
            // Remove 'selected' class from all buttons
            areabuttonArray.forEach(function (btn) {
                btn.classList.remove('selected');
            });

            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            // Update selectedIndex with the index of the clicked button
            selectedIndex = index;
            console.log("Selected index: " + selectedIndex);

            var selectedCols;
            switch (selectedIndex) {
                case 0:
                    selectedCols = customerCols;
                    break;
                case 1:
                    selectedCols = spCols;
                    break;
                case 2:
                    selectedCols = spCols;
                    break;
                case 3:
                    selectedCols = csmemberCols;
                    break;
                case 4:
                    selectedCols = supportTicketCols;
                    break;
                case 5:
                    selectedCols = paymentCols;
                    break;
            }

            var columnsCB = document.querySelector(".columnsCB");
            var title = document.querySelector(".columnsCB h1");
            columnsCB.style.display = "block";
            columnsCB.innerHTML = ""; // Clear existing checkboxes
            columnsCB.appendChild(title);

            selectedCols.forEach(function (columnName) {
                var texttag = formatString(columnName);
                var checkboxDiv = document.createElement("div");
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "column";
                checkbox.value = columnName;
                var label = document.createElement("label");
                if (columnName == "f_name") {
                    label.textContent = "First Name";
                }
                else if (columnName == "l_name") {
                    label.textContent = "Last Name";
                }
                else {
                    label.textContent = texttag;
                }

                checkboxDiv.appendChild(checkbox);
                checkboxDiv.appendChild(label);
                columnsCB.appendChild(checkboxDiv);
            });
        });
    });

    document.querySelector('.ButtonsRow .preview').addEventListener('click', function () {

        var reportName = document.querySelector('#reports input[placeholder="Report Name"]').value;
        var checkedValues = [];

        // Loop through the checkboxes to get the checked values
        var checkboxes = document.querySelectorAll('.columnsCB input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                var labelText = checkbox.nextSibling.textContent.trim();
                checkedValues.push(labelText);
            }
        });
        console.log(checkedValues);

        // Construct the query parameter string
        var queryParams = '?checkedValues=' + encodeURIComponent(JSON.stringify(checkedValues)) +
            '&reportTitle=' + encodeURIComponent(reportName) +
            '&selectedAreaIndex=' + selectedIndex;

        // Open the preview.html file in a new window/tab with the query parameters
        window.open('invoice.html' + queryParams);
    });

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
}

function showProfile() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#verificationLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");
    document.querySelector("#ReportLink").classList.remove("active");

    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#csDropdown").classList.remove("dropDownActive");

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

}

// Dropdown side menu

let dropDownContainer = document.querySelector(".dropdown-container");
function toggleDropdown() {
    dropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}




// **************DashBoard-Recent moment bar chat*******************
var ctx = document.getElementById("barchatRecent").getContext('2d');
var xValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var yValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];
var rdata = Array.from({ length: 12 }, () => 0);
var ddata = Array.from({ length: 12 }, () => 0);

$("#load-container").show();

$.ajax({
    url: API_URL + "/Admin/customerCard",
    method: "GET",
    success: function (res) {
        if (res.status == 200) {
            $("#load-container").hide();

            // var currentDate = new Date();
            // var currentMonth = currentDate.getMonth();
            // console.log(currentMonth);
            // var currentYear = currentDate.getFullYear();
            // var monthsToShow = [];

            // Analytics Cards
            document.querySelector("#registeredCustomersNum").innerHTML = res.data[0].CustomerNum;
            document.querySelector("#registeredSproviders").innerHTML = res.data[0].sproviderNum;
            document.querySelector("#completedTasksCount").innerHTML = res.data[0].CompletedTaskCount;
            document.querySelector("#reportCount").innerHTML = res.data[0].SupportTicketCount;

            var tableBody = document.querySelector("#RecentReportSection tbody");

            // Recent 5 support cards table
            for (var i = 1; i < 6; i++) {
                var datai = res.data[i];
                var row = tableBody.insertRow();
                row.insertCell(0).textContent = datai.name || '';
                row.insertCell(1).textContent = datai.title || '';
                row.insertCell(2).textContent = datai.date || '';
                row.insertCell(3).textContent = datai.status.charAt(0).toUpperCase() + datai.status.slice(1) || '';
            }

            // Account Deletions and Registrations
            var registation = res.data[6];
            var deletions = res.data[7];

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


            // for (var i = 0; i < 5; i++) {
            //     var monthIndex = (currentMonth - i) % 12;

            //     if (monthIndex < 0) {
            //         monthIndex += 12;
            //         currentYear -= 1;
            //     }

            //     monthsToShow.unshift(`${xValues[monthIndex]} ${currentYear}`);
            // }


            // Create chart
            new Chart("barchatRecent", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: "Registations",
                        data: rdata,
                        backgroundColor: "#0095FF"
                    }, {
                        label: "Account Deletions",
                        data: ddata,
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
        } else {
            console.log("error");
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


