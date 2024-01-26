"use-client";
// Save data to sessionStorage
export const saveToSessionStorage = (key, value) => {
  const now = new Date();
  // Set the item expiration time to 10 minutes from now
  const item = {
    value: JSON.stringify(value),
    expiry: now.getTime() + 10 * 60 * 1000, // 10 minutes in milliseconds
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};

// Load data from sessionStorage
export const loadFromSessionStorage = (key) => {
  let itemStr;
  if (typeof sessionStorage !== "undefined") {
    // sessionStorage is available
    itemStr = sessionStorage.getItem(key);
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
    sessionStorage.removeItem(key);
    return null;
  }
  let value;
  try {
    value = JSON.parse(item.value);
  } catch (e) {
    console.error("error");
    return null;
  }

  return value;
};
