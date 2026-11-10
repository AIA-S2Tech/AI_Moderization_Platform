export const isAuthenticated = () => {
  const isUser_valid = JSON.parse(localStorage.getItem('user'));
  // const isSuperAdmin = isUser_valid?.user?.roles?.includes("super_admin");
  return !!isUser_valid?.user?.id; // or return true/false based on your auth logic
};

export const logout = async() => {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userInfo.access_token}`
    }
  });

  const data = await response.json();
  // console.log("logout :- ", data)

  // TDOD: need to modify this logic and add refresh token
  if (response.ok || response.status === 401) {
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  } else {
    // Handle errors (like 401 Unauthorized)
    alert(data.error || 'Failed to Logout');
  }
}

export const login = async (email, password) => {
  try {
    // TODO: Create file to store all API urls according to env
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    // console.log("This data:- ", data)

    if (response.ok) {
      // Save the token to localStorage or context
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('user_timestamp', new Date().toISOString());
      window.location.href = '/';
    } else {
      // Handle errors (like 401 Unauthorized)
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again.');
  }
};
