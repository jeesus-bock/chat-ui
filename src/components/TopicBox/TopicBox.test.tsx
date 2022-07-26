import { describe, expect, test } from 'vitest';
import { render } from 'solid-testing-library';
import { TopicBox } from './index';

describe('<TopixBox />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <TopicBox room='#test_room' topic='Testing topic' />);
    expect(container).toMatchSnapshot();
    unmount();
  });

  test('presents message data', async () => {
    const { queryByTestId } = render(() => <TopicBox room='#test_room' topic='Testing topic' />);
    expect(queryByTestId('topic')).toHaveTextContent('#test_room - Testing topic');
  });
});
