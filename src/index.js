import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiClient } from './config/client';

import './index.less';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-step-progress-bar/styles.css';
import AuthRouter from './provider/AuthRouter';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains}>
						<AuthRouter>
							<App />
						</AuthRouter>
					</RainbowKitProvider>
				</WagmiConfig>
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
);
