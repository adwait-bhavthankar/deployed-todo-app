import { useState } from "react";
import Modal from "./Modal"; 
import { useCookies } from "react-cookie";
const  ListHeader =({listname,getData}) => {

  const [showModal,setShowModal]= useState(false)
  const [cookies,setCookie, removeCookie] = useCookies(null)

  const signout= () =>{
    console.log('signout')
    removeCookie('email')
    removeCookie('AuthToken')
    window.location.reload()
  }
    return (
      <div className='list-header'>
        <h1>{listname}</h1>
        <div className='button-container'>
          <button className='create' onClick={ () => setShowModal(true)}>ADD NEW</button>
          <button className='signout' onClick={signout}>SIGN OUT</button>
          {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
        </div>
        
        
      </div>
    );
  }
  
  export default ListHeader;
  