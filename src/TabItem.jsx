// TabItem.jsx
import React from 'react';

function TabItem({ tab }) {
  return (
    <li className="tab-item">
      {tab.favIconUrl && (
        <img
          src={tab.favIconUrl}
          alt=""
          width="16"
          height="16"
          className="tab-favicon"
        />
      )}
      <span className="tab-title">{tab.title}</span>
    </li>
  );
}

export default TabItem;

