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