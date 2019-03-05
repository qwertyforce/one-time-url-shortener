 if(localStorage['domain']!==undefined){
        chrome.browserAction.setPopup({popup: "shortener.html"});
        window.location.href="shortener.html";
      }