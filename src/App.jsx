// App.jsx
import React, { useEffect, useState, useCallback } from 'react';
import WindowItem from './WindowItem';
import {
  getAllWindows,
  queryTabs,
  moveTabs,
  removeWindow,
} from './utils';
import './App.css';

function App() {
  const [windows, setWindows] = useState([]);
  const [selectedWindowIds, setSelectedWindowIds] = useState([]);

  // Fetch all windows with their tabs
  const fetchWindows = useCallback(async () => {
    const windowList = await getAllWindows({ populate: true });
    setWindows(windowList);
  }, []);

  useEffect(() => {
    fetchWindows();
  }, [fetchWindows]);

  // Handle selection of windows for merging
  const handleWindowSelect = (windowId) => {
    setSelectedWindowIds((prevSelected) => {
      if (prevSelected.includes(windowId)) {
        return prevSelected.filter((id) => id !== windowId);
      } else {
        return [...prevSelected, windowId];
      }
    });
  };

  // Merge the selected windows
  const mergeWindows = async () => {
    if (selectedWindowIds.length !== 2) {
      alert('Please select exactly two windows to merge.');
      return;
    }

    const [windowId1, windowId2] = selectedWindowIds.map(Number);

    // Get all tabs from the second window
    const tabs = await queryTabs({ windowId: windowId2 });
    const tabIds = tabs.map((tab) => tab.id);

    // Move tabs to the first window
    await moveTabs(tabIds, { windowId: windowId1, index: -1 });

    // Close the second window
    await removeWindow(windowId2);

    // Refresh the window list
    await fetchWindows();
    setSelectedWindowIds([]);
  };

  return (
    <div className="app-container">
      <h2>Chrome Tab Manager</h2>
      {windows.map((win) => (
        <WindowItem
          key={win.id}
          window={win}
          isSelected={selectedWindowIds.includes(win.id.toString())}
          onSelect={handleWindowSelect}
        />
      ))}
      <button onClick={mergeWindows} className="merge-button">
        Merge Selected Windows
      </button>
    </div>
  );
}

export default App;
