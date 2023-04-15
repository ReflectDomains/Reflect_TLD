import {
	Box,
	Stack,
	Typography,
	styled,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useState } from 'react';
import LineBarChart from './LineBarChart';

const StatisticsWrapper = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: theme.spacing(1),
}));

const dates = ['24H', '7D', '30D', 'ALL'];

const Portfolio = () => {
	const [times, setTimes] = useState('ALL');

	const handleChangeDate = useCallback((event, nextView) => {
		setTimes(event.target.value);
	}, []);

	return (
		<>
			<StatisticsWrapper mt={2}>
				<StatisticsCard type="domain" />
			</StatisticsWrapper>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={3}
			>
				<Typography
					sx={(theme) => ({
						fontSize: '16px',
						color: theme.color.text,
					})}
				>
					Domain Registration Overview
				</Typography>
				<ToggleButtonGroup
					sx={{
						height: '37px',
					}}
					value={times}
					onChange={handleChangeDate}
				>
					{dates.map((item) => (
						<ToggleButton value={item} key={item}>
							{item}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Stack>

			<LineBarChart />
		</>
	);
};

export default Portfolio;
