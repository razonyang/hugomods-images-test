
const SECURE_COOKIE = false;

export const setCookie = (name: string, value: string, days: number) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	const secureCookie = SECURE_COOKIE
		? ' Secure; SameSite=Strict;'
		: '';
	document.cookie = name + '=' + (value || '') + expires + `;${secureCookie} path=/`;
};

export const getCookie = (name: string) => {
	const keyValues = document.cookie.split(';');
	let result = '';
	keyValues.forEach((item) => {
		const [key, value] = item.split('=');
		if (key.trim() === name) {
			result = value;
		}
	});
	return result;
};
