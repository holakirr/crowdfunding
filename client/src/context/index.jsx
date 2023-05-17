import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { createContext, useContext, useMemo } from 'react';
import { ethers } from 'ethers';

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
	const getCampaigns = async () => {
		try {
			const campaigns = await contract.call('getCampaigns');
			const parsedCampaigns = campaigns.map(
				({ owner, title, description, target, deadline, amountCollected, image }, i) => ({
					owner: owner,
					title: title,
					description: description,
					target: ethers.utils.formatEther(target.toString()),
					deadline: deadline.toNumber(),
					amountCollected: ethers.utils.formatEther(amountCollected.toString()),
					image: image,
					pId: i,
				}),
			);
			return parsedCampaigns;
		} catch (error) {
			console.log(error);
		}
	};

	const getUserCampaigns = async () => {
		try {
			const campaigns = await getCampaigns();
			const filteredCampaigns = campaigns.filter(campaign => campaign.owner === address);
			return filteredCampaigns;
		} catch (error) {
			console.log(error);
		}
	};

	const donate = async (pId, amount) => {
		try {
			const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getDonators = async pId => {
		try {
			const donations = await contract.call('getDonators', [pId]);
			const numberOfDonations = donations[0].length;

			const parsedDonations = [];

			for (let i = 0; i < numberOfDonations; i++) {
				parsedDonations.push({
					donator: donations[0][i],
					donationAmount: ethers.utils.formatEther(donations[1][i].toString()),
				});
			}

			return parsedDonations;
		} catch (error) {
			console.log(error);
		}
	};

	const providerValue = useMemo(
		() => ({
			address,
			contract,
			createCampaign: publishCampaign,
			connect,
			getCampaigns,
			getUserCampaigns,
			donate,
			getDonators,
		}),
		[address, contract, publishCampaign, connect, getCampaigns, getUserCampaigns, donate, getDonators],
	);

	return <StateContext.Provider value={providerValue}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
