/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: '0.8.9',
		defaultNetwork: 'polygon_mumbai',
		networks: {
			hardhat: {},
			polygon_mumbai: {
				url: 'https://mumbai.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a',
				accounts: [process.env.PRIVATE_KEY],
			},
		},
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
