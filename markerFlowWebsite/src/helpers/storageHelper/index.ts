//getItem from localStorage and parse it to JSON
export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

//setItem to localStorage and stringify it
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//removeItem from localStorage
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
