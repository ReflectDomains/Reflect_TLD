import { useMemo } from 'react';
import { formatUnitsWithDec } from '../utils';
import { digitsDifferentLengthToDefaultPrice } from '../config/profilePageSetting';
import { ethers } from 'ethers';

const useDomainValue = ({ prices, dec, value }) => {
	const domainValue = useMemo(() => {
		if (!value && !prices) {
			return [...digitsDifferentLengthToDefaultPrice];
		}
		return (
			value || (prices && prices.map((item) => formatUnitsWithDec(item, dec)))
		);
	}, [value, prices, dec]);

	const decDomainValue = useMemo(() => {
		return domainValue.map((item) =>
			ethers.utils.parseUnits(item.toString(), dec).toString()
		);
	}, [domainValue, dec]);

	return {
		domainValue,
		decDomainValue,
	};
};

export default useDomainValue;
