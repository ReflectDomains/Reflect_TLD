import { Box, Stack, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useCallback, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import LastStep from './LastStep';
import StepAndCircleProcess from './StepAndCircleProcess';

export const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
	fontSize: '20px',
	color: theme.typography.caption.color,
	fontWeight: 800,
	...sx,
}));

export const TypographyInfo = styled(Typography)(({ theme, sx }) => ({
	fontSize: '16px',
	color: theme.typography.caption.color,
	fontWeight: 500,
	...sx,
}));

const Launch = () => {
	const params = useParams();
	const [step, setStep] = useState(1);

	const nextPage = useCallback(() => {
		if (step + 1 <= 3) {
			setStep(parseInt(step + 1));
		}
	}, [step]);

	const backToAfterStep = useCallback(() => {
		if (step - 1 > 0) {
			setStep(parseInt(step - 1));
		}
	}, [step]);

	return (
		<Box>
			<CommonPage title="Launch">
				<TypographySubtitle>Basic Info</TypographySubtitle>
				<TypographyInfo sx={{ mt: '10px' }}>
					Top-level domain: {params?.name}
				</TypographyInfo>
				<TypographyInfo sx={{ mt: '10px' }}>Status: available</TypographyInfo>
				<TypographySubtitle sx={{ marginTop: '30px' }}>
					Process
				</TypographySubtitle>
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: '10px',
					}}
				>
					{step <= 2 ? <StepAndCircleProcess step={step} /> : <LastStep />}
				</Stack>
				{step <= 2 ? (
					<Box
						sx={{
							backgroundColor: step < 4 ? '#F7F7F7' : '#fff',
							borderRadius: '10px',
							width: '100%',
							padding: '20px',
						}}
					>
						{step === 1 ? <StepOne /> : step === 2 ? <StepTwo /> : null}
					</Box>
				) : null}
				{step <= 2 ? (
					<Stack
						flexDirection="row"
						justifyContent="center"
						sx={{ mt: '20px' }}
					>
						{step > 1 ? (
							<LoadingButton
								variant="outlined"
								onClick={backToAfterStep}
								sx={(theme) => ({
									mr: theme.spacing(2),
								})}
							>
								Back
							</LoadingButton>
						) : null}
						<LoadingButton variant="contained" onClick={nextPage}>
							Next
						</LoadingButton>
					</Stack>
				) : null}
			</CommonPage>
		</Box>
	);
};

export default memo(Launch);
