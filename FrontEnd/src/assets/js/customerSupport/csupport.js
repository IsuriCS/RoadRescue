var API_URL = "http://localhost:8082/RoadRescue";
// var API_URL = "http://localhost:8080/roadRescue";

var messagebox = document.querySelector("#messageBox");
var messageimg = document.querySelector("#messageBox #proccessing_boxes #icon img");
var messagetext = document.querySelector("#messageBox #proccessing_boxes #Text p");
var messagebutton = document.getElementById("proccessingBoxButtons");


// var customerId;
// var profile;

// Navigate
function showDashboard() {
    document.querySelector("#dashboardLink").classList.add("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    // document.querySelector('#ServiceRequestslink').classList.remove("active");
    // document.queryselector("#FAQLink").classList.remove("active");




    document.querySelector("#dashboard").style.display = "block";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";



//Dashborad Cards
$.ajax({
    url: API_URL +"/CS/DashboardCard?id=1",
    method:"GET",
    success : function (res){
        if (res.status == 200){
            $("#load-container").hide();

            var Analytics = res.data.analyticsData;
            var profile = res.data.profile;
            var customerId=profile.CSid;

            document.querySelector("#allTicketNum").innerHTML = Analytics[0].AllTicketCount;
            document.querySelector("#SolvedTicketNum").innerHTML = Analytics[0].SolvedTicketCount;
            document.querySelector("#PendingTicketNum").innerHTML = Analytics[0].PendingTicketCount;
            document.querySelector("#OnReviewTicketNum").innerHTML = Analytics[0].OnReviewTicketCount;
        }
    }

})


//Performance Cards
$.ajax({
    url: API_URL +"/CS/PerformanceCards",
    method:"GET",
    success : function (res){
        if (res.status == 200){
            $("#load-container").hide();

            var AnalyticsCards = res.data.analyticsPerformances;


            document.querySelector("#allPTicketNum").innerHTML = AnalyticsCards[0].AllTicketCounts;
            document.querySelector("#SolvedPTicketNum").innerHTML = AnalyticsCards[0].SolvedTicketCounts;
            document.querySelector("#PendingPTicketNum").innerHTML = AnalyticsCards[0].PendingTicketCounts;
            document.querySelector("#OnReviewPTicketNum").innerHTML = AnalyticsCards[0].OnReviewTicketCounts;
        }
    }

})




//Recent Reports
$.ajax({
    url: API_URL + "/CSMember/customerSupportDashboard",
    method: "GET",
    success: function (res) {

        $("#load-container").hide();
        if (res.status == 200) {

            var tableBody = document.querySelector("#RecentReportSection tbody");


            for (var i = 0; i < res.data.length; i++) {

                var datai = res.data[i];
                var row = tableBody.insertRow();
                row.insertCell(0).textContent = datai.CustomerID || '-';

                let TITLE;
                if(datai.title ==1){
                    TITLE = "Mechanical Issues";
                }else if(datai.title ==2){
                    TITLE = "Electrical Issues";
                }else if(datai.title == 3){
                    TITLE = "Engine Problems";
                }else if(datai.title == 4){
                    TITLE = "Fuel Issues";
                }else if(datai.title == 5){
                    TITLE = "Exhaust Issues";
                }else if(datai.title == 6){
                    TITLE = "Cooling Problems";
                }else{
                    TITLE = "Other";
                }
                row.insertCell(1).textContent = TITLE || '--';
                // var dateTime = new Date(datai.Rtimestamp);
                // var formattedDate = dateTime.toLocaleDateString();
                // row.insertCell(2).textContent = formattedDate || '_';
                row.insertCell(2).textContent = datai.Rtimestamp || '_';
                // var dateTime = new Date(datai.Atimestamp);
                // var formattedDate = dateTime.toLocaleDateString();
                // row.insertCell(3).textContent = formattedDate || '_';
               // row.insertCell(3).textContent = datai.Atimestamp || '_';
                let ST;
                if(datai.status==1){
                    ST="Pending.Not accepted by a garage";
                }else if(datai.status==2){
                    ST="Accepted by a garage";
                }else if(datai.status==3){
                    ST="Garage completed providing the service";
                }else if(datai.status==4){
                    ST="Payment done by customer";
                }else if(datai.status==5){
                    ST="Completed";
                }else if(datai.status==6){
                    ST="Canceled by the garage";
                }else if(datai.status==7){
                    ST="Canceled by the customer Support member";
                }else{
                    ST="Error";
                }

                row.insertCell(3).textContent = ST || '_';



            }



        }
        else {
            console.log("error");
        }

    }
});






}






function showcus() {
    $("#load-container").show();
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#customerDropdown").classList.add("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    // document.querySelector('#ServiceRequestslink').classList.remove("active");
    // document.queryselector("#FAQLink").classList.remove("active");
    // document.querySelector('#PaymentLink').classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "block";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";


    // $("#load-container").show();
    $("#CustomerList tbody").empty();

    $.ajax({
        url: API_URL + "/CSMember/CustomerList",
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
    // document.querySelector("#ticket").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.queryselector("#FAQ").style.display = "none";

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
                $("#load-container").show();
                // request ticket details from backend
                $.ajax({
                    
                    url: API_URL + "/customerSupport",
                    method: "GET",
                    success: function (res) {
                        $("#load-container").hide();
                        console.log(res);
                        if (res.status == 200) {


                            for (var i = 0; i < res.data.length; i++) {
                                (function () {
                                    var datai = res.data[i];
                                    var dateTime = new Date(datai.created_time);
                                        var formattedDate = dateTime.toLocaleDateString();
                                    if (datai.customerID == customerId || datai.status.toLowerCase() == "solved" || datai.status.toLowerCase() == "on review" && formattedDate >= "2024-04-01") {


                                        var temp = document.getElementById("supportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".SuppotTicketcard h1").textContent = `H-${String(datai.ticketId).padStart(3, '0')}`;
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
        $("#load-container").hide();
    }

}



function showsupportTicket(res, ticketId, name) {
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";
    

    


    // Update the title
    var ttitle = document.querySelector("#SupportTicketDetail .topRow h1");
    ttitle.innerHTML = `Complaints > H${String(ticketId).padStart(3, '0')}`;


    for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].ticketId == ticketId) {
            var datai = res.data[i];

            document.getElementById("ticketID").innerHTML = datai.ticketId;
            document.getElementById("CustomerSupportMemberID").innerHTML = datai.customer_support_member_id || '-';
            document.getElementById("customerID").innerHTML = datai.customerID || '-';
            document.getElementById("customerName").innerHTML = name || '-';
            document.getElementById("topic").innerHTML = datai.title || '-';
            document.getElementById("Description").innerHTML = datai.description || '-';
           // document.getElementById("phone_number").innerHTML = datai.PhoneNumber || '-';
            var dateTime = new Date(datai.created_time);
            var formattedDate = dateTime.toLocaleDateString();
            document.getElementById("Date").innerHTML = formattedDate || '-';

            var ticketStatus = datai.status;

            var asignbtn = document.getElementById("SolutionBtn");
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
            
        }
        $("#load-container").hide();
    }
}



function showServiceProviders() {
    $("#load-container").show();
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.add("dropDownActive");
    // document.querySelector('#ServiceRequestslink').classList.remove("active");
    // document.queryselector("#FAQLink").classList.remove("active");
    // document.querySelector('#PaymentLink').classList.remove("active");
    


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "block";
    document.querySelector("#GarageProf").style.display = "none";
    // document.querySelector("#ticket").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";




    var garage = document.getElementById("garages");
    var mp = document.getElementById("maintainancep");
    var tableBody = document.querySelector("#SPList tbody");
    // $("#load-container").show();
    $.ajax({
        url: API_URL + "/CSmember/CSSPList",
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
    $("#load-container").show();
    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "block";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";

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
            document.getElementById("location").setAttribute("style", "color: white;");

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
                $("#load-container").show();
                // request ticket details from backend
                $.ajax({
                    url: API_URL + "/SPSupportTicket",
                    method: "GET",
                    success: function (tres) {
                        $("#load-container").hide();
                        if (tres.status == 200) {


                            for (var i = 0; i < tres.data.length; i++) {
                                (function () {
                                    var sdatai = tres.data[i];
                                    if (sdatai.SPid == spid) {
                                        console.log("inside if");

                                        var temp = document.getElementById("spsupportTicketTemplate");
                                        var clone = temp.content.cloneNode(true);
                                        clone.querySelector(".spSuppotTicketcard h1").textContent = `H${String(sdatai.ticketId).padStart(3, '0')}`;
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
                                            showsupportTicket(tres, sdatai.ticketId, name,1);
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




function showTicket() {
    $("#load-container").show();
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.add("active");
    document.querySelector("#profileLink").classList.remove("active");
    // document.querySelector('#ServiceRequestslink').classList.remove("active");
    // document.queryselector("#FAQLink").classList.remove("active");
    // document.querySelector('#PaymentLink').classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#TicketReports").style.display = "block";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";
    // document.querySelector("#FAQ").style.display = "none";



    $("#TicketList tbody").empty();   
$.ajax({
    url: API_URL + "/CSMemberTicket/customerSupportTicketList",
    method: "GET",
    success: function (res) {
        
        $("#load-container").hide();
        if (res.status == 200) {

            var tableBody = document.querySelector("#TicketList tbody");

            
            for (var i = 0; i < res.data.length; i++) {

                var datai = res.data[i];
                if(datai.csmember_id=="1"){
                    var row = tableBody.insertRow();
                    row.insertCell(0).textContent = datai.ticketId || '-';
                    row.insertCell(1).textContent = datai.customer_id || '--';
                    // row.insertCell(2).textContent = datai.csmember_id || '--';
                    row.insertCell(2).textContent = datai.phone_number || '--';
                    row.insertCell(3).textContent = datai.title || '-';
                    var dateTime = new Date(datai.created_time);
                    var formattedDate = dateTime.toLocaleDateString();
                    row.insertCell(4).textContent = formattedDate || '_';
                    // row.insertCell(3).textContent = datai.created_time || '0';
                    row.insertCell(5).textContent = datai.status || '_';
                    
                    row.addEventListener('click', function () {
                        // const ticketID1 = datai.ticketID || '-';
                        
                        var ticketid = this.cells[0].textContent;
                        showsupportTicket(res, ticketid);

                    })
                };

                

            }



        }
        else {
            console.log("error");
        }
        
    }
});


 //Search ticket
 document.getElementById("searchCSTicket").addEventListener("input", function () {
    var searchValue = this.value.trim();
    // var searchValue = this.value.toUpperCase();
    var table = document.getElementById("TicketList");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            var textValue = td.textContent || td.innerText;
            if (textValue.includes(searchValue)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
);

}


function showServiceRequests() {
    $("#load-container").show();
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.remove("active");
    // document.querySelector('#ServiceRequestslink').classList.active("active");
    // document.querySelector("#FAQLink").classList.add("active");
    // document.querySelector('#PaymentLink').classList.add("active");

    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "none";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "block";
    // document.querySelector("Payment").style.display  = "block";
    // document.querySelector("#FAQ").style.display = "block";

// Service Requests

$("#serviceRequests tbody").empty();

        $.ajax({
            url: API_URL + "/CSMember/customerSupportServiceRequests",
            method: "GET",
            success: function (res) {

                $("#load-container").hide();
                if (res.status == 200) {

                    var tableBody = document.querySelector("#serviceRequests tbody");
                    //tableBody.empty();


                    for (var i = 0; i < res.data.length; i++) {

                        var datai = res.data[i];
                        var row = tableBody.insertRow();
                        row.insertCell(0).textContent = datai.RequestID || '-';
                        row.insertCell(1).textContent = datai.CustomerID || '-';
                        //row.insertCell(1).textContent = datai.location || '--';

                    //Add the button
                        var viewButtonCell = row.insertCell(2);
                        var viewButton = document.createElement("button");
                        viewButton.type = "button";
                        viewButton.className = "ServiceRequestLocation";
                        viewButton.textContent = "View Location";
                        var locationPoints = datai.location.match(/latitude=(-?\d+(\.\d+)?), longitude=(-?\d+(\.\d+)?)/);

                        row.setAttribute("request-id", datai.RequestID);
                        
                        if (locationPoints && locationPoints.length >= 5) {
                            var latitude = parseFloat(locationPoints[1]);
                            var longitude = parseFloat(locationPoints[3]);
                            var link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

                        viewButton.addEventListener("click", function() {
                        window.open(link, '_blank');
                            });
                        } else {
                    // Handle invalid location format
                        viewButton.disabled = true;
                        }

                        viewButtonCell.appendChild(viewButton);
            


                        let ISSUE;
                        if(datai.issue ==1){
                            ISSUE = "Mechanical Issues";
                        }else if(datai.issue ==2){
                            ISSUE = "Electrical Issues";
                        }else if(datai.issue == 3){
                            ISSUE = "Engine Problems";
                        }else if(datai.issue == 4){
                            ISSUE = "Fuel Issues";
                        }else if(datai.issue == 5){
                            ISSUE = "Exhaust Issues";
                        }else if(datai.issue == 6){
                            ISSUE = "Cooling Problems";
                        }else{
                            ISSUE = "Other";
                        }
                        row.insertCell(3).textContent = ISSUE || '-';

                        let ST;
                        if(datai.status==1){
                            ST="Pending.Not accepted by a garage";
                        }else if(datai.status==2){
                            ST="Accepted by a garage";
                        }else if(datai.status==3){
                            ST="Garage completed providing the service";
                        }else if(datai.status==4){
                            ST="Payment done by customer";
                        }else if(datai.status==5){
                            ST="Completed";
                        }else if(datai.status==6){
                            ST="Canceled by the garage";
                        }else if(datai.status==7){
                            ST="Canceled by the customer Support member";
                        }else{
                            ST="Error";
                        }
                        row.insertCell(4).textContent = ST || '_';

                        
                        //Add the button cancel
                        
                        var cancelButton = document.createElement("button");
                        cancelButton.type = "button";
                        cancelButton.className = "ServiceRequestCancel";
                        cancelButton.textContent = "Cancel";
                        var actionButtonCell = row.insertCell(5);
                        actionButtonCell.appendChild(cancelButton);
                    
                            cancelButton.addEventListener("click", function() {
                                cancelrequest(datai.RequestID, row);
                                //messagetext.innerHTML = "Please Wait..."
                            // messagebox.style.display = "block"
                            // messagebutton.style.display = "none";

                                
                            //    $("#load-container").hide();
                                $.ajax({
                                    
                                    url: API_URL + "/CSMember/customerSupportServiceRequests?RequestId=" +row.getAttribute("request-id"),
                                    method: "PUT",
                                    success: function (res) {

                                        if (res.status == 200) {
                                            //console.log(row.getAttribute("request-id"));
                                            messagebutton.style.display = "none";
                                            messagetext.innerHTML = "Cancelation Successfull..."
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
                                document.querySelector("#serviceRequests").innerHTML = '';
                                nodata.style.display = "block";
                            }
                        
                        (cancelButton, row, datai);
                    }

                }
                else {
                    console.log("error");
                }

            }
        });
$("#load-container").hide();
 }

function showProfile() {
    document.querySelector("#dashboardLink").classList.remove("active");
    document.querySelector("#UsersLink").classList.remove("active");
    document.querySelector("#customerDropdown").classList.remove("dropDownActive");
    document.querySelector("#servicePDropdown").classList.remove("dropDownActive");
    document.querySelector("#TicketLink").classList.remove("active");
    document.querySelector("#profileLink").classList.add("active");
    // document.querySelector('#ServiceRequestslink').classList.remove("active");


    document.querySelector("#dashboard").style.display = "none";
    document.querySelector("#userCus").style.display = "none";
    document.querySelector("#cusprof").style.display = "none";
    document.querySelector("#GarageProf").style.display = "none";
    document.querySelector("#csProfile").style.display = "block";
    document.querySelector("#serviceProviders").style.display = "none";
    document.querySelector("#SupportTicketDetail").style.display = "none";
    document.querySelector("#TicketReports").style.display = "none";
    document.querySelector("#ServiceRequests").style.display = "none";

  
    // $.ajax({
    //     url: API_URL +"/CS/DashboardCard?id=1",
    //     method:"GET",
    //     success : function (res){
    //         if(res.status == 200){
                
    //         document.querySelector("#fNameCustomerSupport").innerHTML = res.data.profile.fname;
    //         document.querySelector("#lNameCustomerSupport").innerHTML = res.data.profile.lname;
    //         document.querySelector("#contactNumberSP").innerHTML = res.data.profile.phone_number;
    //         // document.querySelector("#phone_number").innerHTML = res.data.profile.reg_timestamp;
    //         }
    //     }});




   

}







// Dropdown side menu

let dropDownContainer = document.querySelector(".dropdown-container");
function toggleDropdown() {
    dropDownContainer.classList.toggle("hide");
    document.querySelector(".dropdownArrow").classList.toggle("uparrow");
}

// // Link table rows
// const tableRows = document.querySelectorAll('tr[data-href]');
// tableRows.forEach(row => {
//     row.addEventListener('click', () => {
//         window.location.href = row.getAttribute('data-href');
//     });
// });






// const API_URL = "http://localhost:8082/roadRescueBackend";
// $.ajax({
//     url: API_URL + "/customerSupport",
//     method: "GET",
//     success: function (res) {
//         // res = $.parseJSON(res);
//         if (res.status == 200) {
//             try {
//                 res.data.forEach(customer => {
//                     document.querySelector("#customer_support_member_id").innerHTML = res.data[0].customer_support_member_id;
//                     document.querySelector("#description").innerHTML = res.data[0].description;
//                     document.querySelector("#title").innerHTML = res.data[0].title;
//                     document.querySelector("#created_time").innerHTML = res.data[0].created_time;
//                 });

//             } catch {
//                 console.log("error");
//             }


//         }
//     }
// });



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

// $("#custSolutionSolveBtn").click(function () {
//     var solutionId = $("#solicitationTicketId").text()
//     var date = $("#solicitationTicketDate").val()
//     var assignCustomerSupport = $("#solicitationTicketAssingCustId").val()
//     var ticketOwnerId = $("#ticketOwnerId").val()
//     var ticketOwner = $("#ticketOwner").val()
//     var supportDesc = $("#supportDesc").val()
//     var custSolution = $("#custSolution").val()

//     console.log(solutionId)
//     console.log(custSolution)


//     $.ajax({
//         url: API_URL + `/CSMemberTicket/customerSupportTicketList?ticketId=${solutionId}&solution=` + custSolution,
//         method: "PUT",
//         contentType: "application/json",
//         success: function (res) {
//             if (res.status === 200) {
//                 alert(res.message);
//             } else {
//                 alert(res.data);
//             }
//         }, error: function (ob, textStatus, error) {
//             alert(textStatus);
//         }
//     });
// });

$("#SolutionBtn").click(function () {
    var solutionId = $("#ticketID").text()
    var date = $("#Date").val()
   // var assignCustomerSupport = $("#solicitationTicketAssingCustId").val()
    var ticketOwnerId = $("#customerID").val()
    var ticketOwner = $("#customerName").val()
    var supportDesc = $("#Description").val()
    var custSolution = $("#response").val()

    console.log(String(solutionId))
    console.log(custSolution)
    if (custSolution == "") {
        alert("Please enter a solution");
        return;
    }else{
        $.ajax({
            url: API_URL + `/customerSupport?ticketID=`+solutionId+`&solution=` + custSolution,
            method: "PUT",
            contentType: "application/json",
            success: function (res) {
                if (res.status === 200) {
                    $("#SolutionBtn").prop("disabled", true);
                    $("#SolutionBtn").css("background-color" ,"lightblue");
                    $("#SolutionBtn").text("Solved");
                    alert(res.message);

                } else {
                    alert(res.data);
                }
            }, error: function (ob, textStatus, error) {
                alert(textStatus);
            }
        });
    }
});