import React, { useEffect, useContext, useState } from 'react';
import styles from '../styles/Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import GridViewIcon from '@mui/icons-material/GridView';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import Search from "./Search";
import Contexts from './context/contextclass';
import { shortenAddress } from './utils/trauncate';
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { chainID, currencytokenABI, currencyTokenaddress } from "./utils/constants";
import { useRouter } from 'next/router';
import Notifier from './Notifier';






export default function Header() {

  const [workersearch, setWorkersearch] = useState(false);
  const [menuToggle, setMenutoggle] = useState(false);
  const { address, setAddress, provider, setProvider, tokenBalance, setTokenbalance } = useContext(Contexts);
  const [windoweth, setWindoweth] = useState();
  const router = useRouter();
  const [bg, setbg] = useState();
  const [message, setMessage] = useState();
  const [mini, setMini] = useState();
  const [show, setShow] = useState(false);
  //get if the particuar user is registered
  const [checkuser, setCheckuser] = useState();



  const togglemenu = () => {
    console.log("Just clicked");
    setMenutoggle(!menuToggle);
  }


   



    //set provider pc 
    const setProviderWindow = async () => {
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(temporalProvider);
      }

    
    const getUser = async () => {
        const options = {method: 'GET'};

        const res = await fetch(`https://paimon-backend.herokuapp.com/user/${address}`, options)
        const user = await res.json();
        setCheckuser( await user.user);
    }
    
    
    
    
    
        //check for correct chain
    const updateAccountChain = async () => {
    
        console.log("in here");
    
            console.log("called");
    
            await ethereum.request({ method: "eth_requestAccounts" });
    
            const chainId = await provider.getNetwork();
            //console.log(chainId.chainId);
            if (chainId.chainId !== chainID) {
    
              console.log("still trying");
    
              try {
                //switch chain
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [
                    {
                      chainId: `0x${Number(97).toString(16)}`,
                    }],
                });
    
                connectWallet();
                
              } catch (error) {
                if (error === 4902) {
                  //add the token or currency to metamask
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: `0x${Number(97).toString(16)}`,
                        rpcUrls: [
                          " https://data-seed-prebsc-1-s1.binance.org:8545",
                        ],
                        chainName: "BSC testnet",
                        nativeCurrency: {
                          name: "BSC",
                          symbol: "BNB",
                          decimals: 18,
                        },
                        blockExplorerUrls: [
                          "https://explorer.binance.org/smart-testnet",
                        ],
                      },
                    ],
                  });
    
                  connectWallet();
                }
              }
            } else if (chainId.chainId === chainID) {
               console.log("Correct chain");
            }
    
    
      };
    
    
    
    
    
    
    //connect wallet mobile devices
    const connectWalletmobile = async () => {
    
       console.log("Mobile connect here");
    
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              rpc: {
                  56: 'https://bsc-dataseed.binance.org/'
              }, // required
              network: 'binance',
              chainId: 56,
            }
          },
        };
    
    
    
        const web3Modal = new Web3Modal({
          network: "binance", // optional
          cacheProvider: true, // optional
          providerOptions, // required
        });
        
    
        const instance = await web3Modal.connect();
    
        //setgetInstance(instance); for onchange event
        setInstancesetonchange(instance);
    
        const gettingprovider = await new ethers.providers.Web3Provider( instance );
        setProvider(gettingprovider);
    
    
         if(provider) {
    
    
              const signer = await gettingprovider.getSigner();
              const accounts = await signer.getAddress();
    
              setAddress(accounts);
    
         }
    
      }
    
    
    
    
    
    
    //conect wallet pc
      const connectWallet = async () => {
          
          console.log("Caling");
          console.log(provider);
          const chainId = await provider.getSigner().getChainId();
    
            if(provider){
              
    
              if( !address || chainID !== chainId) {
                console.log("run");
                updateAccountChain();
              } 
    
    
              if (chainId === chainID) {
                //console.log("called twice");
                const signer = await provider.getSigner();
                const accounts = await signer.getAddress();
    
                setAddress(accounts);
    
              } else {
                // alert("Wrong Chain Switch");
                updateAccountChain();
              }
    
    
    
    
    
          }
      }




      const gotodashboard = () => {
        
        if(!address) {
            setbg("danger");
            setMessage("Connect wallet to proceed");
            setMini("failed");
            setShow(true);
            return;
        }


        if(checkuser == null) {
            setbg("warning");
            setMessage("Your not a worker nor employer");
            setMini("failed");
            setShow(true);
            return;
        }


        router.push("/dashboard/Dashboard");
  
  
    }



    const toggleShowA = () => {
         setShow(!show);
        }





        useEffect(() => {

            const { ethereum } = window;

           if(window.ethereum) {
              setProviderWindow();
           }

           setWindoweth(window.ethereum);


            getUser();


        }, [address]);





