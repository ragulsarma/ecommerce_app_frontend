export function saveAuthData(authData: any) {
  localStorage.setItem('authData', JSON.stringify(authData));
}

export function getAuthData() {
  if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('authData');
      return authData ? JSON.parse(authData) : null;
  }
  return null;
}

export function clearAuthData() {
  localStorage.removeItem('authData');
}
