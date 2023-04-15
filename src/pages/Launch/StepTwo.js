import { Stack, Typography, Input, styled } from '@mui/material';
import { memo } from 'react';

const Label = styled(Typography)(() => ({}));

const StepTwo = () => {
	return (
		<Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
			<Label>DNS Subdomain Allocation:</Label>
			<Input
				sx={{ minWidth: 90, width: 90 }}
				value={''}
				disableUnderline={true}
				// onChange={(e) => changeIncreaseValue.bind(this, e, 1)}
			/>
			<Label>.reflect.io</Label>
		</Stack>
	);
};

export default memo(StepTwo);
