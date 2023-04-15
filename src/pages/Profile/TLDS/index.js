import { Stack } from '@mui/material';
import SearchInput from '../../../components/SearchInput';
import { memo, useCallback, useState } from 'react';
import CollapseItem from './CollapseItem';
const domainSetting = ['.city', '.bit', '.uni'];

const LTDS = () => {
	const [selected, setSelected] = useState('');
	const onChangeSelect = useCallback((item) => {
		setSelected(item);
	}, []);
	return (
		<Stack direction="column">
			<Stack direction="row" justifyContent="flex-end">
				<SearchInput
					width={400}
					inputsx={{
						backgroundColor: '#F2F4F5',
						fontSize: '16px',
					}}
					placeholder="Search for top-level domain"
					sx={{ mt: 2 }}
				/>
			</Stack>
			{domainSetting.map((item) => (
				<CollapseItem
					key={item}
					item={item}
					selected={selected === item}
					onClick={onChangeSelect}
				/>
			))}
		</Stack>
	);
};

export default memo(LTDS);
