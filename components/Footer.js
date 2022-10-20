import React from 'react';
import styles from '../styles/Footer.module.css';
import 'bootstrap/dist/css/bootstrap.css';


export default function Footer() {
  return (

    <div className={styles.footerContainer}>



    <div className={styles.otherlinks}>


        {/* beginning of second row */}
          <div className={styles.firstworkrow} >

                {/* seperate */}

                <div className={styles.follow} >
                    <h2 className={styles.headerfollow} >Paimon</h2>
                    <div className={styles.companydescription}> 
                        We are a third-phase job transaction process that <br />
                         uses blockchain technology to track, keep deposits, <br />
                          and effectively notify users when a project is finished.
                       </div>
                </div>
                  

          </div>
          {/* end of second row */}


      {/* beginning of first row */}
        <div className={styles.firstrow}>



            <div className={styles.eachfootercolumn} >

                  <div className={styles.header} >
                    Quick Links
                  </div>

                  <div className={styles.otheritemscontain}>

                  <div className={styles.otheritems} >
                    Dashbooard
                  </div>

                  <div className={styles.otheritems} >
                    Workers
                  </div>

                  <div className={styles.otheritems} >
                    Community
                  </div>

                  <div className={styles.otheritems} >
                    Become a worker
                  </div>

                  </div>


               </div>

                <div className={styles.eachfootercolumn}>

                    <div className={styles.header}>
                      Company
                    </div>

                 <div className={styles.otheritemscontain}>

                    <div className={styles.otheritems} >
                       AdvertiseNew
                    </div>

                    <div className={styles.otheritems} >
                        Contact Us
                    </div>

                    <div className={styles.otheritems} >
                        Brand Assets
                    </div>

                    <div className={styles.otheritems} >
                        Terms of Service
                    </div>

                  </div>

                </div>

      {/* seperate */}


            <div className={styles.eachfootercolumn} >

                <div className={styles.header} >
                  Community
                </div>

              <div className={styles.otheritemscontain}>

                <div className={styles.otheritems} >
                   Network Status
                </div>

                <div className={styles.otheritems} >
                   Sponsors
                </div>

                <div className={styles.otheritems} >
                  Careers
                </div>

                <div className={styles.otheritems} >
                  Learn to use
                </div>

             </div>


            </div>

      {/* seperate */}


            <div className={styles.eachfootercolumn} >

                <div className={styles.header} >
                  Product
                </div>

             <div className={styles.otheritemscontain}>

                <div className={styles.otheritems} >
                  Blog
                </div>

                <div className={styles.otheritems} >
                  Podcast
                </div>

                <div className={styles.otheritems} >
                  Videos
                </div>

                <div className={styles.otheritems} >
                  Resources
                </div>

              </div>

            </div>

      {/* seperate */}

      </div>

      {/* end of first row */}









                
          </div>
      {/* end of other links */}



        <div className={styles.bottomside} >

            <div className={styles.secondpart} >

                  (c) Paimon. All Rights Reserved 2022

            </div>


            <div className={styles.firstpart} >
              Socials
            </div>

        </div>

     
    </div>

  )
}
