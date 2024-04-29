const API_URL = "http://localhost:8080/roadRescue";




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

function issueReport() {
    document.querySelector(".graph").innerHTML = `<canvas id="barchatRecent"></canvas>`
    $.ajax({
        url: API_URL + "/Report",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();
                var demand = res.data.Demand;
                var Issue = res.data.Issue;



                const currentMonthDataissue = Issue.filter(
                    (item) => item.year === "2024" && item.month === "4"
                );
                // document.querySelector(".reportserviceRequests #experticeyear").value = "2024";
                // document.querySelector(".reportserviceRequests #experticeMonth").value = "4";
                // Extracting expertise areas and counts
                const issueLabels = currentMonthDataissue.map((item) => item.issue);
                const issuecount = currentMonthDataissue.map((item) => parseInt(item.count));
                var barColors = ["#54bebe", "#76c8c8", "#badbdb", "#dedad2", "#df979e", "#d7658b", "#c80064"]
                // console.log(countData);
                // Creating a pie chart
                const ctx1 = document.getElementById("barchatRecent").getContext("2d");
                const pieChartissue = new Chart(ctx1, {
                    type: "pie",
                    data: {
                        labels: issueLabels,
                        datasets: [
                            {
                                data: issuecount,
                                backgroundColor: barColors,
                                borderWidth: 0,

                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,

                        plugins: {
                            legend: {

                                position: 'right',
                                labels: {
                                    color: "white"
                                }
                            }
                        },
                    },
                });


            }

        }
    });
}
function ServiceRequestReport() {
    $.ajax({
        url: API_URL + "/Report",
        method: "GET",
        success: function (res) {

            if (res.status == 200) {
                $("#load-container").hide();
                var demand = res.data.Demand;
                var Issue = res.data.Issue;


                // Expertice Area
                const currentMonthData = demand.filter(
                    (item) => item.year === "2024" && item.month === "4"
                );
                // document.querySelector(".reportserviceRequests #experticeyear").value = "2024";
                // document.querySelector(".reportserviceRequests #experticeMonth").value = "4";
                // Extracting expertise areas and counts
                const expertiseLabels = currentMonthData.map((item) => item.expertise);
                const countData = currentMonthData.map((item) => parseInt(item.count));
                var barColors = ["#54bebe", "#76c8c8", "#badbdb", "#dedad2", "#df979e", "#d7658b", "#c80064"]
                console.log(countData);
                // Creating a pie chart
                document.querySelector(".graph").innerHTML = `<canvas id="barchatRecent"></canvas>`
                new Chart("barchatRecent", {
                    type: "pie",
                    data: {
                        labels: expertiseLabels,
                        datasets: [
                            {
                                data: countData,
                                backgroundColor: barColors,
                                borderWidth: 0,

                            },
                        ],
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,

                        plugins: {
                            legend: {

                                position: 'right',
                                labels: {
                                    color: "white"
                                }
                            }
                        },
                    },
                });
            }
        }
    });
}
function DownloadPDF() {
    const element = document.getElementById('Reportcontent');

    // Generate PDF from HTML content
    html2pdf(element, {
        filename: 'invoice.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        margin: 0.5
    });
}

var queryParams = getQueryParams();
var option = queryParams['option'];
// var reportTitle = queryParams['reportTitle'];
// var checkedValues = JSON.parse(queryParams['checkedValues']);
// var selectedAreaIndex = parseInt(queryParams['selectedAreaIndex']);

// document.querySelector("header h1").innerHTML = reportTitle || "Report";
// switch (selectedAreaIndex) {
//     case 0:
//         $.ajax({
//             url: API_URL + "/Admin/CustomerList",
//             method: "GET",
//             success: function (res) {
//                 if (res.status == 200) {
//                     $("#load-container").hide();


//                     var filteredData = res.data.map(function (rowData) {
//                         var filteredRow = {};
//                         checkedValues.forEach(function (value) {
//                             switch (value) {
//                                 case "Id":
//                                     filteredRow[value] = rowData.customerId || '-';
//                                     break;
//                                 case "Phone Number":
//                                     filteredRow[value] = rowData.contact || '-';
//                                     break;
//                                 case "Email":
//                                     filteredRow[value] = rowData.email || '-';
//                                     break;
//                                 case "First Name":
//                                     filteredRow[value] = rowData.fname || '-';
//                                     break;
//                                 case "Last Name":
//                                     filteredRow[value] = rowData.lname || '-';
//                                     break;
//                                 case "Reg Timestamp":
//                                     filteredRow[value] = rowData.Time || '-';
//                                     break;

//                             }

//                             var i = rowData[value]

//                         });
//                         return filteredRow;
//                     });



