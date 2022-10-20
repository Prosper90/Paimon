import React from 'react';
import styles from '../styles/Body.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import Search from './Search';


export default function Body() {

const mobile = useMediaQuery('(max-width: 547px)');



  return (
    <div className={styles.bodycontainer}>

      { mobile && <div className={styles.overlay}></div> }

        <div className={styles.secondcontainer}>
          
              <div className={styles.containinfo}>

                    <div className={styles.containhead}>
                        <h3>The Easiest Way to Work With Clients</h3>
                        <span className={styles.smallwelcome}>Find Client, Connect, Pay & Get Results</span>
                    </div>

                      <Search />

                      <div className={styles.browebuy}>
                        <div className={styles.category} >Give job</div> 
                        <div className={styles.categorytwo} >Become a worker</div>
                      </div>

              </div>

        </div>




        <div className={styles.imgcontainer}>
          <img className={styles.illustrationcontain} src="/illustration.png" alt="illustratin" />
        </div>



    </div>
  )

}
