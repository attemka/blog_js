    var button = document.getElementById("enterButton");
    console.log("ale");
    if (user) {
        button.onclick = function () {
            document.getElementById("postform").submit();
            console.log('hi');
            return false;
        };
};