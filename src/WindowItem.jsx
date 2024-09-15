// WindowItem.jsx
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TabItem from './TabItem';

function WindowItem({ window, isSelected, onSelect }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const activeTab = window.tabs.find(tab => tab.active);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div
      className={`window-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(window.id.toString())}
    >
      <span className="window-label">{activeTab.title}</span>
      {activeTab && (
        <div className="active-tab" onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
          <TabItem tab={activeTab} />
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            {dropdownOpen ? '▲' : '▼'}
          </button>
          {dropdownOpen && (
            <ul className="tab-dropdown">
              {window.tabs.map(tab => (
                <TabItem key={tab.id} tab={tab} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

WindowItem.propTypes = {
  window: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default WindowItem;
