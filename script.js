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
