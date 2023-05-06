import {
	Box,
	Popper,
	Input,
	List,
	ListItem,
	Stack,
	Typography,
	styled,
	Fade,
	debounce,
	CircularProgress
} from '@mui/material';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { handleTldName } from '../../utils';

const SearchWrapper = styled(Box)(({ width }) => ({
	width: width,
}));

const Search = styled(Input)(({ inputsx }) => ({
	width: '100%',
	height: '44px',
	border: 'none',
	background: '#fff',
	borderRadius: '10px',
	':hover,': {
		border: 'none',
	},

	'&.Mui-focused': {
		border: 'none',
	},
	...inputsx,
}));

const ClearButton = styled(CloseIcon)(() => ({
	fontSize: '24px',
	cursor: 'pointer',
}));

const PopoverList = styled(List)(({ theme, width }) => ({
	background: '#fff',
	borderRadius: theme.spacing(1),
	marginTop: theme.spacing(1),
	width: width - 20,
}));

const PopoverListItem = styled(ListItem)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	cursor: 'pointer',
}));

const ListItemTitle = styled(Typography)(() => ({
	fontWeight: 800,
}));

const RegisterStatus = styled(Box)(({ theme, ...props }) => ({
	borderRadius: '50px',
	backgroundColor:
		props.status === 'Registered'
			? theme.color.success + '1a'
			: props.status === 'Available'
			? theme.color.main + '1a'
			: theme.color.error + '1a',

	color:
		props.status === 'Registered'
			? theme.color.success
			: props.status === 'Available'
			? theme.color.main
			: theme.color.error,
	padding: theme.spacing(0.5, 1),
	fontSize: '14px',
	fontWeight: 700,
}));

// const list = [
// 	{
// 		name: '.city',
// 		status: 'Registered',
// 	},
// 	{
// 		name: '.bit',
// 		status: 'Available',
// 	},

// 	{
// 		name: '.uni',
// 		status: 'Unsupported',
// 	},
// ];

const SearchInput = ({
	onChange,
	sx = {},
	inputsx = {},
	placeholder = '',
	width = '600',
	onInput,
}) => {
	const boxRef = useRef(null);
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);

	const canBeOpen = isOpen && Boolean(anchorEl);
	const id = canBeOpen ? 'spring-popper' : undefined;

	const handleClick = (status) => {
		setAnchorEl(boxRef?.current);
	};

	// eslint-disable-next-line
	const debounceInputChange = useCallback(debounce(onInput, 500), []);

	const handleChange = useCallback(
		(e) => {
			const value = e.target.value;
			setSearchValue(value);
			if (!isOpen) setOpen(true);
			if (!value && isOpen) setOpen(false);
			debounceInputChange(value);
		},
		[debounceInputChange, isOpen]
	);

	const list = useMemo(() => searchValue ? [{name: searchValue, status: 'loading'}]: [], [searchValue])

	const clearSearchValue = useCallback(() => {
		setSearchValue('');
	}, []);

	const chooseDomain = useCallback(
		(status) => {
			onChange && onChange(status);
		},
		[onChange]
	);

	return (
		<SearchWrapper
			aria-describedby={id}
			ref={boxRef}
			sx={{ ...sx }}
			width={width}
		>
			<Search
				value={searchValue}
				placeholder={placeholder}
				disableUnderline={true}
				startAdornment={<SearchIcon sx={{ marginRight: '10px' }} />}
				endAdornment={
					searchValue ? (
						<ClearButton
							onClick={() => {
								clearSearchValue();
							}}
						/>
					) : null
				}
				onFocus={handleClick.bind(this, true)}
				onChange={handleChange}
				onBlur={handleClick.bind(this, false)}
				inputsx={{ ...inputsx }}
			/>
			<Popper
				id={id}
				open={isOpen}
				anchorEl={anchorEl}
				transition
				placement="bottom-start"
				sx={{ zIndex: 10000 }}
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<PopoverList width={width}>
							{list.length > 0 && list.map((item) => (
								<PopoverListItem
									key={item.name}
									onClick={chooseDomain.bind(this, item)}
								>
									<ListItemTitle>{handleTldName(item.name)}</ListItemTitle>
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="center"
										spacing={1}
									>
										{
											item.status === 'loading' ? <CircularProgress size={14} thickness={7} /> : (
												<>
													<RegisterStatus status={item.status}>
														{item.status}
													</RegisterStatus>
													<ChevronRightIcon
														sx={(theme) => ({ color: theme.color.mentionColor })}
													/>
												</>
											)
										}
										
									</Stack>
								</PopoverListItem>
							))}
						</PopoverList>
					</Fade>
				)}
			</Popper>
		</SearchWrapper>
	);
};

export default memo(SearchInput);
