import { Collapse, Box, Stack, Typography } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PriceModule from '../../../components/ManageDomain/PriceModule';

const CollapseItem = ({ item, tld, selected, onClick }) => {
	const [show, setShow] = useState(false);
	const hiddenDomain = useCallback(() => {
		setShow(false);
	}, []);

	const chooseDomain = useCallback(() => {
		setShow(true);
		onClick && onClick(tld);
	}, [onClick, tld]);

	return (
		<Box
			sx={(theme) => ({
				padding: `0 ${theme.spacing(2)}`,
				backgroundColor: show && selected ? '#F2F4F5' : '#fff',
				mt: 2,
				borderRadius: '10px',
			})}
		>
			<Stack
				key={item}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{
					height: '60px',
					backgroundColor: show && selected ? '#F2F4F5' : '#fff',
				}}
			>
				<Typography>{item}</Typography>
				{show && selected ? (
					<Box
						onClick={hiddenDomain}
						sx={{ cursor: 'pointer', padding: '0 20px' }}
					>
						<KeyboardArrowUpIcon />
					</Box>
				) : (
					<Typography
						onClick={chooseDomain}
						color="primary"
						sx={{ cursor: 'pointer' }}
					>
						Management
					</Typography>
				)}
			</Stack>

			<Collapse in={show && selected}>
				<PriceModule domain={tld} />
			</Collapse>
		</Box>
	);
};

export default memo(CollapseItem);
