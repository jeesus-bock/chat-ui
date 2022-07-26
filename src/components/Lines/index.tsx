import { Component, For } from 'solid-js';
import { Line } from '~/components/Line';
import type { Msg } from '~/service/ws';

export const Lines: Component<{ msgs: Array<Msg> }> = (p) => {
  return (
    <div data-testid='lines' class='w-full h-full overflow-y-scroll'>
      <For each={p.msgs}>{(msg) => <Line msg={msg} />}</For>
    </div>
  );
};
