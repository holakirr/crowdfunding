import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

function Profile() {
	const [isLoading, setIsLoading] = useState(false);
	const [campaigns, setCampaigns] = useState([]);

	const { address, contract, getUserCampaigns } = useStateContext();
	const fetchCampaigns = async () => {
		setIsLoading(true);
		try {
			const data = await getUserCampaigns();
			setCampaigns(data);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		address && contract && fetchCampaigns();
	}, [address, contract]);

	return <DisplayCampaigns isLoading={isLoading} campaigns={campaigns} title='Your Campaigns' />;
}

export default Profile;
