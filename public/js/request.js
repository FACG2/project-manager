/*
url = "/search"
method = "POST"
postData = "hello"
*/
function apiReq(url, method, callback, postData) {
  var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myJSONRemote = JSON.parse(this.responseText);
          callback(myJSONRemote);
      }
    }
      xhttp.open(method, url, true);
      if (data) {
        xhttp.send(postData);
      }else {
        xhttp.send();
      }
}
