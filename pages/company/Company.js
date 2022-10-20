import React, {useEffect} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Company.module.css';
import 'bootstrap/dist/css/bootstrap.css';



export default function Company() {




   useEffect(()=>{

      import("bootstrap/dist/js/bootstrap");

   },[])




  return (
    <div>

       <Header />

     {/* <!-- End Banner Top --> */ }
        <section className='banner'>

            <div class="containertwo">
              <div class="row">
                <div class="col-xl-8 col-md-12">
                    <div class="banner__content">
                      <h2 class="title">Paimon, Pay safe</h2>
                      <p class="fs-20 desc">
                           A decentralised payment system aiming at fair distribution of transaction between both parties
                      </p>

                      <div className={styles.holdbutton}>
                            <a href="#" class="btn-action mr-1"><span>Download white paper</span></a>
                            <a href="#" class="btn-action"><span>Upcoming updates</span></a>
                      </div>    

                    <div class="partner">
                        <h6>Our Partners</h6>
                        <div class="partner__list">
                        <div class="swiper swiper-partner">
                            <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="/partner1.png" alt=""/>
                            </div>
                            <div class="swiper-slide">
                                 <img src="/partner2.png" alt=""/>
                            </div>
                            <div class="swiper-slide">
                                    <img src="/partner3.png" alt=""/>
                            </div>
                            <div class="swiper-slide">
                                    <img src="/partner4.png" alt=""/>
                            </div>
                            <div class="swiper-slide">
                                    <img src="/partner5.png" alt=""/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                    <div class="col-xl-4 col-md-12">
                        <div class="banner__image">
                            <img src="/illustrationthree.png" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    {/* <!-- End Banner Top --> */ }


     <section className={styles.secondsection}>
    

       <div className="row">

                <div class="col-3 ">
                    <h3>How it works</h3>
                </div>

                <div class="col-9">

                    <div className="containhowitworks">
                        
                        <div className="paragraphone">
                            Paimon utilizes a smart contract to hold deposits from the employer while notifying the 
                            worker to start working, thereby eliminating  wasted effort, should the employer not pay.
                            This deposited money is held in the contract till the user is done and notifies the 
                            contract by calling certain functions. if the employer is satisfied, the contract releases the money to the worker. else returns the money back to the employer
                        </div>
                        

                    </div>

                </div>

        </div>




        <div className="row" style={{marginTop: '100px' }}>

                <div class="col-3 ">
                    <h3>Problems</h3>
                </div>

                <div class="col-9">

                    <div className="containhowitworks">
                        
                        <div className="paragraphone">
                               We have developed a number of solutions to various challenges and problems that 
                               can emerge, such as fair judgment should trouble arise during the transaction 
                               between the two parties.
                        </div>
                        

                    </div>

                </div>

            </div>







        </section>






        <section className={styles.thirdsection}>



        </section>




        <Footer />
    </div>
  )
}
