document.getElementById('joinBtn').onclick = function() {
    let room = document.getElementById('roomName').value;
    if(room === "") { alert("Oda adı gir!"); return; }
    document.getElementById('room-select').style.display = 'none';
    document.getElementById('chat-area').style.display = 'block';
    document.getElementById('currentRoom').innerText = "Oda: " + room;
}

document.getElementById('leaveBtn').onclick = function() {
    document.getElementById('room-select').style.display = 'block';
    document.getElementById('chat-area').style.display = 'none';
}

document.getElementById('micBtn').onclick = function() {
    alert("Mikrofon açıldı! Şuanlık deneme modu :)");
}
