import React, {useState} from "react";
import Register from "./Register";
import Modal from "react-modal";

const RegisterModal = () => {

    const [registerModalIsOpen,setRegisterModalIsOpen] = useState(true);

    return(
        <Modal isOpen={registerModalIsOpen} onRequestClose={() => setRegisterModalIsOpen(false)}
                style={
                    {
                        overlay:{
                            backgroundColor:'rgba(0,0,0,0.75)',
                        }, 
                        content:{
                            marginTop:'120px',
                            marginLeft: 'auto',
                            marginRight:'auto',
                            marginBottom:'120px',
                            width: '30%', 
                        }
                    }
                }
        >
            <Register openModal={setRegisterModalIsOpen}/>
        </Modal>
    )
};

export default RegisterModal