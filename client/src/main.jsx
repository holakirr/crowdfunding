import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThirdwebProvider activeChain='mumbai'>
		<Router>
			<StateContextProvider>
				<App />
			</StateContextProvider>
		</Router>
	</ThirdwebProvider>,
);
