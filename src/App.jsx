// App.jsx
import { useEffect, useState, useCallback } from 'react';
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
    if (selectedWindowIds.length < 2) { // {{ edit: Allow merging two or more windows }}
      alert('Please select two or more windows to merge.');
      return;
    }

    const [targetWindowId, ...otherWindowIds] = selectedWindowIds.map(Number);

    // Get all tabs from the other windows
    const allOtherTabs = await Promise.all(otherWindowIds.map(id => queryTabs({ windowId: id })));
    const tabIdsToMove = allOtherTabs.flat().map(tab => tab.id);

    // Move tabs to the target window
    await moveTabs(tabIdsToMove, { windowId: targetWindowId, index: -1 });

    // Close the other windows
    await Promise.all(otherWindowIds.map(id => removeWindow(id)));

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
      <button
        onClick={mergeWindows}
        className="merge-button"
        disabled={selectedWindowIds.length < 2} // {{ edit: Disable button if fewer than two windows are selected }}
      >
        Merge Selected Windows
      </button>
    </div>
  );
}

export default App;
