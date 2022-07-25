import React, {useState, useContext} from "react";
import SignIn from "./SignIn";
import Modal from 'react-modal';
import { SignInModalContext } from "../Helper/Context";

const SignInModal = () => {

    const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);

    return(
        <Modal isOpen={signInModalIsOpen} onRequestClose={() => setSignInModalIsOpen(false)}
            style={
                {
                    overlay:{
                        backgroundColor:'rgba(0,0,0,0.75)',
                    }, 
                    content:{
                        marginTop:'160px',
                        marginLeft: 'auto',
                        marginRight:'auto',
                        marginBottom:'150px',
                        width: '30%', 
                    }
                }
            }
        >
            <SignIn/>
        </Modal>
    )
}

export default SignInModal;