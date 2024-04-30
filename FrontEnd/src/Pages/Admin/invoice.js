const API_URL = "http://localhost:8080/roadRescue";
// document.querySelector('#button').addEventListener('click', function () {
//     const element = document.getElementById('content');

//     // Generate PDF from HTML content
//     html2pdf(element, {
//         filename: 'invoice.pdf',
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//         margin: 0.5
//     });
// });



function getQueryParams() {
    var queryParams = {};
    var queryString = window.location.search.substring(1);
    var pairs = queryString.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        queryParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return queryParams;
}

var queryParams = getQueryParams();
var reportTitle = queryParams['reportTitle'];
var checkedValues = JSON.parse(queryParams['checkedValues']);
var selectedAreaIndex = parseInt(queryParams['selectedAreaIndex']);

document.querySelector("header h1").innerHTML = reportTitle || "Report";
switch (selectedAreaIndex) {
    case 0:
        $.ajax({
            url: API_URL + "/Admin/CustomerList",
            method: "GET",
            success: function (res) {
                if (res.status == 200) {
                    $("#load-container").hide();


                    var filteredData = res.data.map(function (rowData) {
                        var filteredRow = {};
                        checkedValues.forEach(function (value) {
                            switch (value) {
                                case "Id":
                                    filteredRow[value] = rowData.customerId || '-';
                                    break;
                                case "Phone Number":
                                    filteredRow[value] = rowData.contact || '-';
                                    break;
                                case "Email":
                                    filteredRow[value] = rowData.email || '-';
                                    break;
                                case "First Name":
                                    filteredRow[value] = rowData.fname || '-';
                                    break;
                                case "Last Name":
                                    filteredRow[value] = rowData.lname || '-';
                                    break;
                                case "Reg Timestamp":
                                    filteredRow[value] = rowData.Time || '-';
                                    break;

                            }

                            var i = rowData[value]

                        });
                        return filteredRow;
                    });



                    var table = document.createElement("table");
                    var thead = table.createTHead();
                    var tbody = table.createTBody();
                    var row = thead.insertRow();


                    checkedValues.forEach(function (value) {
                        var th = document.createElement("th");
                        th.textContent = value;
                        row.appendChild(th);
                    });


                    filteredData.forEach(function (rowData) {
                        var row = tbody.insertRow();
                        checkedValues.forEach(function (value) {
                            var cell = row.insertCell();
                            cell.textContent = rowData[value] || '';
                        });
                    });


                    document.body.appendChild(table);
                }
                else {
                    console.log("error");
                }
            }
        });
        break;
    case 1:
        $("#load-container").show();
        $.ajax({
            url: API_URL + "/Admin/SPlist",
            method: "GET",
            success: function (res) {
                if (res.status == 200) {
                    $("#load-container").hide();

                    var filteredData = res.data.map(function (rowData) {
                        if (rowData.type == "Garage") {
                            var filteredRow = {};
                            checkedValues.forEach(function (value) {
                                switch (value) {
                                    case "Id":
                                        filteredRow[value] = rowData.id || '-';
                                        break;
                                    case "Phone Number":
                                        filteredRow[value] = rowData.phoneNumber || '-';
                                        break;
                                    case "Email":
                                        filteredRow[value] = rowData.email || '-';
                                        break;
                                    case "Garage Name":
                                        filteredRow[value] = rowData.garageName || '-';
                                        break;
                                    case "Status":
                                        filteredRow[value] = rowData.status || '-';
                                        break;
                                    case "Reg Timestamp":
                                        filteredRow[value] = rowData.Date || '-';
                                        break;
                                    case "Avg Rating":
                                        filteredRow[value] = rowData.avg_rating || '-';
                                        break;
                                    case "Type":
                                        filteredRow[value] = "Garage";
                                        break;
                                    case "Profile Pic Ref":
                                        filteredRow[value] = rowData.profile_pic_ref || '-';
                                        break;
                                    case "Verified":
                                        filteredRow[value] = rowData.verified || '-';
                                        break;
                                    case "Location":
                                        filteredRow[value] = rowData.location || '-';
                                        break;
                                    case "Owner Name":
                                        filteredRow[value] = rowData.owner_name || '-';
                                        break;
                                }
                            });
                            return filteredRow;
                        }
                    }).filter(Boolean);

                    var table = document.createElement("table");
                    var thead = table.createTHead();
                    var tbody = table.createTBody();
                    var row = thead.insertRow();

                    checkedValues.forEach(function (value) {
                        var th = document.createElement("th");
                        th.textContent = value;
                        row.appendChild(th);
                    });

                    filteredData.forEach(function (rowData) {
                        var row = tbody.insertRow();
                        checkedValues.forEach(function (value) {
                            var cell = row.insertCell();
                            cell.textContent = rowData[value] || '';
                        });
                    });

                    document.body.appendChild(table);
                } else {
                    console.log("error");
                }
            }
        });

}