import { describe, expect, test } from 'vitest';
import { render } from 'solid-testing-library';
import { Line } from './index';

describe('<Line />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <Line msg={{ type: 'msg', from: 'mock_user', to: 'mock_room', msg: 'This is a test message!', ts: 165789872275 }} />);
    expect(container).toMatchSnapshot();
    unmount();
  });

  test('present message data', async () => {
    const { queryByTestId, unmount } = render(() => <Line msg={{ type: 'msg', from: 'mock_user', to: 'mock_room', msg: 'This is a test message!', ts: 165789872275 }} />);
    expect(queryByTestId('ts')).toHaveTextContent('10:44');
    expect(queryByTestId('from')).toHaveTextContent('mock_user');
    expect(queryByTestId('msg')).toHaveTextContent('This is a test message!');
  });
});
