import { Component, createSignal, onMount, Show } from 'solid-js';
import { postVoice } from '~/service/post_voice';
import { mdiRecord, mdiStop } from '@mdi/js';
import { IconButton } from '../IconButton';

export const AudioRec: Component<{ room: string; id: string }> = (props) => {
  const [mediaRecorder, setMediaRecorder] = createSignal(null as MediaRecorder);
  const [recording, setRecording] = createSignal(false);

  onMount(() => {
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };
      let chunks = [];
      // TODO: Change this to aync/await
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          console.log('Got the media stream', stream);
          setMediaRecorder(new MediaRecorder(stream));
          mediaRecorder().onstart = () => {
            setRecording(true);
          };
          mediaRecorder().onstop = async (e) => {
            console.log('mediaRecorder().onstop');

            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            chunks = [];
            // Create the formdata file object from the recorded stream
            let formData = new FormData();
            console.log('blob', blob);
            formData.append('document', blob);
            let res = await postVoice(props.id, props.room, formData);
            console.log(res);
            setRecording(false);
          };

          mediaRecorder().ondataavailable = (e) => {
            chunks.push(e.data);
          };
        })
        .catch(function (err) {
          console.error(`The following error occurred: ${err}`);
        });
    }
  });

  return (
    <>
      <Show when={mediaRecorder()}>
        <div class='self-end flex gap-x-4 justify-end mt-4 sm:mt-0'>
          <IconButton icon={mdiRecord} disabled={recording()} onClick={() => mediaRecorder().start()} />
          <IconButton icon={mdiStop} disabled={!recording()} onClick={() => mediaRecorder().stop()} />
        </div>
      </Show>
    </>
  );
};
