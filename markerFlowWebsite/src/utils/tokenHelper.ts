
const tokenKey = 'accessToken';


export const getToken = (): string | null => {
  let token = sessionStorage.getItem(tokenKey);
  if (!token) {
    token = localStorage.getItem(tokenKey);
  }
  return token;
};

export const setAccessToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.setItem(tokenKey, token);
  }
};

export const removeAccessToken = () => {
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
};
