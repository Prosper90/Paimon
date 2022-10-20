import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import 'bootstrap/dist/css/bootstrap.css';
import Contexts from './context/contextclass';
import Notifier from './Notifier';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';




export default function Search() {

  const [becomeworker, setBecomewoker] = useState(false);
  const { address } = useContext(Contexts);
  //notification
  const [bg, setbg] = useState();
  const [message, setMessage] = useState();
  const [mini, setMini] = useState();
  const [show, setShow] = useState(false);
  const router = useRouter();


  const toggleShowA = () => {
    setShow(!show);
   }



  const openWorker = () => {

    setBecomewoker(!becomeworker);

  }



  //register a worker
  const registeruser = async (e) => {
    e.preventDefault();
    const jobskillset = e.target.jobskill.value;

    //make sure wallet is connected
    if(!address) {
      setbg("warning");
      setMessage("Connect wallet to proceed");
      setMini("failed");
      setShow(true);
      return;
    }


    //check that jobskill is not empty
    if(jobskillset == "") {
      setbg("warning");
      setMessage("Jobskill should not be empty");
      setMini("failed");
      setShow(true);
      return;
    }



    //check if user already exists
    const  checkifuserexist = await fetch(`https://paimon-backend.herokuapp.com/user/${address}`, { method: 'GET' })
    const checkseller = await checkifuserexist.json();

    if(checkseller.user !== null) {
      setbg("warning");
      setMessage("Worker already registered");
      setMini("User exists");
      setShow(true);
      return;
    }



    //create a worker
    const createuserbuyer = await fetch(`https://paimon-backend.herokuapp.com/user`, 
        {
            method: 'POST',   
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: "Worker", address: address,  jobskill: jobskillset, revenue: 0 })
        }
    );
      await createuserbuyer.json();



      setbg("success");
      setMessage("Registered as worker");
      setMini("success");
      setShow(true);
      return;

  }



  //Find an address 
  const findworker = async (e) => {
    e.preventDefault();
    const workeraddress = e.target.workeraddress.value;
    const checkAddress = ethers.utils.isAddress(workeraddress);



    //make sure wallet is connected
    if(!address) {
      setbg("warning");
      setMessage("Connect wallet to proceed");
      setMini("failed");
      setShow(true);
      return;
    }

    //make sure worker address is not empty 
    if(workeraddress == "") {
      setbg("warning");
      setMessage("Address should not be empty");
      setMini("failed");
      setShow(true);
      return;
    }


    //check that jobskill is not empty
    if(!checkAddress) {
      setbg("warning");
      setMessage("Address is not correct");
      setMini("failed");
      setShow(true);
      return;
    }



    //check if user already exists
    const  checkifworkerexist = await fetch(`https://paimon-backend.herokuapp.com/user/${workeraddress}`, { method: 'GET' })
    const check = await checkifworkerexist.json();

    if(check.user == null) {
      setbg("warning");
      setMessage("Worker does not exist");
      setMini("Address is not registered");
      setShow(true);
      return;
    }

    router.push("/worker/"+workeraddress);

  }






  return (

    <div action="#">

          <div className={styles.notifyhead}> 
              <Notifier show={show} bg={bg} message={message} mini={mini} toggleShowA={toggleShowA} /> 
          </div>

        <div class="registration-form">
            <div class="row g-0">


              <form className={styles.formsearch} onSubmit={findworker}>
 
                  <div className={styles.inputcontain} >
                      <div class="d-flex justify-content-start align-items-center ">
                          <SearchIcon />
                          <input type="search" name="workeraddress" id="job-title" className={styles.input} placeholder="Search for worker..." />
                      </div>
                  </div>

              </form>


        <div className={styles.containsecondform} >

              { becomeworker &&

                    <div class="col-md-4">
                        <div class="filter-search-form mt-3 mt-md-0">

                            <form className={styles.secondForm} data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onSubmit={registeruser}>

                                 <input type="search" name="jobskill" id="job-title" className={styles.secondinput} placeholder=" Input your job skill" />
                                <div className={styles.buttoncontainer}>
                                  <button className="btn btn-primary" type='submit' >Submit</button>
                                </div>
                                
                            </form>
                            
                        </div>
                    </div>

                  }

                  <div class="col-md-12 col-xl-4">
                      
                      <div className={styles.somecontain} >

                          <button class="btn btn-primary submit-btn w-50" type="submit" onClick={openWorker} >
                            <i class="uil uil-search me-1"></i> 
                                Become a worker 
                            </button>

                        </div>

                  </div>


              </div>



            </div>
        </div>
    </div>

  )
}
