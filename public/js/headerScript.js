console.log("ale");
var button = document.getElementById("enterButton");
if (button == null){
    console.log("tebe pizda");
}
    button.onclick = function () {
        document.getElementById("postform").submit();
       // if (formee == null) console.log ("tebe pizda");
        //form.submit("formee");
        console.log('hi');
        return false;
};