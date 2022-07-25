import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 20px;
    min-width: 420px;
`

const ImageContainer = styled.div`
    padding-top: 10px;
    flex: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 40px;
`
const Image = styled.img`
    max-width: 190px;
    max-height: 23vh;
    object-fit: contain;
    margin-bottom: 10px;
    /* cursor: pointer; */
`
const Name = styled.div`
    font-weight: 500;
    padding: 10px ;
    min-height: 50px;
    text-align: justify ;
`

const Price = styled.div`
    padding: 10px;
    font-weight: 400;
    font-size: 23px;
    letter-spacing: 0.5px;
`

const Description = styled.div`
    padding: 10px ;
    letter-spacing: 0.5px ;
    text-align: justify;
`

const ComparisonProductCard = ({product}) => {

    return(
        <Wrapper>
            <ImageContainer>
                <Image src={product.image_url}/>
            </ImageContainer>
            <Name>{product.name}</Name>
            <Price>{product.price}</Price>
            <Description>{product.description}</Description>
        </Wrapper>
    )
}

export default ComparisonProductCard