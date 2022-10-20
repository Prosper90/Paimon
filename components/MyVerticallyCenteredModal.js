import React, {useState, useEffect, useContext} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { ethers } from 'ethers';
import { contractaddress, contractABI, chainID } from './utils/constants';
import Contexts from "./context/contextclass";
import Notifier from "./Notifier";
import styles from "../styles/Modals.module.css";



export default function MyVerticallyCenteredModal(props) {

  const { address } = useContext(Contexts);
  const [counterid, setCounterid] = useState();
    //notification
  const [bg, setbg] = useState();
  const [message, setMessage] = useState();
  const [mini, setMini] = useState();
  const [show, setShow] = useState(false);



  const toggleShowA = () => {
    setShow(!show);
   }


  const getContract = async () => {

    //console.log("bad guy called");
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(contractaddress, contractABI, signer);

}

//get counter id
const getcounterid = async () => {
  const contract = await getContract();
  const getcounter = await contract.getcounterid();
  setCounterid(getcounter);
}



//start project
const startProject = async (e) => {
    e.preventdefault();
    const amount =  e.target.workamount.value;
    const jobdetail = e.target.job.value;
    const completedate = e.target.finisheddate.value;


    if(amount == "" || jobdetail == "" || completedate == "") {
      setbg("danger");
      setMessage("Fields should not be empty");
      setMini("failed");
      setShow(true);
      return;
    }


    if(amount == 0) {
      setbg("danger");
      setMessage("Amount should not be zero");
      setMini("failed");
      setShow(true);
      return;
    }

    //deposit cash
    const contract = await getContract();
    await contract.Deposit(props.worker, ethers.utils.parseEther(amount));


    //check if user already exists
    const  checkifemployerexist = await fetch(`https://paimon-backend.herokuapp.com/user/${address}`, { method: 'GET' })
    const check = await checkifemployerexist.json();

    if(check.user == null) {
            //create a worker
                const createuseremployer = await fetch(`https://paimon-backend.herokuapp.com/user`, 
                {
                    method: 'POST',   
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ type: "Employer", address: address,  jobskill: "Employer", revenue: 0 })
                }
            );
              await createuseremployer.json();
    }


    //initialize project
    //create project for worker
    const createproject = await fetch(`https://paimon-backend.herokuapp.com/user/createproject`, 
    {
        method: 'POST',   
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: counterid, 
                   address: props.worker,
                   status: "pending",  
                   employer: address, 
                   worker: props.worker,
                   jobdetails: jobdetail,
                   amount: amount,
                   finisheddate: completedate
                  })
    } );
    await createproject.json();



    //create project for employer
    const createprojectemployer = await fetch(`https://paimon-backend.herokuapp.com/user/createproject`, 
    {
        method: 'POST',   
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: counterid,
                    address: address,
                    status: "pending",  
                    employer: address, 
                    worker: props.worker,
                    jobdetails: jobdetail,
                    amount: amount,
                    finisheddate: completedate
                  })
    } );
    await createprojectemployer.json();



    setbg("success");
    setMessage("Deposit recieved");
    setMini("success");
    setShow(true);
    return;


}








useEffect(() => {

  getcounterid();

}, []);



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add job details..
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

     <div className="containform">

        <form className='form'  onSubmit={startProject}>

            <div class="cfield">
                <input type="text" placeholder="id" value={counterid} disabled/>
                <small><i>id</i></small>
            </div>

            <div class="cfield">
                <input type="text" value={props.worker} placeholder="worker"  disabled/>
                <small><i>worker</i></small>
            </div>

            <div class="cfield">
                <input type="text" name="job" placeholder="Job details" />
                <small><i>Job details</i></small>
            </div>

            <div class="cfield">
                <input type="number" name="workamount" placeholder="amount" />
                <small><i>amount</i></small>
            </div>

            <div class="cfield">
                <input type="date" name="finisheddate" placeholder="job end" />
                <small><i>job end</i></small>
            </div>

            <button type="submit">Start Project</button>

        </form>

      </div>

      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>


          <div className={styles.notifyhead}> 
              <Notifier show={show} bg={bg} message={message} mini={mini} toggleShowA={toggleShowA} /> 
          </div>
      
    </Modal>
  );
}


