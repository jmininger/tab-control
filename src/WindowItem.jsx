// WindowItem.jsx
import React, { useState, useRef, useEffect } from 'react'; // {{ edit: Import useRef and useEffect }}
import PropTypes from 'prop-types'; // {{ edit: Import PropTypes for props validation }}
import TabItem from './TabItem';

function WindowItem({ window, isSelected, onSelect }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // {{ edit: Create ref for dropdown }}
  const activeTab = window.tabs.find(tab => tab.active);

  // {{ edit: Handle click outside to close dropdown }}
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
      className={`window-item ${isSelected ? 'selected' : ''}`} // {{ edit: Add 'selected' class based on isSelected prop }}
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
              {window.tabs.map(tab => ( // {{ edit: Include all tabs in dropdown }}
                <TabItem key={tab.id} tab={tab} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

WindowItem.propTypes = { // {{ edit: Define prop types for WindowItem }}
  window: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default WindowItem;
