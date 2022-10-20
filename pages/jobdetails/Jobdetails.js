import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../styles/Jobdetails.module.css"



export default function Jobdetails() {
  return (
    <div className={styles.jobdetailscontainer}>
        <Header  />

     <div className="container">

  {/* header side with address and interactions */}


        {/* Jobs failed and passed */}

        <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h4 class="mb-1 mt-0 fs-16">Revenue</h4>
                            </div>
                            <div class="col-auto">
                                <div class="dropdown"><a class="btn-link text-muted p-0 dropdown-toggle" id="dropdownMenuLink-1" aria-expanded="false" href="/pages/account/dashboard"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal icon icon-xs"><g><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></g></svg></a></div>
                            </div>
                        </div>
                        <h1>$2,100.00</h1>
                        <p class="text-muted">Last Week</p>
                        <hr class="mb-1" />
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="d-flex align-items-center mt-2">
                                    <div class="me-3 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-up text-success"><g><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></g></svg></div>
                                    <div
                                        class="flex-grow-1">
                                        <h5 class="mt-0 mb-0">15%</h5>
                                        <p class="text-muted mb-0 fs-13">Prev Week</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex align-items-center mt-2">
                                <div class="me-3 flex-shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trending-down text-danger"><g><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></g></svg></div>
                                <div
                                    class="flex-grow-1">
                                    <h5 class="mt-0 mb-0">10%</h5>
                                    <p class="text-muted mb-0 fs-13">Prev Month</p>
                            </div>
                        </div>
                    </div>
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
