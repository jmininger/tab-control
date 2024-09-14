import React, { useEffect, useState } from 'react';

function App() {
  const [windows, setWindows] = useState([]);
  const [selectedWindows, setSelectedWindows] = useState([]);

  useEffect(() => {
    // Fetch all windows with their tabs
    chrome.windows.getAll({ populate: true }, (windowList) => {
      setWindows(windowList);
    });
  }, []);

  const handleWindowSelect = (windowId) => {
    setSelectedWindows((prev) => {
      if (prev.includes(windowId)) {
        return prev.filter((id) => id !== windowId);
      } else {
        return [...prev, windowId];
      }
    });
  };

  const mergeWindows = () => {
    if (selectedWindows.length !== 2) {
      alert('Please select exactly two windows to merge.');
      return;
    }
    const [windowId1, windowId2] = selectedWindows;

    // Move tabs from windowId2 to windowId1
    chrome.tabs.query({ windowId: parseInt(windowId2) }, (tabs) => {
      const tabIds = tabs.map((tab) => tab.id);
      chrome.tabs.move(tabIds, { windowId: parseInt(windowId1), index: -1 }, () => {
        // Close the second window
        chrome.windows.remove(parseInt(windowId2), () => {
          // Refresh the window list
          chrome.windows.getAll({ populate: true }, (windowList) => {
            setWindows(windowList);
            setSelectedWindows([]);
          });
        });
      });
    });
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h2>Chrome Tab Manager</h2>
      {windows.map((win) => (
        <div key={win.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
          <label>
            <input
              type="checkbox"
              checked={selectedWindows.includes(win.id.toString())}
              onChange={() => handleWindowSelect(win.id.toString())}
            />
            <strong> Window {win.id}</strong>
          </label>
          <ul>
            {win.tabs.map((tab) => (
              <li key={tab.id}>
                {tab.favIconUrl && (
                  <img src={tab.favIconUrl} alt="" width="16" height="16" style={{ verticalAlign: 'middle' }} />
                )}{' '}
                {tab.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={mergeWindows} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Merge Selected Windows
      </button>
    </div>
  );
}

export default App;

