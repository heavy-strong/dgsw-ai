// require server modules
const fs = require('fs')
const express = require('express')
const socket = require('socket.io')
const http = require('http')
// const https = require('https')
const ws = require("ws")

// rquire ai-makers-kit modules
const record = require('node-record-lpcm16');
const aikit = require('/home/pi/ai-makers-kit/nodejs/aimakerskitutil');
const Speaker = require('speaker');

// express
const app = express()
const httpServer = http.createServer(app)

// https server
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }
// let httpsServer = https.createServer(options, app)

// web sockets
let WebSocketServer = ws.Server
let wss = new WebSocketServer({ port: 3000 })

// 연결 이 수립되면 클라이언트에 메시지를 전송하고 클라이언트로부터의 메시지를 수신한다.
wss.on("connection", function (ws) {
    ws.send("안녕?");

    
//         //for playing pcm sound
//         const soundBuffer = fs.readFileSync('/home/pi/ai-makers-kit/data/sample_sound.wav');
//         const pcmplay = new Speaker({
//             channels: 1,
//             bitDepth: 16,
//             sampleRate: 16000
//         });

//         //node version check
//         const nodeVersion = process.version.split('.')[0];
//         let ktkws = null;
//         if (nodeVersion === 'v6') ktkws = require('/home/pi/ai-makers-kit/nodejs/ktkws');
//         else if (nodeVersion === 'v8') ktkws = require('/home/pi/ai-makers-kit/nodejs/ktkws_v8');

//         const client_id = '';
//         const client_key = '';
//         const client_secret = '';
//         const json_path = '/home/pi/Downloads/clientKey.json';
//         const cert_path = '/home/pi/ai-makers-kit/data/ca-bundle.pem';
//         const proto_path = '/home/pi/ai-makers-kit/data/gigagenieRPC.proto';
//         const kwstext = ['기가지니', '지니야', '친구야', '자기야'];
//         // const kwsflag=parseInt(process.argv[2]);
//         const kwsflag = 2;

//         let pcm = null;
//         function initMic() {
//             return record.start({
//                 sampleRateHertz: 16000,
//                 threshold: 0,
//                 verbose: false,
//                 recordProgram: 'arecord',
//             })
//         };
//         ktkws.initialize('/home/pi/ai-makers-kit/data/kwsmodel.pack');
//         ktkws.startKws(kwsflag);
//         let mic = initMic();

//         //aikit.initialize(client_id,client_key,client_secret,cert_path,proto_path);
//         aikit.initializeJson(json_path, cert_path, proto_path);

//         let mode = 0;//0:kws, 1:queryByVoice
//         let ktstt = null;
//         mic.on('data', (data) => {
//             if (mode === 0) { //1)
//                 result = ktkws.pushBuffer(data);
//                 if (result === 1) { //2)

//                     io.sockets.emit('update', { type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.2' })

//                     console.log("KWS Detected");
//                     pcmplay.write(soundBuffer);
//                     setTimeout(startQueryVoice, 1000); // 3)
//                 }
//             } else {
//                 ktstt.write({ audioContent: data }); //4)
//             }
//         });
//         console.log('say :' + kwstext[kwsflag]);

//         // 메시지 가져오기
//         function startQueryVoice() {
//             ktstt = aikit.queryByVoice((err, msg) => {

//                 if (err) { // 인식 오류
//                     console.log(JSON.stringify(err));
//                     mode = 0;
//                 } else { // 인식 성공                    
//                     console.log('Msg:' + JSON.stringify(msg));
//                     const action = msg.action[0];
//                     if (action) {
//                         const actType = action.actType;
//                         let mesg = action.mesg;
//                         console.log('actType:' + actType + ' mesg:' + mesg);
//                         //5)
//                         if (actType === '99' || actType === '601' || actType === '631' || actType === '607' || actType === '608' || actType === '606' || actType === '9999') {
//                             if (actType === '9999') {
//                                 let textProcess = action.serviceId.split('SystemMsg')[1].split(',')[0].substring(3);
//                                 mesg = textProcess.substring(0, textProcess.length - 1);
//                             }
//                             //6)
//                             let kttts = aikit.getText2VoiceStream({ text: mesg, lang: 0, mode: 0 });
//                             kttts.on('error', (error) => {
//                                 console.log('Error:' + error);
//                             });
//                             //7)
//                             kttts.on('data', (data) => {
//                                 if (data.streamingResponse === 'resOptions' && data.resOptions.resultCd === 200) console.log('Stream send. format:' + data.resOptions.format);
//                                 if (data.streamingResponse === 'audioContent') {
//                                     pcmplay.write(data.audioContent);
//                                 } else console.log('msg received:' + JSON.stringify(data));
//                             });
//                             kttts.on('end', () => {
//                                 console.log('pcm end');
//                                 mode = 0;//9)
//                             });
//                         } else mode = 0//9)
//                     } else mode = 0;//9)
//                 }
//             });
//             ktstt.write({ reqOptions: { lang: 0, userSession: '12345', deviceId: 'D06190914TP808IQKtzq' } });
//             mode = 1;//8)
//         };
//         // ai-makers end 

    ws.on("message", function (message) {
        console.log("클라이언트에서 받은 메시지: %s", message);
    })
});

// socket.io
// const io = socket(httpServer)
// io.sockets.on('connection', function (socket) {
//     console.log('유저 접속 됨')

//     socket.on('newUser', function (name) {
//         console.log(name + '님이 접속하였습니다.3')
//         socket.name = name
//         io.sockets.emit('update', { type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.2' })
//     })

//     socket.on('message', function (data) {
//         data.name = socket.name

//         console.log(data)

//         socket.broadcast.emit('update', data)
//     })

//     socket.on('send', function (data) {
//         console.log('전달된 메시지: ', data.msg)
//     })

//     socket.on('disconnect', function () {
//         console.log(socket.name + '님이 나가셨습니다.')

//         socket.broadcast.emit('update', { type: 'disconnnect' })
//     })
// })

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
app.use('/jquery', express.static('./node_modules/jquery/dist/'))

app.get('/', function (request, response) {
    console.log('유저가 / 으로 접속했습니다.')
    // response.send('Hello, Express Server!!')
    fs.readFile('./static/index.html', function (err, data) {
        if (err) {
            response.send('에러')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    })
})

// server start
httpServer.listen(8080, function () {
    console.log('HTTP SEVER START')
})

// httpsServer.listen(8443, function () {
//     console.log('HTTPS SEVER START')
// })