import { Stack, Typography, styled } from '@mui/material';
import PopularDomainCard from './PopularDomainCard';
import avatar from '../../assets/images/avatar.png';
import SearchInput from '../../components/SearchInput';

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
	return (
		<>
			<Title>
				One click to launch your own Top <br /> Level Domain.
			</Title>

			<Stack alignItems="center" sx={(theme) => ({ mt: theme.spacing(6) })}>
				<SearchInput />
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
