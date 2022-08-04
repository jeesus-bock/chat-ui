import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from 'solid-testing-library';
import { InputBox } from './index';
import { CtxProvider } from '../../ctx/index';
describe('<InputBox />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <InputBox room='test_room1' />);
    expect(container).toMatchSnapshot();
    unmount();
  });

  test('runs store function on click Send', async () => {
    const { queryByRole, unmount } = render(() => (
      <CtxProvider>
        <InputBox room='test_room2' />
      </CtxProvider>
    ));
    const btn = (await queryByRole('button')) as HTMLButtonElement;
    expect(btn).toHaveTextContent('Send');
    fireEvent(
      btn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    unmount();
  });
});
