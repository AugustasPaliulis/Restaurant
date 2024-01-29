"use client";

// Save data to sessionStorage
export const saveToSessionStorage = (key, value) => {
  const now = new Date();

  // Set the item expiration time to 10 minutes from now
  let item = null;
  if (value == null || value.length === 0) {
    item = value;
  } else {
    item = {
      value: JSON.stringify(value),
      expiry: now.getTime() + 5 * 60 * 1000, // 5 minutes in milliseconds
    };
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(item));
  }
};

// Load data from sessionStorage
export const loadFromSessionStorage = (key) => {
  let itemStr;
  if (typeof localStorage !== "undefined") {
    // sessionStorage is available
    itemStr = localStorage.getItem(key);
  } else {
    // sessionStorage is not available
    return null;
  }

  if (!itemStr) {
    return null;
  }
  let item;
  try {
    item = JSON.parse(itemStr);
  } catch (e) {
    console.log("error");
    return null;
  }

  const now = new Date();
  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete it from the storage and return null
    localStorage.removeItem(key);
    return null;
  }
  let value;
  try {
    value = JSON.parse(item.value);
  } catch (e) {
    return null;
  }

  return value;
};
