import Safe, {
    PredictedSafeProps,
    SafeAccountConfig,
    
  } from '@safe-global/protocol-kit'

import { Eip1193Provider, ethers } from 'ethers'
import { EIP1193Provider } from 'viem';


export async function safeDeploy(){
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const ethereum = window.ethereum as unknown as EIP1193Provider;
  const account = await ethereum.request({method: 'eth_requestAccounts'});

  // Set up the Safe deployment configuration
  const safeAccountConfig: SafeAccountConfig = {
    owners: [account[0]],
    //変更した
    threshold: 1
    // More optional properties
  }

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig
    // More optional properties
  }

  const protocolKit = await Safe.init({
    provider: window.ethereum as unknown as Eip1193Provider,
    signer: account[0],
    predictedSafe,
  })

  const safeAddress = await protocolKit.getAddress()
 

  // Deploy the Safe
  /*const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction()
  const client = await protocolKit.getSafeProvider().getExternalSigner()

  if (!client) {
    throw new Error('Client is undefined');
  }

  const transactionHash = await client.sendTransaction({
    to: deploymentTransaction.to,
    value: BigInt(deploymentTransaction.value),
    data: deploymentTransaction.data as `0x${string}`,
    chain: sepolia
  })
  
  console.log('Transaction hash:', transactionHash)
  */
  
  return [...account, safeAddress]
}