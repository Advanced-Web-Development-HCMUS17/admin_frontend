import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchUserList(token, pageIndex = 1, pageSize = 10) {
  try {
    const res = await axios.get(`${API_URL}/admin/user?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      headers:
        {
          "Authorization": token
        }
    });
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function searchUser(token, keyword) {
  try {
    const res = await axios.get(`${API_URL}/admin/user?key=${keyword}`, {
      headers:
        {"Authorization": token}
    });
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function getUserInfo(token, userId) {
  try {
    const res = await axios.get(`${API_URL}/admin/user/${userId}`, {
      headers:
        {"Authorization": token}
    });
    return res.data;
  } catch (e) {
    return null;
  }
}

export async function getGamesByUserId(token, userId) {
  try {
    const res = await axios.get(`${API_URL}/admin/user/${userId}/game`, {
      headers: {
        "Authorization": token
      }
    });
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function fetchGames(token, pageIndex = 1, pageSize = 10) {
  try {
    const res = await axios.get(`${API_URL}/admin/game?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      headers: {
        "Authorization": token
      }
    });
    return res.data;
  } catch (e) {
    return [];
  }
}

export async function fetchGameInfo(token, gameId) {
  try {
    const res = await axios.get(`${API_URL}/admin/game/${gameId}`, {
      headers:
        {"Authorization": token}
    });
    return res.data;
  } catch (e) {
    return null;
  }
}
