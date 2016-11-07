console.log("ale");
var button = document.getElementById("enterButton");
if (button == null){
    console.log("tebe pizda");
}
    button.onclick = function () {
        document.getElementById("postform").submit();
        console.log('hi');
        return false;
};