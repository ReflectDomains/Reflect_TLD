import { Stack } from '@mui/material';
import { memo } from 'react';
import CircleStep from '../../components/CircleStep';
import { TypographySubtitle } from '.';

const StepAndCircleProcess = ({ step }) => {
	return (
		<>
			<CircleStep step={step} total={2} />
			<Stack
				direction="row"
				alignItems="center"
				sx={{
					mt: '10px',
					mb: '20px',
				}}
			>
				<TypographySubtitle
					sx={(theme) => ({
						fontSize: '16px',
						mr: theme.spacing(1),
					})}
				>
					{step === 1 ? 'Pricing Module' : 'DNS Subdomain Allocation'}
				</TypographySubtitle>
			</Stack>
		</>
	);
};

export default memo(StepAndCircleProcess);
