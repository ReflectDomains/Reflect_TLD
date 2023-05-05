import { Stack, Typography, styled } from '@mui/material';
import PopularDomainCard from './PopularDomainCard';
import avatar from '../../assets/images/avatar.png';
import SearchInput from '../../components/SearchInput';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Title = styled(Typography)(() => ({
	fontSize: '36px',
	fontWeight: 800,
	textAlign: 'center',
	marginTop: '20vh',
}));

const PopularDomainsText = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	fontSize: '28px',
	fontWeight: 800,
	marginTop: theme.spacing(10),
}));

const Home = () => {
	const navigate = useNavigate();
	const chooseDomain = useCallback(
		(item) => {
			if (item.status === 'Available') {
				navigate(`/launch/${item.name}`);
			}
		},
		[navigate]
	);
	const inputSearchValue = useCallback((v) => {
		console.log(v, 'vv');
	}, []);
	return (
		<>
			<Title>
				One click to launch your own Top <br /> Level Domain.
			</Title>

			<Stack alignItems="center" sx={(theme) => ({ mt: theme.spacing(6) })}>
				<SearchInput
					width={600}
					onChange={chooseDomain}
					placeholder="Search for top-level domain / domain name"
					onInput={inputSearchValue}
				/>
			</Stack>

			<PopularDomainsText>🔥 Recommended TLDs</PopularDomainsText>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={5}
			>
				<PopularDomainCard avatar={avatar} name="jassen.eth" cup={'🥇'} />
				<PopularDomainCard avatar={avatar} name="meta.eth" cup={'🥈'} />
				<PopularDomainCard avatar={avatar} name="reflect.eth" cup={'🥉'} />
				<PopularDomainCard avatar={avatar} name="sns.eth" />
			</Stack>
		</>
	);
};

export default Home;
