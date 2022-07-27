import { Component } from 'solid-js';

export const IconButton: Component<{ disabled: boolean; icon: string; onClick: () => void }> = (p) => {
  return (
    <button class='flex items-center justify-center h-10 w-10 p-0' disabled={p.disabled} onClick={p.onClick}>
      <svg class='h-6 w-6 hover:fill-slate-400 cursor-pointer' classList={{ 'fill-gray-400': p.disabled }}>
        <path d={p.icon} />
      </svg>
    </button>
  );
};
