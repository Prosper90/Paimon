import React, {useState, useEffect} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../styles/Worker.module.css"
import { shortenAddress } from '../../components/utils/trauncate';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MyVerticallyCenteredModal from '../../components/MyVerticallyCenteredModal';




export default function Worker(props) {


const [totaljobs, setTotaljobs] = useState("0");
const [completedjobs, setcompletedjobs] = useState("0");
const [failedjobs, setfailedjobs] = useState("0");
const [pendingjobs, setpendingjobs] = useState("0");
const [status, setstatus] = useState("0");
//modal
const [modalShow, setModalShow] = React.useState(false);


console.log(props.worker);

const setDatas = () => {

    const totaljobs = props.project.filter(data => {
        if(data.worker == props.worker.address) {
            return true;
        }

        return false;
    }).length;
    
    setTotaljobs(totaljobs);


    //get completed
    const completed = props.projects.filter(data => {

      if(data.worker == props.worker.address){
        if (data.status == "done") {
          return true;
        }
      }
      
        return false;
      }).length;

    setcompletedjobs(completed);


    //get pending
    const pending = props.project.filter(data => {
        if(data.worker == props.worker.address){
                if (data.status == "pending") {
                    return true;
                }
        }
        
        return false;
        }).length;

     setpendingjobs(pending);



    //get pending
    const failed = props.project.filter(data => {
        if(data.worker == props.worker.address){
                if (data.status == "failed") {
                    return true;
                }
        }
        
        return false;
        }).length;

    setfailedjobs(failed);
        

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




useEffect(() => {

    setDatas();

}, []);



    
  return (
    <div className={styles.workercontainer}>
    <Header  />

    {/* Modal */}
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} worker={props.worker.address} />

     <div className="container">

  {/* header side with address and interactions */}
       <div class="row mt-3">
          <div class="col-lg-12 col-md-12">
                    <div class="d-flex justify-content-between " >
                        <div class="mb-0"> <span className={styles.Address} >Address</span>  
                        <span className="col-2 text-truncate" style={{ maxWidth: '150px' }}> {props.worker.address} </span> 
                    </div>
                        <button type="button" class="btn btn-danger btn-sm" onClick={() => setModalShow(true)} >Work with</button>
                    </div>
                </div>
         </div>

            <div  className="row mt-4">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex">

                                        <div class="flex-grow-1">
                                            <h4 class="mb-1 mt-0 fs-16">Addresses worked with</h4>
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <ul class="list-inline d-flex justify-content-between align-items-center mt-3 p-2 bg-light">
                                

                                <li class="list-inline-item ">
                                    <a class="text-muted fs-14" href="/pages/account/dashboard">
                                       <FilterAltIcon />  Address
                                    </a>
                                </li>

                                <li  class="list-inline-item ">
                                       <a class="text-muted fs-14 text-center" >
                                         <DateRangeIcon className='pl-1'/>
                                          Date
                                        </a>
                                </li>


                            </ul>


                         <div class="align-items-center pt-1 overflow-auto" style= {{ height: '80px' }} >

                            { props.worker.Projects.map((data, index) => (

                             <ul class="list-inline py-0  d-flex justify-content-between col-12 p-3" key={index}>
                                                                    

                                    <li class="list-inline-item mb-sm-0 mb-2 me-sm-2">
                                        <a class="text-muted fs-14" href="/pages/account/dashboard">
                                            { shortenAddress(data.employer) }
                                        </a>
                                    </li>

                                    <li  class="list-inline-item mb-sm-0 mb-2">
                                        <a class="text-muted fs-14" href="/pages/account/dashboard">
                                            {formatDate(data.dateandtime)}
                                        </a>
                                    </li>


                                    </ul>

                            ))}






                       </div>









                        </div>
                    </div>
                </div>



            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h4 class="mb-1 mt-0 fs-16">Worker stats</h4>
                            </div>
                        </div>

                     <div className="row mt-3">


                      {/* Begining of  stats second row */}
                        <div className="col-6">

                            <div className="d-flex justify-content-between col-12">
                                <p class="text-muted">Total jobs</p>
                                <p class="text-dark"> {totaljobs} </p>
                            </div>

                            <div className="d-flex justify-content-between col-12">
                                <p class="text-muted">Completed jobs</p>
                                <p class="text-dark"> {completedjobs} </p>
                            </div>

                            <div className="d-flex justify-content-between col-12">
                                <p class="text-muted">Pending jobs</p>
                                <p class="text-dark"> {pendingjobs} </p>
                            </div>

                        </div>
                      {/* End of  stats first row */}



                      {/* Begining of  stats second row */}
                        <div className="col-6">

                                <div className="d-flex justify-content-between col-12">
                                    <p class="text-muted">Failed jobs</p>
                                    <p class="text-dark"> {failedjobs} </p>
                                </div>

                                <div className="d-flex justify-content-between col-12">
                                    <p class="text-muted">Status</p>
                                    <p class="text-dark"> {status} </p>
                                </div>



                        </div>
                      {/* End of  stats second row */}

                     </div>



            </div>
            </div>
          </div>
        </div>


        {/* Jobs failed and passed */}

        <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h4 class="mb-1 mt-0 fs-16">Recent jobs</h4>
                            </div>

                        </div>
                        <hr class="mb-4" />
                        
                    <div class="row mt-2">

                { props.project.map((data, index) => {

                   if(data.worker === props.worker.address) {

                        return ( <div className="row" key={index}>
                                    <div className="col">
                                        <div className="mb-0 card">
                                            <div className="card-body">
                                                <div className="align-items-center justify-content-sm-between row">
                                                    <div className="col-lg-6">
                                                        <form className="">
                                                            <div className="form-check">
                                                                <label title="" for="task1" className="form-check-label">{data.jobdetails}</label>
                                                            </div>
                                                        </form>
                                                    </div>


                                                    <div className="col-lg-3">
                                                        <ul className="list-inline text-sm-end mb-0">

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

                         })
                         }


                    
                       </div>


            </div>
            </div>
          </div>
   {/* end of jobs failed and passed */}



     </div>


 

        <Footer />

    </div>
  )
}



export async function getServerSideProps(context) {

   const { params } = context;

   
    const options = {method: 'GET'};
  
     const res = await fetch(`https://paimon-backend.herokuapp.com/user/${params.index}`, options)
     const tuser = await res.json();

    //get all projects
    const projects = await fetch(`https://paimon-backend.herokuapp.com/projects`, options)
    const currentProject = await projects.json();


  
  return {
    props: {
        worker: tuser.user,
        projects: currentProject.project
    },
  }
  
  }
