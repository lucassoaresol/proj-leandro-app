import axios from "axios";

const token = localStorage.getItem("@ProjLeandro:token");
const serverUrl = "https://proj-leandro.vercel.app/api";
const localServer = "http://127.0.0.1:8000/api";

const localApi = axios.create({
  baseURL: localServer,
  timeout: 5000,
});

const apiServerSide = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
});

if (token) {
  localApi.defaults.headers.authorization = `Bearer ${token}`;
  apiServerSide.defaults.headers.authorization = `Bearer ${token}`;
}

export const apiUsingNow = apiServerSide;
