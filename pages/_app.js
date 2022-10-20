import '../styles/globals.css';
import '../styles/dashboard.css';
import '../styles/company.css';
import Contexts from '../components/context/contextclass';
import React, {useState, useEffect} from 'react';

function MyApp({ Component, pageProps }) {

  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});
  const [tokenBalance, setTokenbalance] = useState("0");

  return ( 
            <Contexts.Provider value = { {  address, setAddress, provider, setProvider, tokenBalance, setTokenbalance } }>
                <Component {...pageProps} />
            </Contexts.Provider>
          )
}

export default MyApp
