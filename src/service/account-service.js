import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function register(email, password) {
  try {
    const res = await axios.post(`${API_URL}/users/register`, {
      email: email, password: password
    });
    if (res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/users/login`, {email: email, password: password});
    return res.data;
  } catch (e) {
    return null;
  }
}

async function getUserInfo(token) {
  try {
    const res = await axios.get(`${API_URL}/users/info`, {
      headers:
        {
          "Authorization": token
        }
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const AccountServices = {login, getUserInfo};
export default AccountServices;