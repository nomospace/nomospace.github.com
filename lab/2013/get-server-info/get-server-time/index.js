function getServerTime() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
  else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function() {
    var serverDate, serverTime;
    if (xhr.readyState == 4) {
      serverDate = new Date(xhr.getResponseHeader('Date'));
      serverTime = Math.floor(serverDate.getTime() / 1000);
      console.log(serverDate, serverTime);
    }
  };

  xhr.open("HEAD", "/?");
  xhr.send(null);
}

getServerTime();
