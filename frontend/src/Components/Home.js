import React, { useContext } from "react";
import Slider from "./Slider";
import Categories from "./Categories";
import styled from "styled-components";
import { SignInModalContext } from "../Helper/Context";

const Container = styled.div`
    margin-bottom: 20px;
`

const TitleContainer = styled.div`
    width: 100%;
    justify-content: center;
    align-content: center;
    font-family: "Marker Felt";
`

const Title = styled.h1`
    text-align: center;
    font-size: 45px;
`

const Home = () => {

    // const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);

    return(
        <Container>
            {/* {signInModalIsOpen? <h1>TRUE</h1>: <h1>FALSE</h1>} */}
            <Slider/>
            <TitleContainer>
                <Title>SHOP BY CATEGORIES</Title>
            </TitleContainer>
            <Categories/>
        </Container>
    )
};

export default Home
