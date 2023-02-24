import cn from 'classnames';

import { getWithDivider } from '../../utils';

import style from './style.module.css';

export default function List({
  title,
  items,
  noItemsMessage,
  selectedRow,
  onSelectRow
}) {
  return (
    <div className={style.container}>
      {title && <h3>{title}</h3>}
      {items?.length ? (
        <ul className={style.list}>
          {items.map((item) => {
            const isSelected = selectedRow && selectedRow.id === item.id;
            return (
              <li
                key={item.id}
                className={cn(style.listItem, {
                  [style.selectable]: !!onSelectRow,
                  [style.selectedListItem]: isSelected
                })}
                onClick={() => onSelectRow(isSelected ? null : item)}>
                {`${getWithDivider(
                  item.homeTeam,
                  item.awayTeam
                )}: ${getWithDivider(item.homeScore, item.awayScore)}`}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={style.noItems}>{noItemsMessage || 'No items'}</div>
      )}
    </div>
  );
}
