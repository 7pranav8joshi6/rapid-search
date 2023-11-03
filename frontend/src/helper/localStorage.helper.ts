export const setToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
