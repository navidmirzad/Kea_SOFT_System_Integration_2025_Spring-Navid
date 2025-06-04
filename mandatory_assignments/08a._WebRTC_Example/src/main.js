import "./style.css";

let localStream;
let remoteStream;
let peerConnection;

// STUN server helps peers discover their public IP addresses for NAT traversal
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302"],
    },
  ],
};

async function init() {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  document.getElementById("localVideo").srcObject = localStream;
}

// Create a new RTCPeerConnection, add local tracks, and set up event handlers
async function createPeerConnection(sdpOfferTextAreaId) {
  peerConnection = new RTCPeerConnection(servers);

  // Prepare an empty MediaStream for remote tracks and display it
  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;

  // Add all local media tracks to the peer connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // When remote tracks are received, add them to the remote stream
  peerConnection.ontrack = (event) => {
    event.streams[0]
      .getTracks()
      .forEach((track) => remoteStream.addTrack(track));
  };

  // When ICE candidates are discovered, send them to the remote peer
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(
        peerConnection.localDescription
      );
    }
  };
}

async function createOffer() {
  if (!localStream) {
    return alert("localStream is not ready.");
  }

  // Create a new peer connection and add local tracks
  const offer = await createPeerConnection("sdpOfferTextArea");

  // Set the local SDP offer (should be created after peer connection)
  await peerConnection.setLocalDescription(offer);
}

async function createAnswer() {
  // Create a new peer connection and add local tracks
  await createPeerConnection("sdpAnswerTextArea");

  let offer = document.getElementById("sdpOfferTextArea").value;
  if (!offer) return alert("Offer is required");
  offer = JSON.parse(offer);

  // Set the received offer as the remote description
  await peerConnection.setRemoteDescription(offer);

  // Create an answer SDP based on the offer
  const answer = await peerConnection.createAnswer();
  // Set the answer as the local description
  await peerConnection.setLocalDescription(answer);

  // Display the answer SDP in the UI for manual signaling
  document.getElementById("sdpAnswerTextArea").textContent =
    JSON.stringify(answer);
}

// Used by the "caller" to add the answer from the "receiver"
async function addAnswer() {
  // Get the answer SDP from the UI
  let answer = document.getElementById("sdpAnswerTextArea").value;
  if (!answer) return alert("Answer is required");
  answer = JSON.parse(answer);

  // Set the answer as the remote description if not already set
  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
}

init();
document
  .getElementById("createOfferButton")
  .addEventListener("click", createOffer);
document
  .getElementById("createAnswerButton")
  .addEventListener("click", createAnswer);
document.getElementById("addAnswerButton").addEventListener("click", addAnswer);
