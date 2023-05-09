import { Stack } from '@mui/material';
import SearchInput from '../../../components/SearchInput';
import { memo, useCallback, useMemo, useState } from 'react';
import CollapseItem from './CollapseItem';
import { useSelector } from 'react-redux';

const LTDS = () => {
	const [selected, setSelected] = useState('');
	const { tld } = useSelector((state) => ({
		tld: state.reflect_loginInfo.tld,
	}));
	const onChangeSelect = useCallback((item) => {
		setSelected(item);
	}, []);

	const tldNameWithPointer = useMemo(
		() =>
			(tld && [
				{
					show: `.${tld}`,
					tld,
				},
			]) ||
			[],
		[tld]
	);

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
			{tldNameWithPointer.map((item) => (
				<CollapseItem
					key={item.tld}
					item={item.show}
					tld={item.tld}
					selected={selected === item.tld}
					onClick={onChangeSelect.bind(this, item.tld)}
				/>
			))}
		</Stack>
	);
};

export default memo(LTDS);
