
document.getElementById('joinBtn').onclick=function(){
let room=document.getElementById('roomName').value;
if(room){document.getElementById('room-select').style.display='none';
document.getElementById('chat-area').style.display='block';
document.getElementById('currentRoom').innerText='Oda: '+room;
document.getElementById('users').innerHTML='<p>🎙️ Sen odadasın</p>';}
document.getElementById('leaveBtn').onclick=function(){
document.getElementById('room-select').style.display='block';
document.getElementById('chat-area').style.display='none';}
