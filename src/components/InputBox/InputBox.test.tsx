import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from 'solid-testing-library';
import { InputBox } from './index';

describe('<InputBox />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <InputBox send={(msg: string) => {}} />);
    expect(container).toMatchSnapshot();
    unmount();
  });

  test('runs prop function on click Send', async () => {
    const send = vi.fn().mockImplementation((msg: string) => {});
    const { queryByRole, unmount } = render(() => <InputBox send={send} />);
    const btn = (await queryByRole('button')) as HTMLButtonElement;
    expect(btn).toHaveTextContent('Send');
    fireEvent(
      btn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(send).toHaveBeenCalledTimes(1);
    unmount();
  });
  test('sets text value as parameter for the send function', async () => {
    const send = vi.fn().mockImplementation((msg: string) => {});
    const { queryByRole, queryByTestId, unmount } = render(() => <InputBox send={send} />);
    const input = (await queryByTestId('input')) as HTMLInputElement;

    const btn = (await queryByRole('button')) as HTMLButtonElement;

    input.value = 'send test';
    fireEvent(
      input,
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent(
      btn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toBeCalledWith('send test');
    unmount();
  });
});
