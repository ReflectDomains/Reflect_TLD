import { useMemo } from 'react';
import { useContractRead, useContractReads } from 'wagmi';
import { getNameHash, keccakCondition } from '../utils';
import { tldABI } from '../config/ABI';
import { tldContract } from '../config/contract';
import {
	digitsDifferentLengthToDefaultPrice,
	digitsLength,
	tokenForContract,
} from '../config/profilePageSetting';

const useDomainPrice = ({ tldName, impermanent }) => {
	// is impermanent
	const { data: isPermanemt } = useContractRead({
		functionName: 'permanentOwnershipOfSubnode',
		abi: tldABI,
		address: tldContract,
		args: [getNameHash(tldName)],
	});

	const conditionLen = useMemo(
		() => digitsDifferentLengthToDefaultPrice.length,
		[]
	);

	// condition: [premanent, length, payment]
	const condition = useMemo(() => {
		let arr = new Array(conditionLen).fill(0);
		return arr.map((_, index) =>
			keccakCondition([
				impermanent !== null ? !impermanent : isPermanemt,
				digitsLength[index] === '4+' ? 5 : parseInt(digitsLength[index]),
				tokenForContract['USDT'],
			])
		);
	}, [conditionLen, impermanent, isPermanemt]);

	// get price
	const getPricesArgs = useMemo(() => {
		return condition.map((item) => {
			return {
				functionName: 'prices',
				abi: tldABI,
				address: tldContract,
				args: [getNameHash(tldName), item],
			};
		});
	}, [condition, tldName]);

	const { data: prices } = useContractReads({
		contracts: [...getPricesArgs],
	});

	return {
		isPermanemt,
		prices,
		condition,
	};
};

export default useDomainPrice;
