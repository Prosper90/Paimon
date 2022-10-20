import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import styles from '../../styles/Dashboaord.module.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Contexts from '../../components/context/contextclass';
import { ethers } from 'ethers';
import { contractaddress, contractABI, chainID } from "../../components/utils/constants";
import { shortenAddress } from '../../components/utils/trauncate';
import Header from '../../components/Header';



export default function Dashboard() {


  const [menuToggle, setMenutoggle] = useState(false);
  const { address, setAddress, provider, setProvider, tokenBalance, setTokenbalance } = useContext(Contexts);
  const [taskCompleted, setTaskcoompeted] = useState("0");
  const [taskinprogress, setTaskinprogress] = useState("0");
  //project stats
  const [projectcompletion, setProjectcompletion] = useState(0);

  //user account
  const [currentuser, setCurrentUser] = useState();


  const getContract = async () => {
    //console.log("bad guy called");
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(contractaddress, contractABI, signer);
}



  const formatDate = (ama) => {
      
    const dateama = new Date( ama );

    const timeString = dateama.toUTCString().split(" ")[4]; //This will return your 17:50:00
    //For the date string part of it
    const dateNumber = dateama.getDate();
    const monthNumber = dateama.getMonth() + 1;
    const yearNumber = dateama.getFullYear();
    const dateString = `${dateNumber}/${monthNumber}/${yearNumber}`;
    const finalDateString = [dateString, timeString].join(" ");
    console.log(finalDateString);
    return finalDateString;
 }





const setTasks = async () => {

    console.log("Called o oo oh oh oh oh");
    const options = {method: 'GET'};

    const res = await fetch(`https://paimon-backend.herokuapp.com/user/${address}`, options)
    const userobject = await res.json();
    console.log(userobject);
    setCurrentUser(userobject.user);

    let completedtasks = 0;
    let incompletetasks = 0;


    if(userobject.user.length == 0) {
        setTaskcoompeted("0");
        setTaskinprogress("0");
    }

    userobject.user.Projects.map((data, index) => {

       if(data.status === "done") {
          completedtasks++;
       } else if(data.status === "pending") {
          incompletetasks++
       }


    })

    setTaskcoompeted(completedtasks);
    setTaskinprogress(incompletetasks);



    const calc = userobject.user.Projects.filter(data => {

        if (data.status == "failed") {
            return true;
        }
        
        return false;
        }).length;


        //setProjectcompletion((calc * 100)/100);

}
  


  const togglemenu = () => {
      console.log("Just clicked");
    setMenutoggle(!menuToggle);
  }



   //get balance
   const getBalance = async () => {

    //check if wallet is connected
     const Contract = await getContract();
     const balance = await Contract.balanceOf(address);
      setTokenbalance(balance);

   };






   useEffect(()=>{

     import("bootstrap/dist/js/bootstrap");

     getBalance();
     setTasks();
     console.log(currentuser);

    }, [])




  return (



    <div className="dashboardcontainer" >

        <Header />

        <section className="position-relative overflow-hidden bg-gradient2 py-3 px-3">
            <div className="container">
                <div className="row">

                </div>
                <div className="row mt-5">
                    <div className="col-lg-5">
                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex">
                                          
                                            <div className="imgcontain">
                                              <img src="/address.png" alt="profile" className="img-fluid avatar-sm rounded-sm me-3" />
                                            </div>

                                            <div className="flex-grow-1">
                                                <h4 className="mb-1 pt-2 mt-0 fs-16">Address. { shortenAddress(address) } </h4>
                                                <p className="text-muted pb-0 fs-14"> { currentuser ? currentuser?.jobskill : currentuser?.jobskill == "employer" && "Full time employer" } </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <ul className="list-inline py-2 border-bottom">
                                    <li className="list-inline-item mb-sm-0 mb-2">
                                        <div className={styles.balancesect} >
                                              <span className="mb-1 mt-0 fs-16" >Balance:</span>
                                               <span> {tokenBalance} Pai</span>
                                       </div>
                                    </li>

                                </ul>
                                <div className="align-items-center pt-1 row">
                                    <div className="col-md-6">
                                        <p className="float-end mb-0">{ taskCompleted/100 }%</p>
                                        <h6 className="fw-medium my-0">Project Completion</h6>
                                        <div className="mt-3 progress" style={{ height: '6px' }}>
                                            <div role="progressbar" className="progress-bar" aria-valuenow="85" aria-valuemin={projectcompletion} aria-valuemax="100" style={{width: projectcompletion }}></div>
                                        </div>
                                    </div>
                                    <div className="mt-md-0 mt-4 col-md-6">
                                        <p className="float-end mb-0">7.5</p>
                                        <h6 className="fw-medium my-0">Overall Rating</h6>
                                        <div className="mt-3 progress" style={{height: '6px' }}>
                                            <div role="progressbar" className="progress-bar bg-orange" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }} ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="bg-soft-success avatar-sm icon icon-xs icon-with-bg rounded-sm me-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-circle icon-dual-success"><g><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></g></svg></div>
                                    <div className="flex-grow-1">
                                        <h3 className="mt-0 mb-0">{ taskCompleted }</h3>
                                        <p className="text-muted mb-0">Tasks Completed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="bg-soft-info avatar-sm icon icon-xs icon-with-bg rounded-sm me-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3 icon-dual-info"><g><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></g></svg></div>
                                    <div className="flex-grow-1">
                                        <h3 className="mt-0 mb-0">{ taskinprogress }</h3>
                                        <p className="text-muted mb-0">Tasks Inprogress</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="mb-1 mt-0 fs-16">Revenue</h4>
                                    </div>
                                    <div className="col-auto">
                                        <div className="dropdown"><a className="btn-link text-muted p-0 dropdown-toggle" id="dropdownMenuLink-1" aria-expanded="false" href="/pages/account/dashboard"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal icon icon-xs"><g><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></g></svg></a></div>
                                    </div>
                                </div>
                                <h1>${ currentuser ? currentuser.revenue : "0" }.00</h1>
                                <p className="text-muted">Week</p>
                                <hr className="mb-1" />
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="me-3 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trending-up text-success"><g><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></g></svg></div>
                                            <div className="flex-grow-1">
                                                <h5 className="mt-0 mb-0">15%</h5>
                                                <p className="text-muted mb-0 fs-13">Prev Week</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="d-flex align-items-center mt-2">
                                            <div className="me-3 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trending-down text-danger"><g><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></g></svg></div>
                                            <div className="flex-grow-1">
                                                <h5 className="mt-0 mb-0">10%</h5>
                                                <p className="text-muted mb-0 fs-13">Prev Month</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col">
                                <h4 className="mb-3 mt-0 fs-16">Projects</h4>
                            </div>
                            
                        </div>


                    {currentuser?.Projects.map((data, index) => { 

                     if(index !== 3) {

                return (  <div className="mb-2 row">
                            <div className="col">
                                <div className="mb-0 card">
                                    <div className="card-body">
                                        <div className="align-items-center justify-content-sm-between row">
                                            <div className="col-lg-6">
                                                <form className="">
                                                    <div className="form-check">
                                                        <label title="" for="task1" className="form-check-label"> {data.jobdetails} </label>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="col-lg-3">
                                                <span className="badge-soft-info badge rounded-pill">{formatDate(data.dateandtime)}</span>
                                                <span className="badge-soft-info badge rounded-pill">{formatDate(data.finisheddate)}</span>
                                            </div>

                                            <div className="col-lg-3">
                                                <ul className="list-inline text-sm-end mb-0">

                                                    <li className="list-inline-item pe-3">
                                                        <span className="icon icon-xxs text-normal">
                                                        </span>
                                                         Counter
                                                    </li>

                                                    <li className="list-inline-item">

                                                        <span className={ data.status == "done" ? "badge-soft-success p-1 badge" : data.status == "failed" ? "badge-soft-danger p-1 badge" : "badge-soft-warning p-1 badge" } >

                                                            { data.status == "done" ? 

                                                            "Done"

                                                            : data.status == "failed" ?

                                                                "Failed"

                                                            :

                                                                "pending"

                                                            }

                                                        </span>


                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        )

                        }

                      }

                   )}



                        <div className="mb-3 mt-4 row">
                            <div className="col">
                                <div className="text-center"><button type="button" className="btn btn-outline-primary btn-sm"><div className="me-1 spinner-border spinner-border-sm"></div>Load More</button></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <section className="section py-4 position-relative">
            <div className="container">
                <div className="align-items-center row">
                    <div className="col">
                        <ul className="list-inline list-with-separator mb-0">
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">About</a></li>
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">Privacy</a></li>
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">Terms</a></li>
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">Developers</a></li>
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">Support</a></li>
                            <li className="list-inline-item me-0"><a href="/pages/account/dashboard">Careers<span className="align-middle badge-soft-info fw-normal fs-11 px-2 py-1 ms-1 badge rounded-pill">We're hiring</span></a></li>
                        </ul>
                    </div>
                    <div className="text-lg-end mt-2 mt-lg-0 col-lg-auto">
                        <p className="fs-14 mb-0">2022 © Prompt. All rights reserved. Crafted by <Link href="/"><a>Paimon</a></Link></p>
                    </div>
                </div>
            </div>
        </section>


    </div>



  )
}



