import { Component } from 'solid-js';
import { CogMenu } from '~/components/CogMenu';
import { SendWs, ServerData } from '~/types';
export const TopicBox: Component<{ room: string; topic: string; data: ServerData; send: SendWs }> = (props) => {
  return (
    <div class='w-full p-4 border-b border-gray-500 bg-stone-100 flex items-center'>
      <label data-testid='topic' class='flex-grow'>
        {props.room} - {props.topic}
      </label>
      <CogMenu data={props.data} send={props.send} />
    </div>
  );
};
