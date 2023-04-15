import { memo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';

const StepOne = () => {
	const [isSubmit] = useState(false);

	return (
		<>
			<ManageDomain isSuccess={isSubmit} />
		</>
	);
};

export default memo(StepOne);
