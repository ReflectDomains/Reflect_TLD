import { useMemo } from 'react';
import { formatUnitsWithDec } from '../utils';
import { digitsDifferentLengthToDefaultPrice } from '../config/profilePageSetting';
import { ethers } from 'ethers';
const yearToSecond = 31536000;

const useDomainValue = ({ prices, dec, value, isPermanemt }) => {
	const domainValue = useMemo(() => {
		if (!value && !prices) {
			return [...digitsDifferentLengthToDefaultPrice];
		}
		return (
			value ||
			(prices &&
				prices.map((item) => {
					if (isPermanemt) {
						return formatUnitsWithDec(item, dec);
					} else {
						const bigN = (item / 100) * yearToSecond;
						return formatUnitsWithDec(bigN, dec);
					}
				}))
		);
	}, [value, prices, dec, isPermanemt]);

	const decDomainValue = useMemo(() => {
		return domainValue.map((item) => {
			if (item) {
				const bigN = ethers.utils.parseUnits(item.toString(), dec).toNumber();
				const n = isPermanemt ? bigN : (bigN / yearToSecond) * 100;
				return Math.ceil(Number(n || 0));
			}
			return 0;
		});
	}, [domainValue, dec, isPermanemt]);
	console.log(domainValue, decDomainValue, 'domain value');

	return {
		domainValue,
		decDomainValue,
	};
};

export default useDomainValue;
