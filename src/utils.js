// utils.js
// Utility functions to wrap Chrome API callbacks in Promises

/* global chrome */

export function getAllWindows(getInfo) {
  return new Promise((resolve) => {
    chrome.windows.getAll(getInfo, (windows) => {
      resolve(windows);
    });
  });
}

export function queryTabs(queryInfo) {
  return new Promise((resolve) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      resolve(tabs);
    });
  });
}

export function moveTabs(tabIds, moveProperties) {
  return new Promise((resolve) => {
    chrome.tabs.move(tabIds, moveProperties, (movedTabs) => {
      resolve(movedTabs);
    });
  });
}

export function removeWindow(windowId) {
  return new Promise((resolve) => {
    chrome.windows.remove(windowId, () => {
      resolve();
    });
  });
}
