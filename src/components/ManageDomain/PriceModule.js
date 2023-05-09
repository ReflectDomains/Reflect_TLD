import { memo, useCallback, useMemo, useState } from 'react';
import SettingPart from './SettingPart';
import { Box, Stack, Switch, Typography, styled, Input } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
import useDomainPrice from '../../hooks/useDomainPrice';
import useGetTokens from '../../hooks/useGetTokens';
import { useAccount, useToken } from 'wagmi';
import { tokenForContract } from '../../config/profilePageSetting';
import useDomainValue from '../../hooks/useDomainValue';
import useWriteContract from '../../hooks/useWriteContract';

const TitleText = styled(Typography)(() => ({
	fontSize: '16px',
	fontWeight: 800,
	color: '#333',
}));

const IconTips = styled(ErrorOutlineIcon)(() => ({
	color: '#333',
	fontSize: '20px',
}));

const PriceModule = ({ domain }) => {
	const { address } = useAccount();
	const [impermanent, setImpermanent] = useState(false);

	const changeImpermant = useCallback((impermanent) => {
		setImpermanent(impermanent);
	}, []);
	const tokens = useGetTokens({
		tldName: domain,
	});
	const { isPermanemt, prices, condition } = useDomainPrice({
		impermanent,
		tldName: domain,
	});

	const { data: decData } = useToken({ address: tokenForContract['USDT'] });
	const dec = useMemo(() => decData?.decimals, [decData]);

	const [value, setValue] = useState(null);

	const changeDomain = useCallback((d) => {
		setValue(d.get('USDT'));
	}, []);

	const { domainValue, decDomainValue } = useDomainValue({
		tokens,
		prices,
		dec,
		value,
	});

	const [receiving, setReceiving] = useState(null);

	const receivingAddress = useMemo(
		() => receiving || address,
		[receiving, address]
	);

	const onChangeReceivingAddress = useCallback((adr) => {
		setReceiving(adr);
	}, []);

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'setTld',
		args: [
			domain,
			receivingAddress,
			condition,
			decDomainValue,
			[tokenForContract['USDT']],
			!impermanent,
		],
		enabled: !!domain,
	});

	return (
		<Stack direction="column">
			<SettingPart
				domainValue={domainValue}
				settingType={2}
				impermanent={!isPermanemt}
				isSuccess={isSuccess}
				isLoading={isLoading}
				onChange={changeDomain}
				changeReceivingAddress={onChangeReceivingAddress}
				onChangeImpermanent={changeImpermant}
			/>
			<Box sx={{ mt: 4 }}>
				<TitleText>Token Airdrop Module(Coming soon)</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography>Module Switch:</Typography>
					<Switch disabled />
					<IconTips />
				</Stack>
			</Box>
			<Box sx={{ mt: 4 }}>
				<TitleText>Invitation Module(Coming soon)</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography>Module Switch:</Typography>
					<Switch disabled />
					<IconTips />
				</Stack>
			</Box>
			<Box sx={{ mt: 4 }}>
				<TitleText>DNS Subdomain Allocation</TitleText>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Input
						disabled
						value={domain}
						sx={{ minWidth: 90, width: 90 }}
						disableUnderline={true}
					/>
					<Typography>.reflectdomains.io</Typography>
				</Stack>
			</Box>
			<Stack sx={{ mt: 6, mb: 3 }} direction="row" justifyContent="center">
				<LoadingButton variant="contained">Updata</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default memo(PriceModule);
