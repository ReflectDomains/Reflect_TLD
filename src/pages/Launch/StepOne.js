import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';
import { useAccount, useContractRead, useContractReads, useToken } from 'wagmi';
import { tldABI } from '../../config/ABI';
import { tldContract } from '../../config/contract';
import { formatUnitsWithDec, getNameHash, keccakCondition } from '../../utils';
import { useParams } from 'react-router-dom';
import {
	digitsDifferentLengthToDefaultPrice,
	tokenForContract,
} from '../../config/profilePageSetting';
import { digitsLength } from '../../config/profilePageSetting';
import useWriteContract from '../../hooks/useWriteContract';
import { ethers } from 'ethers';

const StepOne = ({ onDisabledChange }) => {
	const { address } = useAccount();
	const [isSettingOver, setIsSettingOver] = useState(false);
	const params = useParams();
	const { data: decData } = useToken({ address: tokenForContract['USDT'] });
	const dec = useMemo(() => decData?.decimals, [decData]);

	const tldName = useMemo(() => params?.name, [params]);

	const { data: tokens } = useContractRead({
		abi: tldABI,
		address: tldContract,
		functionName: 'getSupportedPayment',
		enabled: !!tldName,
		args: [getNameHash(tldName)],
	});

	const [receiving, setReceiving] = useState(null);

	const onChangeReceivingAddress = useCallback((adr) => {
		setReceiving(adr);
	}, []);

	const receivingAddress = useMemo(
		() => receiving || address,
		[receiving, address]
	);

	const [value, setValue] = useState(null);

	const changeDomain = useCallback((d) => {
		setValue(d.get('USDT'));
	}, []);

	const conditionLen = useMemo(
		() => digitsDifferentLengthToDefaultPrice.length,
		[]
	);

	const [impermanent, setImpermanent] = useState(false);

	// condition: [premanent, length, payment]

	const condition = useMemo(() => {
		let arr = new Array(conditionLen).fill(0);
		return arr.map((_, index) =>
			keccakCondition([
				!impermanent,
				digitsLength[index] === '4+' ? 5 : parseInt(digitsLength[index]),
				tokenForContract['USDT'],
			])
		);
	}, [conditionLen, impermanent]);

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

	const domainValue = useMemo(() => {
		if (!tokens || tokens.length <= 0) {
			return !value ? [...digitsDifferentLengthToDefaultPrice] : value;
		}
		return prices.map((item) => formatUnitsWithDec(item, dec));
	}, [tokens, value, prices, dec]);

	const decDomainValue = useMemo(() => {
		return domainValue.map((item) =>
			ethers.utils.parseUnits(item.toString(), dec).toString()
		);
	}, [domainValue, dec]);

	const changeImpermant = useCallback((impermanent) => {
		setImpermanent(impermanent);
	}, []);

	const arrPayment = useMemo(
		() => new Array(conditionLen).fill(tokenForContract['USDT']),
		[conditionLen]
	);

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'setTld',
		args: [
			tldName,
			receivingAddress,
			condition,
			decDomainValue,
			arrPayment,
			!impermanent,
		],
		enabled: !!tldName,
	});

	const confirmSetting = useCallback(() => {
		write?.();
	}, [write]);

	useEffect(() => {
		if (tokens.length > 0 || isSuccess) {
			setIsSettingOver(true);
			onDisabledChange && onDisabledChange(false);
		}
	}, [tokens, onDisabledChange, isSuccess]);

	return (
		<>
			<ManageDomain
				isSuccess={isSuccess || isSettingOver}
				domainValue={domainValue}
				onChange={changeDomain}
				onChangeImpermanent={changeImpermant}
				changeReceivingAddress={onChangeReceivingAddress}
				onConfirm={confirmSetting}
				isLoading={isLoading}
			/>
		</>
	);
};

export default memo(StepOne);
