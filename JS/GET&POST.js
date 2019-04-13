//1. 获得XMLHttpRequest对象

function createXMLHttpRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType)
            xmlHttp.overrideMimeType('text/xml');
    } else if (window.ActiveXObject) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    return xmlHttp;
}

//2. 发送get请求
xmlHttp = createXMLHttpRequest();
var url = "getfiledetail.jsp?fileid=" + id;
xmlHttp.open("GET", url, true); // 异步处理返回 
xmlHttp.onreadystatechange = callback;
xmlHttp.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded;");
xmlHttp.send();


//3. 发送post请求

var url = "getNginxStatus";
xmlHttp.open("POST", url, true);
xmlHttp.onreadystatechange = getStatusBack;
xmlHttp.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded;");
xmlHttp.send(xml);