return (

<div className={ workersearch ? styles.headerContainerinc : styles.headerContainer }>

 <div className={styles.notifyhead}> 
     <Notifier show={show} bg={bg} message={message} mini={mini} toggleShowA={toggleShowA} /> 
 </div>

{ !workersearch ?
 
      <header className={styles.head}>
          
        <nav id="" class="topnav-menu navbar navbar-expand-lg navbar-light w-100">

            <div class="container">

                  <div  class="logo navbar-brand">
                      <Link  href="/"><a><h4>Paimon</h4></a></Link>
                  </div>


                  <button aria-controls="topnav-menu-content4" type="button" aria-label="Toggle navigation" class="me-3 navbar-toggler collapsed ms-auto" onClick={togglemenu} >
                    <span class="navbar-toggler-icon"></span>
                  </button>


                  <div class={ !menuToggle ? "navbar-collapse collapse" : "navbar-collapse collapse show w-100" } id="topnav-menu-content4">

                      <ul class=" navbar-nav ms-auto ">

                          <li class="pe-3 nav-item d-flex jusify-content-center align-items-center" >
                              <div  onClick={gotodashboard}  className={styles.dashboardlink} >
                                <a  class="active nav-link">
                                      <div class="d-flex align-items-center">
                                        <span class="icon-xxs me-1 flex-shrink-0"> 
                                            <GridViewIcon /> 
                                        </span>
                                          <div class="flex-grow-1">Dashboard</div>
                                      </div>
                                  </a>
                              </div>
                          </li>

                          <li class="pe-3 nav-item">
                            
                              <Link  href="/workers/Workers"><a data-rr-ui-event-key="/" class="nav-link">
                                      <div class="d-flex align-items-center">
                                      <span class="icon-xxs me-1 flex-shrink-0">  <EngineeringIcon /> </span>
                                          <div class="flex-grow-1">Workers</div>
                                      </div>
                                  </a>
                              </Link>

                          </li>

                          <li class="pe-3 nav-item">

                            <Link  href="/company/Company">
                                <a  data-rr-ui-event-key="/" class="nav-link">
                                  <div class="d-flex align-items-center"><span class="icon-xxs me-1 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" class="feather feather-list icon-dual-dark"><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg></span>
                                      <div class="flex-grow-1">Company</div>
                                  </div>
                                </a>
                            </Link>

                          </li>

                          <li class="pe-3 nav-item">

                            <Link  href="/community/Community">
                                <a data-rr-ui-event-key="/" class="nav-link">
                                    <div class="d-flex align-items-center">
                                        <span class="icon-xxs me-1 flex-shrink-0"> <PeopleIcon /> </span>
                                        <div class="flex-grow-1">Community</div>
                                    </div>
                                </a>
                            </Link>

                          </li>


                      </ul>


                  </div>

                  <div className={styles.signup} onClick={ windoweth ?  connectWallet :  connectWalletmobile } >
                      { address ? shortenAddress(address) : "Connect" }
                  </div>


             </div>

           </nav>


           
       </header>
       

      :


       <header className={styles.headtwo}>
              
          <nav id="" class="topnav-menu navbar navbar-expand-lg navbar-light w-100">

              <div class="container">

                    <div  class="logo navbar-brand">
                        <Link  href="/"><a><h4>Header</h4></a></Link>
                    </div>


                    <button aria-controls="topnav-menu-content4" type="button" aria-label="Toggle navigation" class="me-3 navbar-toggler collapsed ms-auto" onClick={togglemenu} >
                      <span class="navbar-toggler-icon"></span>
                    </button>


           <div className={styles.columnarrange}>

                 <div class={ !menuToggle ? "navbar-collapse collapse" : "navbar-collapse collapse show w-100" } id="topnav-menu-content4">

                    <ul class=" navbar-nav ms-auto ">

                        <li class="pe-3 nav-item">
                            <Link  href="/dashboard/Dashboard"><a  class="active nav-link">
                                    <div class="d-flex align-items-center">
                                    <span class="icon-xxs me-1 flex-shrink-0"> <GridViewIcon /> </span>
                                        <div class="flex-grow-1">Dashboard</div>
                                    </div>
                                </a>
                            </Link>
                        </li>

                        <li class="pe-3 nav-item">
                        
                            <Link  href="/workers/Workers"><a data-rr-ui-event-key="/" class="nav-link">
                                    <div class="d-flex align-items-center">
                                    <span class="icon-xxs me-1 flex-shrink-0">  <EngineeringIcon /> </span>
                                        <div class="flex-grow-1">Workers</div>
                                    </div>
                                </a>
                            </Link>

                        </li>

                        <li class="pe-3 nav-item">

                        <Link  href="/company/Company">
                            <a  data-rr-ui-event-key="/" class="nav-link">
                                <div class="d-flex align-items-center"><span class="icon-xxs me-1 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" class="feather feather-list icon-dual-dark"><g><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></g></svg></span>
                                    <div class="flex-grow-1">Company</div>
                                </div>
                            </a>
                        </Link>

                        </li>

                        <li class="pe-3 nav-item">

                        <Link  href="/community/Community">
                            <a data-rr-ui-event-key="/" class="nav-link">
                                <div class="d-flex align-items-center">
                                    <span class="icon-xxs me-1 flex-shrink-0"> <PeopleIcon /> </span>
                                    <div class="flex-grow-1">Community</div>
                                </div>
                            </a>
                        </Link>

                        </li>


                        </ul>


                    </div>




                    <div className={styles.containform}>
 
                       <Search />

                       <div className={styles.signup} onClick={ windoweth ?  connectWallet :  connectWalletmobile } >
                           { address ? shortenAddress(address) : "Connect" }
                       </div>

                    </div>


            </div>










              </div>

            </nav>

        </header>


    }
{/* End of second section */}




    </div>

  )
}