//                     var table = document.createElement("table");
//                     var thead = table.createTHead();
//                     var tbody = table.createTBody();
//                     var row = thead.insertRow();


//                     checkedValues.forEach(function (value) {
//                         var th = document.createElement("th");
//                         th.textContent = value;
//                         row.appendChild(th);
//                     });


//                     filteredData.forEach(function (rowData) {
//                         var row = tbody.insertRow();
//                         checkedValues.forEach(function (value) {
//                             var cell = row.insertCell();
//                             cell.textContent = rowData[value] || '';
//                         });
//                     });


//                     document.body.appendChild(table);
//                 }
//                 else {
//                     console.log("error");
//                 }
//             }
//         });
//         break;
//     case 1:
//         $("#load-container").show();
//         $.ajax({
//             url: API_URL + "/Admin/SPlist",
//             method: "GET",
//             success: function (res) {
//                 if (res.status == 200) {
//                     $("#load-container").hide();

//                     var filteredData = res.data.map(function (rowData) {
//                         if (rowData.type == "Garage") {
//                             var filteredRow = {};
//                             checkedValues.forEach(function (value) {
//                                 switch (value) {
//                                     case "Id":
//                                         filteredRow[value] = rowData.id || '-';
//                                         break;
//                                     case "Phone Number":
//                                         filteredRow[value] = rowData.phoneNumber || '-';
//                                         break;
//                                     case "Email":
//                                         filteredRow[value] = rowData.email || '-';
//                                         break;
//                                     case "Garage Name":
//                                         filteredRow[value] = rowData.garageName || '-';
//                                         break;
//                                     case "Status":
//                                         filteredRow[value] = rowData.status || '-';
//                                         break;
//                                     case "Reg Timestamp":
//                                         filteredRow[value] = rowData.Date || '-';
//                                         break;
//                                     case "Avg Rating":
//                                         filteredRow[value] = rowData.avg_rating || '-';
//                                         break;
//                                     case "Type":
//                                         filteredRow[value] = "Garage";
//                                         break;
//                                     case "Profile Pic Ref":
//                                         filteredRow[value] = rowData.profile_pic_ref || '-';
//                                         break;
//                                     case "Verified":
//                                         filteredRow[value] = rowData.verified || '-';
//                                         break;
//                                     case "Location":
//                                         filteredRow[value] = rowData.location || '-';
//                                         break;
//                                     case "Owner Name":
//                                         filteredRow[value] = rowData.owner_name || '-';
//                                         break;
//                                 }
//                             });
//                             return filteredRow;
//                         }
//                     }).filter(Boolean);

//                     var table = document.createElement("table");
//                     var thead = table.createTHead();
//                     var tbody = table.createTBody();
//                     var row = thead.insertRow();

//                     checkedValues.forEach(function (value) {
//                         var th = document.createElement("th");
//                         th.textContent = value;
//                         row.appendChild(th);
//                     });

//                     filteredData.forEach(function (rowData) {
//                         var row = tbody.insertRow();
//                         checkedValues.forEach(function (value) {
//                             var cell = row.insertCell();
//                             cell.textContent = rowData[value] || '';
//                         });
//                     });

//                     document.body.appendChild(table);
//                 } else {
//                     console.log("error");
//                 }
//             }
//         });

// }
console.log(option)

if (option == 'PreviewIssueReport') {
    issueReport();

}
else if (option == 'DownloadIssueReport') {
    window.addEventListener("load", function () {
        issueReport();
        setTimeout(function () {
            DownloadPDF();
        }, 3000);


    });
}
else if (option == 'previewserviceRequestsReport') {
    ServiceRequestReport();
}
else if (option == 'downloadserviceRequestsReport') {
    window.addEventListener("load", function () {
        ServiceRequestReport();
        setTimeout(function () {
            DownloadPDF();
        }, 3000);


    });
}
// var ctx1 = document.getElementById("barchatRecent").getContext('2d');
// new Chart("barchatRecent", {
//     type: "bar",
//     data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//         datasets: [{
//             label: "Registations",
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: "#0095FF"
//         }, {
//             label: "Account Deletions",
//             data: [28, 48, 40, 19, 86, 27, 90],
//             backgroundColor: "#00E096"
//         }]
//     },
//     options: {
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

document.addEventListener("DOMContentLoaded", function () {
    var bodyHeight = document.body.offsetHeight;
    var bodyHeightInCm = bodyHeight / 37.7952756; // converting pixels to cm (1 pixel = 0.026458333 cm)

    if (bodyHeightInCm < 29.7) {
        document.body.style.height = "27.9cm";
        document.getElementById("footer").style.position = "absolute";
    }
});