import React, { useState, useEffect } from "react";
import stim from "../assets/audio/stimulus.wav";

const AudioButton = () => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(
    null
  );

  useEffect(() => {
    const audioContext = new AudioContext();
    setAudioContext(audioContext);
    fetch(stim)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((decodedAudioBuffer) => {
        setAudioBuffer(decodedAudioBuffer);
      });
  }, []);

  const playAudio = () => {
    if (!audioBuffer || !audioContext) {
      return;
    }

    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);

    setSourceNode(sourceNode);
    sourceNode.start();
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
};

export default AudioButton;
