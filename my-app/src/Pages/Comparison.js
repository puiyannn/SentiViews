import { CircularProgress, Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import ComparisonFeatureInfo from "../Components/ComparisonFeatureInfo";
import ComparisonProductInfo from "../Components/ComparisonProductInfo";
import { ComparisonContext } from "../Helper/Context";
import { Radar } from 'react-chartjs-2';


const Container = styled.div`
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 100px;
    margin-right: 100px ;
    margin-bottom: 50px ;
    min-width: 0;
    overflow-y: hidden;
`

const Title = styled.h2`
    padding-left: 30px;
`

const Message = styled.div`
    padding-left: 30px;
`

const Wrapper = styled.div`
    display: flex;
    min-width: 200px;
    width: 100%;
    flex: 1 1 0px;
`

const RadarWrapper = styled.div`
    width: 96%;
    margin: 40px;
    align-content: center;
`

const FeatureName = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding-left: 37px;
`

const CircularContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const RadarTitle = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`

const Comparison = () => {

    const location = useLocation();
    const {state} = location;
    const f1_name = state.f1_name;
    const f2_name = state.f2_name;
    const f3_name = state.f3_name;
    const f4_name = state.f4_name;
    const f5_name = state.f5_name;
    const f1 = state.f1;
    const f2 = state.f2;
    const f3 = state.f3;
    const f4 = state.f4;
    const f5 = state.f5;
    const category = state.category;
    const index = state.index;
    const logged = state.logged;
    const checked = state.checked;

    const [load, setLoad] = useState(true);
    const [products, setProducts] = useState([]);
    const {comparisonList} = useContext(ComparisonContext);
    const [datasets, setDatasets] = useState([]);

    const color = [{
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)', 
    },{
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    },
    {
        backgroundColor: 'rgba(123, 0, 168, 0.2)',
        borderColor: 'rgb(123, 0, 168)',
        pointBackgroundColor: 'rgb(123, 0, 168)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(123, 0, 168)'
    },
    {
        backgroundColor: 'rgba(0, 28, 177, 0.2)',
        borderColor: 'rgb(0, 28, 177)',
        pointBackgroundColor: 'rgb(0, 28, 177)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(0, 28, 177)'
    },
    {
        backgroundColor: 'rgba(255, 0, 232, 0.2)',
        borderColor: 'rgb(255, 0, 232)',
        pointBackgroundColor: 'rgb(255, 0, 232)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 0, 232)'
    },
    {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'black',
        pointBackgroundColor: 'black',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'black'
    },
]

    const getComparison = async () => {
        try{
            const res = await fetch(
                "/comparison",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        comparisonList: comparisonList,
                    })
                }
            );

            const json = await res.json();
            setProducts(json.products);
            
            setLoad(false);
            
            var dts = []
 
            for (let i=0; i<json.products.length; i++) {
                const p = json.products[i];
                const d = {
                    label: p.name,
                    data: [p.f1_sentiment.toFixed(2),p.f2_sentiment.toFixed(2),p.f3_sentiment.toFixed(2),p.f4_sentiment.toFixed(2),p.f5_sentiment.toFixed(2)],
                    fill: true,
                    backgroundColor: color[i].backgroundColor,
                    borderColor: color[i].borderColor,
                    pointBackgroundColor: color[i].pointBackgroundColor,
                    pointBorderColor: color[i].pointBorderColor,
                    pointHoverBackgroundColor: color[i].pointHoverBackgroundColor,
                    pointHoverBorderColor: color[i].pointHoverBorderColor,
                }

                dts.push(d);
            }

            console.log(dts);

            setDatasets(dts);
            console.log(datasets);
    
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getComparison();
    },[]);

    return(
        <Container>
            <Title>Product Comparison</Title>
            {products.length<=0 && load===false?  <Message>No product is selected.</Message>:<div></div>}
            {comparisonList.length>6 && load===false?  <Message>Product limit exceeded. Only 6 products will be shown.</Message>:<div></div>}
            {load?<CircularContainer><CircularProgress color="inherit"/></CircularContainer>:load}
            {products.length>0? 
                           <div>
                           <Wrapper>
                               {products.map(product=>(
                                   <ComparisonProductInfo 
                                   id={product.id}
                                   name={product.name} price={product.price} image_url={product.image_url} description={product.description} url={product.url}
                                   f1_count={product.f1_positive+product.f1_negative} f2_count={product.f2_positive+product.f2_negative} f3_count={product.f3_positive+product.f3_negative} f4_count={product.f4_positive+product.f4_negative} f5_count={product.f5_positive+product.f5_negative}
                                   sentiment={product.sentiment}
                                   f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}/>
                               ))}
                           </Wrapper>
                           {load? load:<FeatureName>{f1_name}</FeatureName>}
                           <Wrapper>
                               {products.map(product=>(
                                   <ComparisonFeatureInfo 
                                   id={product.id}
                                   sentiment={product.f1_sentiment}
                                   count={product.f1_positive+product.f1_negative}
                                   positive={product.f1_positive} 
                                   negative={product.f1_negative}
                                   f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}/>
                               ))}
                           </Wrapper>
                           
                           {load? load:<FeatureName>{f2_name}</FeatureName>}
                           <Wrapper>
                           {products.map(product=>(
                               <ComparisonFeatureInfo 
                               id={product.id}
                               sentiment={product.f2_sentiment}
                               count={product.f2_positive+product.f2_negative}
                               positive={product.f2_positive} 
                               negative={product.f2_negative}
                               f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}
                               />
                           ))}
                           </Wrapper>
                           
                           {load? load:<FeatureName>{f3_name}</FeatureName>}
                           <Wrapper>
                               {products.map(product=>(
                                   <ComparisonFeatureInfo 
                                   id={product.id}
                                   sentiment={product.f3_sentiment}
                                   count={product.f3_positive+product.f3_negative}
                                   positive={product.f3_positive} 
                                   negative={product.f3_negative}
                                   f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}
                                   />
                               ))}
                           </Wrapper>
                           
                           {load? load:<FeatureName>{f4_name}</FeatureName>}
                           {f4_name!=''?
                           <Wrapper>
                               {products.map(product=>(
                                   <ComparisonFeatureInfo 
                                   id={product.id}
                                   sentiment={product.f4_sentiment}
                                   count={product.f4_positive+product.f4_negative}
                                   positive={product.f4_positive} 
                                   negative={product.f4_negative}
                                   f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}
                                   />
                               ))}
                           </Wrapper>:f4
                           }
                           {load? load:<FeatureName>{f5_name}</FeatureName>}
                           {f5_name!=''?
                           <Wrapper>
                               {products.map(product=>(
                                   <ComparisonFeatureInfo 
                                   id={product.id}
                                   sentiment={product.f5_sentiment}
                                   count={product.f5_positive+product.f5_negative}
                                   positive={product.f5_positive} 
                                   negative={product.f5_negative}
                                   f1={f1} f2={f2} f3={f3} f4={f5} f5={f5} category={category} index={index} logged={logged} checked={checked}
                                   />
                               ))}
                           </Wrapper>:f5
                           }
                           
                           {load? load:
                           <RadarWrapper>
                               <RadarTitle>Comparison between Feature-Level Sentiment Score</RadarTitle>
                               <Radar
                                   data = {{
                                       labels: [f1_name,f2_name,f3_name,f4_name,f5_name],
                                       datasets: datasets,
                                   }}
                                   options = {{
                                       elements: {
                                           line: {
                                               borderWidth: 3
                                           }
                                       },
                                       scale: {
                                           pointLabels: {
                                               fontSize: 12,
                                               fontColor:"black",
                                           }
                                       },
                                       legend: {
                                           labels: {
                                               fontSize: 13,
                                               fontColor:"black",
                                               padding: 10
                                           },
                                       },
           
                                   }}
                               >
                               </Radar>
                           </RadarWrapper>
                           }
                       </div>: <div></div> }
        </Container>
    )
}

export default Comparison