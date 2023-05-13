import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const splitAddress = (address, start = 5, end = -4) => {
	return (
		(address && address.slice(0, start) + '...' + address.slice(end)) || ''
	);
};

export const getNameHash = (name) =>
	(name && ethers.utils.namehash(name)) || '';

export const keccak256tld = (tld) =>
	ethers.utils.keccak256(ethers.utils.toUtf8Bytes(tld));

export const keccakCondition = (arg) =>
	ethers.utils.solidityKeccak256(['bool', 'uint256', 'address'], [...arg]);

export const formatUnitsWithDec = (n, d) => {
	if (!n) return 0;
	return ethers.utils.formatUnits(n?.toString(), d ?? 0)?.toString();
};

export const handleTldName = (name) => {
	if (!name) return '';
	if (name.match(/^\./)) {
		return name;
	} else {
		return '.' + name;
	}
};

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

export const formateNumber = (value, n) => {
	const number = new BigNumber(value);
	const roundedNumber = number.decimalPlaces(n, BigNumber.ROUND_HALF_UP);
	return roundedNumber.toFixed(n);
};
