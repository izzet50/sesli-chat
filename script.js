<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sesli Chat Odaları</title>
<script src="https://download.agora.io/sdk/release/AgoraRTC_N-4.22.2.js"></script>
<style>
body{background:#111;color:#fff;font-family:sans-serif;text-align:center;padding-top:100px}
#room-select, #chat-area{background:#222;padding:30px;border-radius:15px;width:90%;max-width:400px;margin:auto}
input{padding:10px;width:60%;border:none;border-radius:8px;margin-right:5px}
button{padding:10px 15px;border:none;border-radius:8px;background:#4a5bff;color:#fff;cursor:pointer}
#chat-area{display:none}
</style>
</head>
<body>

<div id="room-select">
  <h1>🎤 Sesli Chat Odaları</h1>
  <input id="roomName" placeholder="Oda adı">
  <button id="joinBtn">Odaya Katıl</button>
</div>

<div id="chat-area">
  <h2>Oda: <span id="currentRoom"></span></h2>
  <button id="micBtn">🎤 Konuş</button>
  <button id="leaveBtn">Odadan Çık</button>
</div>

<script>
const APP_ID = "d18d81032de64e9ca0808f97b32c3583";
let client = null;
let localAudioTrack = null;
let currentRoom = null;

document.getElementById('joinBtn').onclick = async () => {
    const roomName = document.getElementById('roomName').value;
    if(!roomName) return alert("Oda adı gir");
    client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});
    await client.join(APP_ID, roomName, null, null);
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([localAudioTrack]);
    document.getElementById('room-select').style.display = "none";
    document.getElementById('chat-area').style.display = "block";
    document.getElementById('currentRoom').innerText = roomName;
    currentRoom = roomName;
}

document.getElementById('leaveBtn').onclick = async () => {
    if(localAudioTrack) localAudioTrack.close();
    if(client) await client.leave();
    document.getElementById('room-select').style.display = "block";
    document.getElementById('chat-area').style.display = "none";
}

document.getElementById('micBtn').onclick = () => {
    if(localAudioTrack) {
        localAudioTrack.setEnabled(!localAudioTrack.enabled);
        document.getElementById('micBtn').innerText = localAudioTrack.enabled? "🎤 Konuş" : "🔇 Kapalı";
    }
}
</script>
</body>
</html>
