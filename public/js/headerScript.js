function myScript() {
    var button = document.getElementById("enterButton");
    console.log("ale");
    if (user) {
        button.onclick = function () {
            document.getElementById("postform");
            console.log('hi');
            return false;
        };
    }
}