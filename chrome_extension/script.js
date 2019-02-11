        var checkbox=document.getElementById("myChk")
        var input_element=document.getElementById('input_text')
input_element.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        send_link()
    }
});
document.getElementById('send_button').addEventListener("click", send_link);
      var domain= localStorage['domain'];
      var regex2 = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9\wа-я]+([\-\.]{1}[a-z0-9\wа-я]+)*\.[a-z\wа-я]{2,5}(:[0-9]{1,5})?(\/.*)?$/im)
     
      var element = document.getElementById("text");
      function send_link(){
      var destroy_after=document.getElementById('destroy_after').value
      var error_before=document.getElementById('error_before').value
      let string =input_element.value.trim();
      if(!(regex2.test(string))){
        input_element.value = "Wrong link";
          return
      }
var xhr = new XMLHttpRequest();
xhr.open("POST", `${domain}/link`, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      input_element.value = `${domain}/${this.responseText}`;
      input_element.select()
    }
}
xhr.send(`url=${string}&preview_protection=${checkbox.checked}&destroy_after=${destroy_after}&error_before=${error_before}`); 
      }