import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';
import { useAccount, useToken } from 'wagmi';
import { useParams } from 'react-router-dom';
import { tokenForContract } from '../../config/profilePageSetting';
import useWriteContract from '../../hooks/useWriteContract';
import useDomainPrice from '../../hooks/useDomainPrice';
import useDomainValue from '../../hooks/useDomainValue';
import useGetTokens from '../../hooks/useGetTokens';

const StepOne = ({ onDisabledChange }) => {
	const { address } = useAccount();
	const [isSettingOver, setIsSettingOver] = useState(false);
	const params = useParams();
	const { data: decData } = useToken({ address: tokenForContract['USDT'] });
	const dec = useMemo(() => decData?.decimals, [decData]);

	const tldName = useMemo(() => params?.name, [params]);

	const tokens = useGetTokens({
		tldName,
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

	const [impermanent, setImpermanent] = useState(false);

	const { isPermanemt, prices, condition } = useDomainPrice({
		impermanent,
		tldName,
	});

	const { domainValue, decDomainValue } = useDomainValue({
		tokens,
		prices,
		dec,
		value,
	});

	const changeImpermant = useCallback((impermanent) => {
		setImpermanent(impermanent);
	}, []);

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'setTld',
		args: [
			tldName,
			receivingAddress,
			condition,
			decDomainValue,
			[tokenForContract['USDT']],
			!impermanent,
		],
		enabled: !!tldName,
	});

	const confirmSetting = useCallback(() => {
		write?.();
	}, [write]);

	useEffect(() => {
		if ((tokens && tokens.length > 0) || isSuccess) {
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
				impermanent={!isPermanemt}
			/>
		</>
	);
};

export default memo(StepOne);
