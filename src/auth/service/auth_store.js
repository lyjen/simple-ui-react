const key = "auth";

export const AuthStore = () => {
  const save = async (data = {}) => {
    return localStorage.setItem(key, JSON.stringify(data));
  };
  const getItem = async () => {
    const data = await localStorage.getItem(key);
    try {
      const value = JSON.parse(data);
      return value;
    } catch (e) {
      return null;
    }
  };

  return {
    save,
    getItem,
  };
};