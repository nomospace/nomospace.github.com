function findIp() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
  else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open("GET", "http://api.hostip.info/get_html.php", false);
  xhr.send();

  var hostIpInfo = xhr.responseText.split("\n"),
    ipAddress,
    result = false;
  for (var i = 0; hostIpInfo.length >= i; i++) {
    if (hostIpInfo[i]) {
      ipAddress = hostIpInfo[i].split(":");
      if (ipAddress[0] == "IP") {
        result = ipAddress[1];
      }
    }
  }

  return result;
}
findIp();

function findIp2() {
  $.getJSON("http://smart-ip.net/geoip-json?callback=?",
    function(data) {
      console.log(data.host);
    });
}
findIp2();
