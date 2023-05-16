import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { createContext, useContext, useMemo } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const { contract } = useContract('0xa8200f4d6a483A81AFdc06d0a48703A0eb81AeBd');
	const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
	const address = useAddress();
	const connect = useMetamask();
	const publishCampaign = async form => {
		try {
			const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target, // target
					new Date(form.deadline).getTime(), // deadline
					form.image, // image
				],
			});

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	const providerValue = useMemo(
		() => ({ address, contract, createCampaign: publishCampaign, connect }),
		[address, contract, publishCampaign, connect],
	);

	return <StateContext.Provider value={providerValue}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
