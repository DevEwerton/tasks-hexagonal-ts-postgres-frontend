/// <reference types="vite/client" />
import axios from "axios";
import { LocalStorageService } from "../storage/LocalStorageService";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use((config) =>
{
	const token = LocalStorageService.getToken();
	if (token) { config.headers.Authorization = `Bearer ${token}`; }
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => { return response; },
	(error) =>
	{
		if (error.response?.status === 401)
		{
			LocalStorageService.clear();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;