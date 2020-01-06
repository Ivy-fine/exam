const setItem = (key, val, options = {}) => {
  let value = typeof val === "object" ? JSON.stringify(val) : val;
  if (options.expires) {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        _expires: +new Date() + options.expires,
        value
      })
    );
  } else {
    localStorage.setItem(key, value);
  }
};
const getItem = key => {
  let val = window.localStorage.getItem(key);
  if (val && (val.indexOf("{") !== -1 || val.indexOf("[") !== -1)) {
    const value = JSON.parse(val);
    if (value._expires) {
      if (value._expires <= +new Date()) {
        window.localStorage.removeItem(key);
      } else {
        return JSON.parse(value.value);
      }
    } else {
      return value;
    }
  }
  return val;
};
export default {
  setItem,
  getItem
};
