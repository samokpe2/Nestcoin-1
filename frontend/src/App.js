import React from 'react'
import Dashboard from './components/home/home'
import Navbar from './components/navbar/navbar'
import Rewards from './components/Reward/Reward'
import './App.css'
import Movies from './pages/customer/Movies'
import AddAdmin from './components/AddAdmin/AddAdmin'
import RemoveAdmin from './components/RemoveAdmin/RemoveAdmin'
import SelfDestruct from './components/Destruct/Destruct'
import {networks} from './network';
import { useState, useEffect } from 'react'
import abi from './utils/Nestdrop.json'
import { ethers } from 'ethers'




const App = () => {

  const [isAuthenticated, setAuthenticated] = useState(false);

  const contractAddress = "0x893dBc6F19de9Fc46B5E80Ca870EfFC82082a5DD";

  const[account, setAccount] = useState(null);
  const [network, setNetwork] = useState('');

  const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}
		
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setAccount(account);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      
      const tx = await contract.admins(accounts[0]);
      
      console.log(tx);
      if(tx){
        setAuthenticated(true)
      }else{
        setAuthenticated(false)
      }

		} else {
			setAccount(null)
      setAuthenticated(false)
			console.log('No authorized account found');
      
		}
		
		// This is the new part, we check the user's network chain ID
		const chainId = await ethereum.request({ method: 'eth_chainId' });
		setNetwork(networks[chainId]);

		ethereum.on('chainChanged', handleChainChanged);
		
		// Reload the page when they change networks
		function handleChainChanged(_chainId) {
			window.location.reload();
		}

		ethereum.on('accountsChanged', handleWalletDisconnection);

    function handleWalletDisconnection(accounts){
		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			setAccount(null)
			window.location.reload();
		  } else{
			setAccount(accounts[0]);
			// Do any other work!

		  }
      
	  
    }

    
       



       
        
      


	};

  useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

  return (
    <>
    <div className="App">
    {
      isAuthenticated ? (
        <>
         <div className="gradient__bg">
         <Navbar />
    <Dashboard />
    <Rewards />
    <AddAdmin />
    <RemoveAdmin />
    <SelfDestruct />
    </div>
    </>
      ) : (
      <div>
        <Navbar />
        <Movies />
    </div>
      )}
    </div>
    
    </>
  )
}

export default App

// login using metamask, admin dashboard , remove and add admins 
// live update of tokens sent