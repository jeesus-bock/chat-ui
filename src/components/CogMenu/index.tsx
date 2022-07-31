import { Component, createSignal, Show } from 'solid-js';
import { mdiAccount, mdiCog } from '@mdi/js';
import { Portal } from 'solid-js/web';
import { clickOutside } from '~/directives/click-outside';
import { useCtx } from '~/ctx';
import { Modal } from '../Modal';
import { ChangeNick } from '../Modal/content/ChangeNick';
import { ChangeTopic } from '../Modal/content/ChangeTopic';
import { ServerBox } from '~/components/ServerBox/';
import { SendWs } from '~/types';

export const CogMenu: Component<{ send: SendWs }> = (props) => {
  const [open, setOpen] = createSignal('');
  const [modal, setModal] = createSignal('');
  console.log(clickOutside);
  const [store] = useCtx();
  const toggle = (menu: string) => {
    if (open() === menu) {
      setOpen('');
    } else {
      setOpen(menu);
    }
  };
  return (
    <div class='relative flex'>
      <svg class='w-8 h-8 hover:fill-slate-400 cursor-pointer' onClick={() => toggle('user')}>
        <path d={mdiAccount} />
      </svg>
      <svg class='w-8 h-8 ml-4 hover:fill-slate-400 cursor-pointer' onClick={() => toggle('cog')}>
        <path d={mdiCog} />
      </svg>
      <Show when={open() == 'user'}>
        <div
          class='absolute border border-gray-500 bg-gray-100 p-4 right-8 top-8 z-50'
          use:clickOutside={() => {
            setOpen('');
          }}>
          <button
            class='whitespace-nowrap'
            onClick={() => {
              setOpen('');
              setModal('change-nick');
            }}>
            Change nick
          </button>
        </div>
      </Show>
      <Show when={open() == 'cog'}>
        <div
          class='absolute border border-gray-500 bg-gray-100 p-4 right-8 top-8 z-50'
          use:clickOutside={() => {
            setOpen('');
          }}>
          <ServerBox />
          <button
            class='whitespace-nowrap'
            onClick={() => {
              setOpen('');
              setModal('change-topic');
            }}>
            Change topic
          </button>
        </div>
      </Show>
      <Show when={modal() == 'change-nick'}>
        <Portal>
          <Modal
            content={
              <ChangeNick
                close={() => {
                  setModal('');
                }}
                send={props.send}
              />
            }
          />
        </Portal>
      </Show>
      <Show when={modal() == 'change-topic'}>
        <Portal>
          <Modal
            content={
              <ChangeTopic
                close={() => {
                  setModal('');
                }}
                send={props.send}
              />
            }
          />
        </Portal>
      </Show>
    </div>
  );
};
