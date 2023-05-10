import {
	Stack,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useEffect, useState } from 'react';
import LineBarChart from './LineBarChart';
import { tldChart } from '../../../api/profile';
import { useAccount } from 'wagmi';

const dates = [
	{ period: 'weekly', text: 'Week' },
	{ period: 'monthly', text: 'Month' },
];

const Portfolio = () => {
	const [times, setTimes] = useState('weekly');
	const { address } = useAccount();
	const [chartData, setChartData] = useState([]);

	const handleChangeDate = useCallback((event, newValue) => {
		console.log('newValue:', newValue);
		if (newValue) {
			setTimes(newValue);
		}
	}, []);

	const getChart = useCallback(async () => {
		const resp = await tldChart({
			period: 'weekly',
		});
		if (resp?.code === 0 && resp?.data?.chart) {
			setChartData(resp?.data?.chart);
		}
	}, [times, address]);

	useEffect(() => {
		getChart();
	}, [getChart]);

	return (
		<>
			<StatisticsCard type="domain" />
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
					exclusive
					value={times}
					onChange={handleChangeDate}
				>
					{dates.map((item) => (
						<ToggleButton value={item.period} key={item.period}>
							{item.text}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Stack>

			<LineBarChart data={chartData} type={times} />
		</>
	);
};

export default Portfolio;
