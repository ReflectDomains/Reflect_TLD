import { Stack, Box } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { memo } from 'react';
import { LoadingButton } from '@mui/lab';

import { TypographyInfo } from '../../pages/Launch';
import SettingPart from './SettingPart';

const ManageDomain = ({ isSuccess = false }) => {
	return (
		<>
			<SettingPart />
			{isSuccess ? (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={(theme) => ({ mb: theme.spacing(2), mt: 3 })}
				>
					<TypographyInfo
						sx={(theme) => ({
							color: theme.color.success,
							fontWeight: 800,
							mr: theme.spacing(1),
						})}
					>
						Setting successful
					</TypographyInfo>
					<CheckCircleRoundedIcon
						sx={(theme) => ({
							color: theme.color.success,
							fontSize: '15px',
						})}
					/>
				</Stack>
			) : (
				<Box sx={{ mt: 3 }}>
					<LoadingButton sx={{ width: '85px' }} variant="contained">
						Confirm
					</LoadingButton>
				</Box>
			)}
		</>
	);
};

export default memo(ManageDomain);
