import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Divider, Rating, Typography} from '@mui/material';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    margin-top: 10px;
    margin-right: 15px;
    margin-left: 35px;
    min-width: 390px;
    max-width: 390px;
`

const FeatureContainer = styled.div`
    padding-left: 4px;
`

const SentimentScore = styled.div`
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 6px;

`

const Positive = styled.div`
    font-size: 16.5px;
`
const Negative = styled.div`
    font-size: 16.5px;
`


const ComparisonFeatureInfo = (props) => {
    
    return(
        <Wrapper>
            <FeatureContainer>
                <SentimentScore>{props.sentiment.toFixed(2)} ({props.count})</SentimentScore>
                <Positive>Positive Reviews (
                    <Link to={`/product/${props.id}`}
                        style={{textDecoration:"none",color:'rgb(153, 0, 51)'}}
                        state={{f1:props.f1,f2:props.f2,f3:props.f3,f4:props.f4,f5:props.f5,category:props.category,index:props.index,logged:props.logged,checked:props.checked}}
                    >
                        {props.positive}
                    </Link>
                )</Positive>
                <Negative>Negative Reviews (
                    <Link to={`/product/${props.id}`}
                        style={{textDecoration:"none",color:'rgb(153, 0, 51)'}}
                        state={{f1:props.f1,f2:props.f2,f3:props.f3,f4:props.f4,f5:props.f5,category:props.category,index:props.index,logged:props.logged,checked:props.checked}}
                    >
                        {props.negative}
                    </Link>
                )</Negative>
            </FeatureContainer>
            <Divider sx={{marginTop:"20px",marginBottom:"20px",marginRight:"15px", borderBottomWidth:2}}/>
        </Wrapper>

    )
}

export default ComparisonFeatureInfo