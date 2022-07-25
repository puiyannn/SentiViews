import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {Divider, Rating, Typography} from '@mui/material';
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const Wrapper = styled.div`
    margin: 20px;
    min-width: 390px;
    max-width: 390px;
    padding-left: 5px;
    padding-right: 5px;
`

const ImageContainer = styled.div`
    padding-top: 10px;
    flex: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 20px;
`
const Image = styled.img`
    max-width: 190px;
    max-height: 23vh;
    object-fit: contain;
    margin-bottom: 10px;
`

const Name = styled.div`
    font-size: 18px;
    font-weight: 500;
    padding: 15px 10px ;
    min-height: 70px;
    text-align: justify ;
`

const RatingContainer = styled.div`
    display: flex;
    padding: 8px;
`

const RatingScore = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-left: 8px;
`

const Price = styled.div`
    padding: 10px;
    font-weight: 400;
    font-size: 23px;
    letter-spacing: 0.5px;
    min-height: 30px;

`

const Description = styled.div`
    padding: 10px ;
    text-align: justify;
    min-height: 100px;
`

const ButtonContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
`

const MoreInfoButton = styled.button`
    cursor: pointer;
    flex: 5;
    margin-top: 20px;
    color: rgb(255, 255, 255);
    background-color: black;
    border: 0px;
    padding: 5px;
    padding-top: 7px;
    letter-spacing: 0.6px ;
    font-size: 14px;
    font-weight: 500;
    height: 30px;
`

const RedirectButton = styled.button`
    cursor: pointer;
    flex: 5;
    color: black;
    background-color: white;
    border: 2px solid black;
    padding: 5px;
    padding-top: 7px;
    padding-bottom: 5px;
    letter-spacing: 0.6px ;
    font-size: 14px;
    font-weight: 50;
    height: 30px;
`

const ComparisonProductInfo = (props) => {

    const{
        id,
        name,
        price,
        image_url,
        description,
        url,
        f1_count,
        f2_count,
        f3_count,
        f4_count,
        f5_count,
        sentiment,
    } = props;

    const handleRedirect = () => {
        window.open(
            url,
            '_blank'
        );
    }

    return(
        <Wrapper>
            <ImageContainer>
                <Image src={image_url}/>
            </ImageContainer>
            <Name>{name}</Name>
            <RatingContainer>
                <Rating name="half-rating-read" defaultValue={sentiment.toFixed(2)} precision={0.25} readOnly
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: "rgb(153, 0, 51)"
                            },
                            fontSize: "1.3rem",
                            paddingTop: "2px",
                        }}
                />
                <RatingScore>{sentiment.toFixed(2)} ({f1_count+f2_count+f3_count+f4_count+f5_count})</RatingScore>
            </RatingContainer>
            <Price>{price}</Price>
            <Description>
                <ShowMoreText
                lines={3}
                more={<ExpandMore />}
                less={<ExpandLess />}
                style={{textAlign:"justify"}}
                expanded={false}
                width={370}
                >
                {description}
                </ShowMoreText>
            </Description>
            <ButtonContainer>
                <MoreInfoButton>
                <Link to={`/product/${props.id}`}
                        style={{textDecoration:"none",color:'white'}}
                        state={{f1:props.f1,f2:props.f2,f3:props.f3,f4:props.f4,f5:props.f5,category:props.category,index:props.index,logged:props.logged,checked:props.checked}}
                >More Information</Link>
                </MoreInfoButton>
            </ButtonContainer> 
            <ButtonContainer>
                <RedirectButton onClick={handleRedirect}>Purchase</RedirectButton>
            </ButtonContainer>
            
            
        </Wrapper>
    )
}

export default ComparisonProductInfo