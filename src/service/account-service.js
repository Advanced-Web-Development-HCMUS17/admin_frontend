import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/admin/login`, {email: email, password: password});
    return res.status === 200 ? res.data : null;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 401)
      errorData["message"] = "Invalid username, password or you don't have permission";
    return errorData;
  }
}

async function getUserInfo(token) {
  try {
    const res = await axios.get(`${API_URL}/admin/info`, {
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

async function resetPasswordRequest(email) {
  try {
    const res = await axios.post(`${API_URL}/admin/reset-password/request/`, {email: email});
    return res.status === 200;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = "Please input email address";
    if (res.status === 404)
      errorData["message"] = "Invalid email address";
    return errorData;
  }
}

async function updatePassword(email, code, newPassword) {
  try {
    const res = await axios.post(`${API_URL}/admin/reset-password/update/`, {
      email: email,
      secretCode: code,
      newPassword: newPassword
    });
    return res.status === 200;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = "Please input new password";
    if (res.status === 404)
      errorData["message"] = res.message;
    return errorData;
  }
}

const AccountServices = {login, getUserInfo, resetPasswordRequest, updatePassword};
export default AccountServices;