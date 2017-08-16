/*
url = "/search"
method = "POST"
postData = "hello"
*/
function apiReq(url, method, callback, postData) {
  let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let myJSONRemote = JSON.parse(this.responseText);
        callback(null,myJSONRemote);
      }else if (this.status ==500) {
        let myJSONRemote = JSON.parse(this.responseText);
        callback(myJSONRemote);
      }
    }
    xhttp.open(method, url, true);
    if (postData) {
      xhttp.send(postData);
    }else {
      xhttp.send();
    }
}
