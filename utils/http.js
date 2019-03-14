function sendAjax() {
    const url = 'http://127.0.0.1:3000/json';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Authorization', 'value');
    xhr.send();
    xhr.onerror = function(e) {
        console.log('请求出错了');
        console.log(e);
    };
}

module.exports = {
    sendAjax
}