import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [campaigns, setCampaigns] = useState([]);

	const { address, contract, getCampaigns } = useStateContext();
	const fetchCampaigns = async () => {
		setIsLoading(true);
		try {
			const data = await getCampaigns();
			setCampaigns(data);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		address && contract && fetchCampaigns();
	}, [address, contract]);

	return <DisplayCampaigns isLoading={isLoading} campaigns={campaigns} title='Campaigns' />;
}

export default Home;
