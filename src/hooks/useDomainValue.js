import { useMemo } from 'react';
import { formatUnitsWithDec } from '../utils';
import { digitsDifferentLengthToDefaultPrice } from '../config/profilePageSetting';
import { ethers } from 'ethers';

const useDomainValue = ({ tokens, prices, dec, value }) => {
	const domainValue = useMemo(() => {
		if (!tokens || tokens.length <= 0 || !prices) {
			return !value ? [...digitsDifferentLengthToDefaultPrice] : value;
		}
		return prices && prices.map((item) => formatUnitsWithDec(item, dec));
	}, [tokens, value, prices, dec]);

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
