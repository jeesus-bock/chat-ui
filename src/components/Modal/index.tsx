import { Component, JSXElement } from 'solid-js';
import { CogMenu } from '../CogMenu';
export const Modal: Component<{ content: JSXElement }> = (props) => {
  return (
    <div class='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center'>
      <div class='border border-gray-500 bg-stone-100 p-4'>{props.content}</div>
    </div>
  );
};
