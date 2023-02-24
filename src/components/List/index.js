import cn from "classnames";

import { getWithDivider } from "../../utils";

import style from "./style.module.css";

export default function List({
  title,
  items,
  noItemsMessage,
  selectedRowId,
  onSelectRow,
}) {
  return (
    <div className={style.container}>
      <h3>{title}</h3>
      {items.length ? (
        <ul className={style.list}>
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(style.listItem, {
                [style.selectable]: !!onSelectRow,
                [style.selectedListItem]: selectedRowId === item.id,
              })}
              onClick={() => onSelectRow(item)}
            >
              {`${getWithDivider(
                item.homeTeam,
                item.awayTeam
              )}: ${getWithDivider(item.homeScore, item.awayScore)}`}
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.noItems}>{noItemsMessage}</div>
      )}
    </div>
  );
}
