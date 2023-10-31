import React from 'react';

interface Item {
  id: number;
  title: string;
  checked: boolean;
}

interface ListProps {
  items: Item[];
  removeItem: (id: number) => void;
  toggleChecked: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, removeItem, toggleChecked }) => {
  return (
    <div className="items">
      {items.map((item: Item) => {
        const { id, title, checked } = item;
        const titleStyle = checked ? { textDecoration: 'line-through' } : {};
        return (
          <div className="single-item" key={id}>
            <input type="checkbox" checked={checked} onChange={() => toggleChecked(id)} />
            <p style={titleStyle}>{title}</p>
            <button type="button" className="btn remove-btn" onClick={() => removeItem(id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
