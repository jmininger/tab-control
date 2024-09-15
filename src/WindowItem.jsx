// WindowItem.jsx
import React from 'react';
import TabItem from './TabItem';

function WindowItem({ window, isSelected, onSelect }) {
  return (
    <div className="window-item">
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(window.id.toString())}
        />
        <span className="window-label"> Window {window.id}</span>
      </label>
      <ul className="tab-list">
        {window.tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} />
        ))}
      </ul>
    </div>
  );
}

export default WindowItem;
