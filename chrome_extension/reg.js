        var button=document.getElementById("send_reg")
         var input_element=document.getElementById('input_text_reg')
input_element.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        save_link()
    }
});    
button.addEventListener("click", save_link);
      var regex2 = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9\wа-я]+([\-\.]{1}[a-z0-9\wа-я]+)*\.[a-z\wа-я]{2,5}(:[0-9]{1,5})?(\/.*)?$/im)
      var element = document.getElementById("text");
      function save_link(){
      var string =input_element.value.trim();
      if(string===''){
        string="https://link.qwertyforce.ru"
      }
      if(!(regex2.test(string))){
        alert('Wrong url');
        return;
        }
        localStorage['domain'] = string;
        chrome.browserAction.setPopup({popup: "shortener.html"});
        window.location.href="shortener.html";
      }
    