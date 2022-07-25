import { Alert, Snackbar } from "@mui/material";
import React, {useState} from "react";
import styled from 'styled-components';

const Container = styled.div`
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
`

const Title = styled.div`
    font-weight: 700;
    font-size: 20px;
    padding-bottom: 15px;
    text-align: center;
`

const Form = styled.div`
    display: 'flex';
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
    min-width: 250px;
    width: 100%;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    padding-bottom: 20px;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 700;
    padding-left: 2px;
`

const FormControl = styled.input`
    padding-left: 5px;
    width: 98%;
    height: 30px;
    font-size: 15px;
`

const Divider = styled.div`
    border-bottom: 2px solid #ccc;
    height: 10px;
    width: 100%;
`
const Button = styled.button`
    cursor: pointer;
    margin-top: 20px;
    height: 30px;
    width: 100% ;
    color: rgb(255, 255, 255);
    background-color: black;
    border: 0px;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    font-weight: 500;
    &:hover{
        background-color: rgb(153, 0, 51);
    }
`

const Google = styled.button`
    cursor: pointer;
    margin-top: 20px;
    height: 30px;
    width: 100% ;
    color: black;
    background-color: white;
    border: 2px solid black;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    font-weight: 500;
`

const Register = () => {

    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);


    function handleUsername(e) {
        setUsername(e.target.value);
      }

    function handleEmail(e) {
        setEmail(e.target.value);
      }
    
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrorOpen(false);
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
    };

    

    const submitForm = async () => {
        try{
            const res = await fetch(
                'http://localhost:5000/register',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                    })
                }
            );
            const json = await res.json();

            if (json.error != null){
                console.log(json.error);
                setErrorOpen(true);
                setErrorMessage(json.error);
            }

            else{
                console.log(json.message);
                setSuccessOpen(true);
                setSuccessMessage(json.message);
                window.setTimeout(function() {
                    window.location.reload(true);
                }, 2000);
            }

        }catch(error){
            console.log(error);
        }
    };

    return(
        <Container>
            <Title>WELCOME!</Title>
            <Form>
                <FormGroup>
                    <Label>Username</Label>
                    <FormControl type="text" name="username" onChange={handleUsername}></FormControl>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <FormControl type="email" name="email" onChange={handleEmail}></FormControl>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <FormControl type="password" name="password" onChange={handlePassword}></FormControl>
                </FormGroup>
                <Button onClick={submitForm}>SIGN UP</Button>
            </Form>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>{errorMessage}</Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>{successMessage}</Alert>
            </Snackbar>
        </Container>

    )
};

export default Register;