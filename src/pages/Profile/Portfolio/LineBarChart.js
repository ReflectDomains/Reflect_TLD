import ReactEcharts from 'echarts-for-react';
import { memo } from 'react';

const LineBarChart = () => {
	const colors = ['#41BF82'];
	const option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		grid: {
			right: '20%',
		},
		legend: {
			data: ['USDT'],
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true,
				},
				// prettier-ignore
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			},
		],
		yAxis: [
			{
				type: 'value',
				name: 'USDT',
				position: 'left',
				alignTicks: true,
				axisLine: {
					show: false,
					lineStyle: {
						color: '#333',
					},
				},
				axisLabel: {
					formatter: '{value}$',
				},
			},
		],
		series: [
			{
				name: 'USDT',
				type: 'bar',
				data: [
					2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
				],
			},
		],
	};

	return (
		<ReactEcharts
			option={option}
			style={{ height: '400px', marginTop: '20px' }}
		/>
	);
};

export default memo(LineBarChart);
