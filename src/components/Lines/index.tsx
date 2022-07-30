import { Component, createEffect, For, on } from 'solid-js';
import { Line } from '~/components/Line';
import type { Msg } from '~/service/ws';

export const Lines: Component<{ msgs: Array<Msg> }> = (p) => {
  let scrollBox: HTMLDivElement;
  createEffect(() => {
    console.log('new messages', p.msgs);
    scrollBox.scrollTop = scrollBox.scrollHeight;
  });
  return (
    <div data-testid='lines' class='w-full h-full overflow-y-scroll' ref={scrollBox}>
      <For each={p.msgs}>{(msg) => <Line msg={msg} />}</For>
    </div>
  );
};
