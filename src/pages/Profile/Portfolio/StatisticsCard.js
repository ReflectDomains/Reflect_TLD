import { Box, Paper, Typography, styled } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { formateNumber } from '../../../utils';

const Wrapper = styled(Paper)(({ theme }) => ({
	borderRadius: '',
	padding: theme.spacing(1),
	height: 118,
	boxShadow:
		'0px 14px 28px -80px rgba(23, 12, 86, 0.02), 8px 0px 33px rgba(30, 21, 81, 0.05)',
}));

const Price = styled(Typography)(({ theme }) => ({
	fontWeight: 800,
	textAlign: 'center',
	marginTop: theme.spacing(3),
}));

const Des = styled(Typography)(({ theme }) => ({
	fontSize: '10px',
	textAlign: 'center',
	color: theme.color.mentionColor,
	marginTop: theme.spacing(0.5),
	whiteSpace: 'nowrap',
}));

const DataWrapper = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	gap: theme.spacing(1),
}));

const StatisticsCard = () => {
	const { profileInfo } = useSelector((state) => ({
		profileInfo: state.reflect_loginInfo,
	}));

	return (
		<Wrapper>
			<DataWrapper spacing={1}>
				<Box>
					<Price>{`$${formateNumber(profileInfo.usd_revenue, 2)} USD`}</Price>
					<Des>Total registration fee revenue</Des>
				</Box>
				<Box>
					<Price>{profileInfo.total_registration}</Price>
					<Des>Total domain registrations</Des>
				</Box>
			</DataWrapper>
		</Wrapper>
	);
};

export default memo(StatisticsCard);
