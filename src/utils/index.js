import { ethers } from 'ethers';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const splitAddress = (address, start = 5, end = -4) => {
	return (
		(address && address.slice(0, start) + '...' + address.slice(end)) || ''
	);
};

export const keccak256tld = (tld) =>
	ethers.utils.keccak256(ethers.utils.solidityPack(['bytes32'], [tld]));

export const handleTldName = (name) => {
	if (name.match(/^\./)) {
		return name;
	} else {
		return '.' + name;
	}
}

export const throttle = (fn, delay) => {
	let throttleTimer = null;
	return function () {
		if (throttleTimer) return;
		throttleTimer = setTimeout(() => {
			fn.apply(this, arguments);
			throttleTimer = null;
		}, delay);
	};
};

export const debounce = (fn, delay) => {
	let debounceTimer = null;
	return function () {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			fn.apply(this, arguments);
			debounceTimer = null;
		}, delay);
	};
};
