import { Badge, Menu, MenuItem } from "@material-ui/core";
import { AccessTime, AccessTimeOutlined, FavoriteBorderOutlined, HistoryOutlined, Search } from "@material-ui/icons";
import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import Register from "./Register";
import SignIn from "./SignIn";
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import SignInModal from "./SignInModal";
import { SignInModalContext } from "../Helper/Context";

const Container = styled.div`
    height: 55px;
    background-color: black ;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    color: black;
    flex: 1;
    align-items: center;
`

const SearchContainer = styled.div`
    /* border: 1px solid lightgray; */
    display: flex;
    align-items: center;
    padding: 3px;
`

const SearchTerm = styled.input`
    border: none;
    margin-right: 3px;
`

const Center = styled.div`
    /* color: white ; */
`
const Right = styled.div`
    color: white ;
    flex: 1;
    display: flex;
    align-items: centre;
    justify-content: flex-end ;
`

const LogContainer = styled.div`
    margin-left: 30px;
`

const SearchIcon = styled.div`
    cursor: pointer;
`

const SignOutContainer = styled.div`
    padding-bottom: 6px;
`


const NavBar = () => {

    const [registerModalIsOpen,setRegisterModalIsOpen] = useState(false);
    // const [signInModalIsOpen,setSignInModalIsOpen] = useState(false);
    const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);
    const [logged,setLogged] = useState(false);

    const getLogStatus = async () => {
        try{
            const res = await fetch(
                '/logstatus',
                {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'same-origin',
                }
            );

            const json = await res.json();
            setLogged(json.status);
            console.log(logged);
    
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getLogStatus();
    });

    const handleSignOut = async () => {
        try{
            const res = await fetch(
                '/signout',
                {
                    type: "GET",
                }
            );
            window.location.reload(true);
            window.location.assign('/');
            }catch(error){
                console.log(error);
            };
        }
    

    return(
        <Container>
            <Wrapper>
                <Left>nothing</Left>
                <Center>nothing</Center>
                <Right>
                    {logged
                    ?   <MenuItem >
                            <SignOutContainer onClick={handleSignOut}>SIGN OUT</SignOutContainer>
                        </MenuItem>
                    :   <MenuItem>
                            <LogContainer onClick={() => setRegisterModalIsOpen(true)}>REGISTER</LogContainer>
                            <LogContainer onClick={() => setSignInModalIsOpen(true)}>SIGN IN</LogContainer>
                        </MenuItem> 
                    }
                    <MenuItem >
                            <Badge color="primary" style={{paddingBottom:'3px'}}>
                                {logged
                                ? <Link to='/favourite' style={{color: 'white' }}>
                                    <FavoriteBorderOutlined/>
                                </Link>
                                : <FavoriteBorderOutlined onClick={setSignInModalIsOpen}/>
                                }     
                            </Badge>
                    </MenuItem>
                    {logged
                    ?<MenuItem>
                        <Badge color="primary" style={{paddingBottom:'3px'}}>
                            <Link to='/viewed' style={{color: 'white' }}>
                                <HistoryOutlined/>
                                
                            </Link>
                        </Badge>
                    </MenuItem>
                    :<div></div>
                    }
                    
                </Right>
            </Wrapper>
            <Modal isOpen={registerModalIsOpen} onRequestClose={() => setRegisterModalIsOpen(false)}
                    style={
                        {
                            overlay:{
                                backgroundColor:'rgba(0,0,0,0.75)',
                            }, 
                            content:{
                                marginTop:'130px',
                                marginLeft: 'auto',
                                marginRight:'auto',
                                marginBottom:'100px',
                                width: '30%', 
                            }
                        }
                    }
            >
                <Register openModal={setRegisterModalIsOpen}/>
            </Modal>
            {/* <Modal isOpen={signInModalIsOpen} onRequestClose={() => setSignInModalIsOpen(false)}
                    style={
                        {
                            overlay:{
                                backgroundColor:'rgba(0,0,0,0.75)',
                            }, 
                            content:{
                                marginTop:'130px',
                                marginLeft: 'auto',
                                marginRight:'auto',
                                marginBottom:'140px',
                                width: '30%', 
                            }
                        }
                    }
            >
                <SignIn/>
            </Modal> */}
            <SignInModal/>

        </Container>
    )
}

export default NavBar