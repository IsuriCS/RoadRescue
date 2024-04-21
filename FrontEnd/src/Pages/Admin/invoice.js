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

document.querySelector("header h1").innerHTML = reportTitle;
switch (selectedAreaIndex) {
    case 0:
        $.ajax({
            url: API_URL + "/Admin/CustomerList",
            method: "GET",
            success: function (res) {
                if (res.status == 200) {
                    $("#load-container").hide();
                    // console.log(res)
                    var filteredData = res.data.map(function (rowData) {
                        var filteredRow = {};
                        checkedValues.forEach(function (value) {
                            // filteredRow[value] = rowData[value] || '';
                            var i = rowData[value]
                            console.log(value)
                        });
                        return filteredRow;
                    });
                    console.log(filteredData)

                    // Create the table
                    var table = document.createElement("table");
                    var thead = table.createTHead();
                    var tbody = table.createTBody();
                    var row = thead.insertRow();

                    // Add headers for checked values
                    checkedValues.forEach(function (value) {
                        var th = document.createElement("th");
                        th.textContent = value;
                        row.appendChild(th);
                    });

                    // Insert rows with filtered data
                    filteredData.forEach(function (rowData) {
                        var row = tbody.insertRow();
                        checkedValues.forEach(function (value) {
                            var cell = row.insertCell();
                            cell.textContent = rowData[value] || '';
                        });
                    });

                    // Append the table to the document
                    document.body.appendChild(table);
                }
                else {
                    console.log("error");
                }
            }
        });
        break;
}