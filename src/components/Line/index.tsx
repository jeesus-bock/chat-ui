import { Component, Switch, Match } from 'solid-js';
import { format } from 'date-fns';
import type { Msg } from '~/service/ws';

import * as lineCss from './Line.module.css';

export const Line: Component<{ msg: Msg }> = (props) => {
  const { type, from, msg } = props.msg;
  const getAudioLabel = (msg: string) => {
    const arr1 = msg.split('/');
    console.log(arr1);
    const nick = arr1[arr1.length - 1].split(':')[0];
    const ts = arr1[arr1.length - 1].split(':')[1].split('.')[0];
    return nick;
  };
  return (
    <Switch
      fallback={
        <div
          class={`flex px-4 ${lineCss['cols']}`}
          classList={{ grid: type == 'msg', 'text-sm text-gray-500': type == 'join' || type == 'topic', 'font-mono text-gray-500': from == 'server' }}>
          <span data-testid='ts' class='inline-block' classList={{ 'pr-4 mr-4 border-r': type == 'msg' }}>
            {format(new Date(props.msg.ts), 'hh:mm')}
          </span>
          <span data-testid='from' class='ml-2' classList={{ 'pr-4 mr-4 border-r ml-0': type == 'msg' }}>
            {props.msg.from}
            {from == 'server' ? ': ' : ''}
          </span>
          <span data-testid='msg' class='ml-2' classList={{ 'ml-0 border-r': type == 'msg' }}>
            {props.msg.msg}
          </span>
        </div>
      }>
      <Match when={type == 'connected'}>
        <div>CONNECTED</div>
      </Match>
      <Match when={type == 'voice'}>
        <div class='flex gap-4'>
          <label>{getAudioLabel(msg)}</label>
          <audio controls>
            <source src={msg} type='audio/ogg' />
          </audio>
        </div>
      </Match>
    </Switch>
  );
};
