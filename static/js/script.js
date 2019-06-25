$(function () {
    console.log('jQuery')
})

// 웹소켓 전역 객체 생성
let ws = new WebSocket("ws://dgsw.ai:3000")
// 연결이 수립되면 서버에 메시지를 전송한다
ws.onopen = function (event) {
    ws.send("안녕? 서버야");
}

// 서버로 부터 메시지를 수신한다
ws.onmessage = function (event) {
    console.log("서버에서 받은 메시지: ", event.data);
}

// error event handler
ws.onerror = function (event) {
    console.log("서버에서 받은 에러 메시지: ", event.data);
}

// let socket = io()

// socket.on('connect', function () {
//     var name = prompt('반갑습니다!', '')

//     if (!name) {
//         name = '익명'
//     }

//     socket.emit('newUser', name)

//     let input = document.getElementById('test')
//     input.value = '접속 됨'
// })

// socket.on('update', function (data) {
//     console.log(`${data.name}: ${data.message}`)
// })

// function send() {
//     let message = document.getElementById('test').value

//     document.getElementById('test').value = ''

//     // socket.emit('send', {msg: message})
//     socket.emit('message', { type: 'message', message: message })
// }