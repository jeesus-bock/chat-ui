import { describe, expect, test } from 'vitest';
import { render, findByTestId, screen } from 'solid-testing-library';
import { Lines } from './index';

const testMsgs = [
  { type: 'msg', from: 'mock_user', to: 'mock_room', msg: 'This is a test message!', ts: 165789872275 },
  { type: 'msg', from: 'mock_user2', to: 'mock_room', msg: 'This is a test message2!', ts: 165799827275 },
];
describe('<Lines />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <Lines msgs={testMsgs} />);
    expect(container).toMatchSnapshot();
    unmount();
  });

  test('presents messages data', async () => {
    const { queryAllByTestId, unmount } = render(() => <Lines msgs={testMsgs} />);
    const tids = queryAllByTestId('ts');
    expect(tids[0]).toHaveTextContent('10:44');
    expect(tids[1]).toHaveTextContent('1:30');
  });
});
