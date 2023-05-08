import http from '../utils/http';

export const getProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		params: data,
		method: 'get',
	});
	return res;
};

export const setProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		data: data,
		method: 'post',
	});
	return res;
};

export const getAvatar = async (data) => {
	const res = await http({
		url: '/api/v1/upload/getPreSign',
		params: data,
		method: 'get',
	});
	return res;
};

export const getUploadOSSUrl = async (data) => {
	const res = await http({
		url: '/api/v1/upload/putPreSign',
		data: data,
		method: 'post',
	});
	return res;
};

export const uploadAvatar = async ({ url, file }) => {
	console.log(file, 'file', url);
	const res = await http({
		url,
		data: file,
		method: 'put',
		contentType: file.type,
		withCredentials: false,
		auth: false,
	});
	return res;
};

export const earnDomainsList = async (data) => {
	const res = await http({
		url: '/api/v1/account/list/domain',
		method: 'get',
		params: data,
	});
	return res;
};

export const earnChart = async (data) => {
	const res = await http({
		url: '/api/v1/account/chart/sale',
		data: data,
		method: 'post',
	});
	return res;
};

export const buyChart = async (data) => {
	const res = await http({
		url: '/api/v1/account/chart/buy',
		data: data,
		method: 'post',
	});
	return res;
};

export const earnList = async (data) => {
	const res = await http({
		url: '/api/v1/account/list/sale',
		data: data,
		method: 'post',
	});
	return res;
};

export const buyList = async (data) => {
	const res = await http({
		url: '/api/v1/account/list/buy',
		data: data,
		method: 'post',
	});
	return res;
};

export const overview = async () => {
	const res = await http({
		url: '/api/v1/account/chart/overview',
		method: 'get',
		params: {},
	});
	return res;
};
