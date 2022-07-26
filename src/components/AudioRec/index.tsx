import { Component, onMount } from 'solid-js';
import { mdiMicrophone } from '@mdi/js';

export const AudioRec: Component<{ room: string; id: string }> = (props) => {
  let mediaRecorder;
  let blob: Blob;
  let audio;

  onMount(() => {
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };
      let chunks = [];
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.onstop = function (e) {
            console.log('data available after MediaRecorder.stop() called.');

            const clipName = prompt('Enter a name for your sound clip');

            const clipLabel = document.createElement('p');

            audio.setAttribute('controls', '');
            audio.controls = true;
            blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log('recorder stopped');
          };

          mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
          };
        })
        .catch(function (err) {
          console.error(`The following error occurred: ${err}`);
        });
    }
  });
  const startRec = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log('recorder started');
  };
  const stopRec = async () => {
    mediaRecorder.stop();
    setTimeout(async () => {
      console.log('starting upload');
      let formData = new FormData();
      console.log('blob', blob);
      formData.append('document', blob);
      let res = await fetch('http://127.0.0.1:9393/upload/' + props.id + '/' + props.room, { method: 'POST', body: formData });
      console.log(res);
    });
  };
  return (
    <>
      <button class='flex items-center justify-center h-10 w-10 p-0' onClick={startRec}>
        <svg class='h-6 w-6 hover:fill-slate-400 cursor-pointer'>
          <path d={mdiMicrophone} />
        </svg>
      </button>
      <button class='flex items-center justify-center h-10 w-10 p-0 bg-red-200' onClick={stopRec}>
        <svg class='h-6 w-6 hover:fill-slate-400 cursor-pointer'>
          <path d={mdiMicrophone} />
        </svg>
      </button>
      <audio ref={audio} />
    </>
  );
};