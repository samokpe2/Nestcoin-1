import React from 'react'
import abi from '../../utils/Nestdrop.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './destruct.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function SelfDestruct(){
  const contractAddress = "0x893dBc6F19de9Fc46B5E80Ca870EfFC82082a5DD";

  const [loading, setLoading] = useState(false);

  

  const selfDestruct = async() => {
    setLoading(true)
    try {
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
			  const signer = provider.getSigner();
			  const contract = new ethers.Contract(contractAddress, abi.abi, signer);
        const tx = await contract.kill();
        const receipt = await tx.wait()
        if(receipt.status===1){
          alert('Contract Killed')
          setLoading(false)
        }else{
          alert("Contract was not killed successfully")
          setLoading(false)
        }
      }else{
       alert("You need to connect yoour wallet");
      }
    } catch (error) {
      console.log(error);
      alert("Only Admins can call this function");
    }
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    
      await selfDestruct();
  };

  


    



  return (
    <div className="gpt3__header section__padding"> 
    
     <button id="reward" className="file_button" onClick={handleSubmit} >{loading ? "Loading..." : "Self Destruct"}</button>

    </div>
  )

}






