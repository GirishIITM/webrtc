import React, { useRef, useState } from 'react';

const User1: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [offer, setOffer] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [remoteCandidates, setRemoteCandidates] = useState<string>('');

  const startCamera = () => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE Candidate:', JSON.stringify(event.candidate));
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    });

    return () => {
      pc.close();
    };
  };

  const createOffer = () => {
    peerConnection?.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      setOffer(JSON.stringify(offer));
    });
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleRemoteCandidatesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemoteCandidates(event.target.value);
  };

  const setRemoteDescription = () => {
    const answerDescription = new RTCSessionDescription(JSON.parse(answer));
    peerConnection?.setRemoteDescription(answerDescription);
  };

  const addRemoteCandidates = () => {
    const candidates: RTCIceCandidateInit[] = JSON.parse(remoteCandidates);
    candidates.forEach(candidate => {
      peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  return (
    <div>
      <h1>User 1</h1>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={createOffer}>Create Offer</button>
      <textarea value={offer} readOnly />
      <br />
      <textarea placeholder="Paste Answer here" value={answer} onChange={handleAnswerChange} />
      <button onClick={setRemoteDescription}>Set Remote Description</button>
      <br />
      <textarea placeholder="Paste Remote Candidates here" value={remoteCandidates} onChange={handleRemoteCandidatesChange} />
      <button onClick={addRemoteCandidates}>Add Remote Candidates</button>
    </div>
  );
};

export default User1;

