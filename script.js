const APP_ID = "d18d81032de64e9ca0808f97b32c3583";
let client;
let localAudioTrack;
let joined = false;

const joinBtn = document.getElementById("joinBtn");
const leaveBtn = document.getElementById("leaveBtn");
const micBtn = document.getElementById("micBtn");
const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("roomId");
const status = document.getElementById("status");
const speakers = document.getElementById("speakers");

async function join() {
    const channel = roomInput.value || "test-oda";
    const uid = usernameInput.value || "Misafir" + Math.floor(Math.random()*1000);

    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    await client.join(APP_ID, channel, null, uid);
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([localAudioTrack]);

    client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
            user.audioTrack.play();
            addSpeaker(user.uid);
        }
    });
    client.on("user-unpublished", (user) => {
        removeSpeaker(user.uid);
    });

    joined = true;
    status.innerText = `Odadasın: ${channel}`;
    joinBtn.disabled = true;
    leaveBtn.disabled = false;
    addSpeaker(uid + " - Sen");
}

async function leave() {
    if(localAudioTrack) localAudioTrack.close();
    if(client) await client.leave();
    joined = false;
    status.innerText = "Odadan çıktın";
    joinBtn.disabled = false;
    leaveBtn.disabled = true;
    speakers.innerHTML = "";
}

function addSpeaker(uid){
    const div = document.createElement("div");
    div.id = "speaker-" + uid;
    div.innerText = "🔊 " + uid;
    speakers.appendChild(div);
}
function removeSpeaker(uid){
    const el = document.getElementById("speaker-" + uid);
    if(el) el.remove();
}

joinBtn.onclick = join;
leaveBtn.onclick = leave;
micBtn.onclick = () => {
    if(localAudioTrack) localAudioTrack.setEnabled(!localAudioTrack.enabled);
}
