function loadDocument(e,t,o,n){var s=new XMLHttpRequest;s.onreadystatechange=function(){4==s.readyState&&200==s.status?(console.log("Response received: "+s.responseText),n(!0,s.responseText)):200!=s.status?console.log("State changed: "+s.status):200!=s.status&&""!=s.status&&4==s.readyState&&n(!1,null,xhhtp.status)},s.open("POST",encodeURI(e+o)),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.setRequestHeader("X-CSRFToken",getCookie("csrftoken"));var a="";if(null!==t)for(var r=0;r<t.length;r++)console.log("Created header: "+t[r].name+" => "+t[r].value),a=a+"&"+t[r].name+"="+t[r].value;o||(o=""),s.send(a),console.log("Sent data to: "+e+o),console.log("Headers: "+a)}function setCookie(e,t,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var s="expires="+n.toUTCString();document.cookie=e+"="+t+";"+s+";path=/"}function getCookie(e){for(var t=e+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var s=o[n];" "==s.charAt(0);)s=s.substring(1);if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""}