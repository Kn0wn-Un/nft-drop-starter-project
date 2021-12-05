import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null);

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom wallet found!');

					const resp = await solana.connect({ onlyIfTrusted: true });
					console.log(resp.publicKey.toString());
					setWalletAddress(resp.publicKey.toString());
				}
			} else {
				console.log('Solana object not found. Get Phanthom wallet!');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const connectWallet = async () => {
		const { solana } = window;
		if (solana) {
			const resp = await solana.connect();
			console.log('Connected to:', resp.publicKey.toString());
			setWalletAddress(resp.publicKey.toString());
		}
	};

	const renderNotConnected = () => (
		<button
			className="cta-button connect-wallet-button"
			onClick={connectWallet}
		>
			Connect Wallet
		</button>
	);

	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected();
		};
		window.addEventListener('load', onLoad);
		return () => window.removeEventListener('load', onLoad);
	}, []);

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
					{!walletAddress && renderNotConnected()}
				</div>
				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built on @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
