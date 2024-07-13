import React, { useRef, useState } from 'react';

const User2: React.FC = () => {
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

  const handleOfferChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOffer(event.target.value);
  };

  const handleRemoteCandidatesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemoteCandidates(event.target.value);
  };

  const createAnswer = () => {
    const offerDescription = new RTCSessionDescription(JSON.parse(offer));
    peerConnection?.setRemoteDescription(offerDescription).then(() => {
      return peerConnection.createAnswer();
    }).then((answer) => {
      peerConnection.setLocalDescription(answer);
      setAnswer(JSON.stringify(answer));
    });
  };

  const addRemoteCandidates = () => {
    const candidates: RTCIceCandidateInit[] = JSON.parse(remoteCandidates);
    candidates.forEach(candidate => {
      peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  return (
    <div className="container">
      <h1>User 2</h1>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <textarea placeholder="Paste Offer here" value={offer} onChange={handleOfferChange} />
      <button onClick={createAnswer}>Create Answer</button>
      <textarea value={answer} readOnly />
      <textarea placeholder="Paste Remote Candidates here" value={remoteCandidates} onChange={handleRemoteCandidatesChange} />
      <button onClick={addRemoteCandidates}>Add Remote Candidates</button>
    </div>
)}

export default User2;
