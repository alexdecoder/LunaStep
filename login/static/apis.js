function loadDocument(url, headers, trail, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('Response received: ' + xhttp.responseText);
        callback(!0, xhttp.responseText)
      } else if (xhttp.status != 200) {
        console.log('State changed: ' + xhttp.status)
      } else if (xhttp.status != 200 && xhttp.status != '' && xhttp.readyState == 4) {
        callback(!1, null, xhhtp.status)
      }
    };
    xhttp.open('POST', encodeURI(url + trail));
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
    var payload = '';
    if (headers !== null) {
      for (var i = 0; i < headers.length; i++) {
        console.log('Created header: ' + headers[i].name + ' => ' + headers[i].value);
        payload = (payload + '&' + headers[i].name + '=' + headers[i].value)
      }
    }
    if (!trail) {
      trail = ''
    }
    xhttp.send(payload);
    console.log('Sent data to: ' + url + trail);
    console.log('Headers: ' + payload)
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }
  function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  