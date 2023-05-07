import { Stack, Typography, Input, styled } from '@mui/material';
import { memo } from 'react';

const Label = styled(Typography)(() => ({}));

const StepTwo = ({ value = '' }) => {
	return (
		<Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
			<Label>DNS Subdomain Allocation:</Label>
			<Input
				sx={{ minWidth: 90, width: 90 }}
				value={value}
				disableUnderline={true}
				readOnly
			/>
			<Label>.reflectdomains.io</Label>
		</Stack>
	);
};

export default memo(StepTwo);
