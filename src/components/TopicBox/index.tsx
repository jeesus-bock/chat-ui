import { Component } from 'solid-js';
import { CogMenu } from '~/components/CogMenu';
export const TopicBox: Component<{ room: string; topic: string }> = (props) => {
  return (
    <div class='w-full p-4 border-b border-gray-500 bg-stone-100 flex items-center'>
      <label data-testid='topic' class='flex-grow'>
        {props.room} - {props.topic}
      </label>
      <CogMenu />
    </div>
  );
};
