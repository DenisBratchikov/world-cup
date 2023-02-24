import { act, fireEvent, render } from '@testing-library/react';

import List from '.';

const ITEMS = [
  {
    id: '1',
    homeTeam: 'Brazil',
    awayTeam: 'Spain',
    homeScore: 2,
    awayScore: 5
  },
  {
    id: '2',
    homeTeam: 'Mexico',
    awayTeam: 'Canada',
    homeScore: 0,
    awayScore: 1
  }
];

describe('List tests', () => {
  it('should render title', () => {
    const title = 'Some title';
    const { queryByText } = render(<List title={title} />);

    expect(queryByText(title)).not.toBeNull();
  });

  it('should render list of items', () => {
    const { queryByText } = render(<List items={ITEMS} />);

    expect(queryByText(ITEMS[0].homeTeam, { exact: false })).not.toBeNull();
    expect(queryByText(ITEMS[1].awayScore, { exact: false })).not.toBeNull();
  });

  it('should render no items message', () => {
    const msg = 'No items test message';
    const { queryByText } = render(<List noItemsMessage={msg} />);

    expect(queryByText(msg)).not.toBeNull();
  });

  it('should call onSelectRow when clicking on row', () => {
    const onSelectRow = jest.fn();
    const item = ITEMS[0];
    const { getByText } = render(
      <List items={ITEMS} onSelectRow={onSelectRow} />
    );

    const row = getByText(item.homeTeam, { exact: false });

    act(() => {
      fireEvent.click(row);
    });

    expect(onSelectRow).toHaveBeenCalledWith(item);
  });

  it('should call onSelectRow with null value when clicking on selected row', () => {
    const onSelectRow = jest.fn();
    const item = ITEMS[0];
    const { getByText } = render(
      <List items={ITEMS} onSelectRow={onSelectRow} selectedRow={item} />
    );

    const row = getByText(item.homeTeam, { exact: false });

    act(() => {
      fireEvent.click(row);
    });

    expect(onSelectRow).toHaveBeenCalledWith(null);
  });
});
