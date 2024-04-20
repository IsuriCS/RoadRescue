



// document.querySelector('#button').addEventListener('click', function () {
//     html2canvas(document.querySelector('#content')).then((canvas) => {
//         let base64image = canvas.toDataURL('image/png');

//         // Create a new jsPDF instance with A4 dimensions
//         let pdf = new jsPDF('p', 'mm', 'a4');

//         // Add the image of the HTML content to the PDF
//         pdf.addImage(base64image, 'PNG', 0, 0, 205, 297);

//         // Save the PDF
//         pdf.save('invoice.pdf');
//     });
// });
document.querySelector('#button').addEventListener('click', function () {
    const element = document.getElementById('content');

    // Generate PDF from HTML content
    html2pdf(element, {
        filename: 'invoice.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        margin: 0.5 // Adjust the margin as per your requirement
    });
});