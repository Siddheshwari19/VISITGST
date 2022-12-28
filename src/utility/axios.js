import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://visit-gst-backend.herokuapp.com';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: Cookies.get('access_token')
			? 'Bearer ' + Cookies.get('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(error.response);
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 
		) {
			Cookies.set('access_token', '');
			Cookies.set('refresh_token', '');
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			error.response.data.error == 'kick'
		) {
			Cookies.set('access_token', '');
			Cookies.set('refresh_token', '');
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (

			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = Cookies.get('refresh_token');

			console.log(refreshToken);
			if (refreshToken != 'undefined' && refreshToken != null) {
				console.log("Inside");
				return axiosInstance
					.post('/refreshtoken/', { refreshtc: refreshToken })
					.then((response) => {
						Cookies.set('access_token', response.data.accesstoken);
						Cookies.set('refresh_token', response.data.refreshtoken);

						axiosInstance.defaults.headers['Authorization'] =
							'JWT ' + response.data.accesstoken;
						originalRequest.headers['Authorization'] =
							'JWT ' + response.data.accesstoken;

						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						console.log(err);
					});

			} else {
				Cookies.set('access_token', '');
				Cookies.set('refresh_token', '');

				console.log('Refresh token not available.');
				window.location.href = '/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
