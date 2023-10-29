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