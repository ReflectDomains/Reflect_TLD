import { useContractRead } from 'wagmi';
import { tldABI } from '../config/ABI';
import { tldContract } from '../config/contract';
import { getNameHash } from '../utils';

const useGetTokens = ({ tldName = '' }) => {
	const { data: tokens } = useContractRead({
		abi: tldABI,
		address: tldContract,
		functionName: 'getSupportedPayment',
		enabled: !!tldName,
		args: [getNameHash(tldName)],
	});
	return tokens;
};

export default useGetTokens;
