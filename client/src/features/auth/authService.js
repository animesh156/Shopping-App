import axios from 'axios'

const registerRoute = "https://shopping-app-backend-tau.vercel.app/user/register"

const loginRoute = "https://shopping-app-backend-tau.vercel.app/user/login"


// Register user
const register = async (userData) => {
  const response = await axios.post(registerRoute, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(loginRoute, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService