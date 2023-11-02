loadTechnician();

function loadTechnician(){

}


const toggleProfileMenu = () => {
    var loader = document.getElementById("profileMenu");
    loader.classList.toggle("hide");
};

const toggleNotificationMenu = () => {
    var loader = document.getElementById("helpMenu");
    loader.classList.toggle("hide");
};


$(".open").click(function () {
    $(".open").css("background-color","#23A6F0");
    $(".close").css("background-color","#9295A1");
})

$(".close").click(function () {
    $(".open").css("background-color","#9295A1");
    $(".close").css("background-color","#23A6F0");
})



const availability = () => {
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    button1.addEventListener('click', () => {
        button1.classList.remove('activetog');
        button2.classList.add('activetog');
    });

    button2.addEventListener('click', () => {
        button2.classList.remove('activetog');
        button1.classList.add('activetog');
    });
};