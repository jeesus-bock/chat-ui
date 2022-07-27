import { Component, Switch, Match } from 'solid-js';
import { format } from 'date-fns';
import type { Msg } from '~/service/ws';

import * as lineCss from './Line.module.css';

export const Line: Component<{ msg: Msg }> = (p) => {
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
          classList={{ grid: p.msg.type == 'msg', 'text-sm text-gray-500': p.msg.type == 'join' || p.msg.type == 'topic', 'font-mono text-gray-500': p.msg.from == 'server' }}>
          <span data-testid='ts' class='inline-block' classList={{ 'pr-4 mr-4 border-r': p.msg.type == 'msg' }}>
            {format(new Date(p.msg.ts), 'hh:mm')}
          </span>
          <span data-testid='from' class='ml-2' classList={{ 'pr-4 mr-4 border-r ml-0': p.msg.type == 'msg' }}>
            {p.msg.from}
            {p.msg.from == 'server' ? ': ' : ''}
          </span>
          <span data-testid='msg' class='ml-2' classList={{ 'ml-0 border-r': p.msg.type == 'msg' }}>
            {p.msg.msg}
          </span>
        </div>
      }>
      <Match when={p.msg.type == 'connected'}>
        <div class='p-4'>
          --- CONNECTED TO <span class='font-bold'>{decodeURI(p.msg.to)}</span> ---
        </div>
      </Match>
      <Match when={p.msg.type == 'voice'}>
        <div class='flex gap-4 items-center pl-4'>
          <label>{getAudioLabel(p.msg.msg)}</label>
          <audio controls>
            <source src={p.msg.msg} type='audio/ogg' />
          </audio>
        </div>
      </Match>
    </Switch>
  );
};
