import React from 'react';
import Toast from 'react-bootstrap/Toast';


export default function Notifier(props) {

  return (

    <Toast className='toast' show={props.show} onClick={props.toggleShowA} bg={props.bg} >
        <Toast.Header>
         <strong className="me-auto">{props.mini}</strong>
         </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
    </Toast>

  )
}
