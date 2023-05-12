import axios from "axios";

const token = localStorage.getItem("@ProjLeandro:token");
const serverUrl = "https://proj-leandro.vercel.app/api";
const localServer = "http://127.0.0.1:8000/api";

const localApi = axios.create({
  baseURL: localServer,
  timeout: 5000,
});

export const localApiToken = axios.create({
  baseURL: localServer,
  timeout: 5000,
  headers: { Authorization: `Bearer ${token}` },
});

const apiServerSide = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
});

export const apiServerSideToken = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}` },
});

export const apiUsingNow = localApi;
export const apiUsingNowWithToken = localApiToken;
