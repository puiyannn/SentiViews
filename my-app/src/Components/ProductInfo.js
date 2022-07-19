import { FavoriteBorderOutlined, FavoriteOutlined, PieChart } from "@material-ui/icons";
import {AppBar, CircularProgress, Rating, Tab, Tabs} from '@mui/material';
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import {Bar} from 'react-chartjs-2';
import Highlighter from "react-highlight-words";
import { categories } from "../dummies";
import { SignInModalContext } from "../Helper/Context";
import RecommendedProductCard from "./RecommendedProductCard";

const Container = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 100px;
`

const Info = styled.div`
    display: flex;
    height: 60vh ;
    padding-bottom: 100px;
    margin-bottom: 100px ;
`

const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    max-height: 60vh ;
`

const Image = styled.img`
    height: 100%;
    max-width: 360px ;
    object-fit: contain;
`

const InfoContainer = styled.div`
    flex: 2;
    margin-right: 50px;
    min-height: 60vh;
    position: relative ;
`

const Title = styled.h1`
    font-weight: 400 ;
    font-size: 30px ;
    text-align: justify;
`

const DescWrapper = styled.div`
    max-height: 30vh;
    overflow: scroll;    
    margin: 20px 0px;
    &::-webkit-scrollbar {
    display: none;
    }
`

const Desc = styled.p`
    letter-spacing: 0.5px ;
    font-size: 16px ;
    text-align: justify;

`

const Price = styled.div`
    font-weight: 300;
    font-size: 30px;
    letter-spacing: 0.5px;
`

const ButtonContainer = styled.div`
    display: flex ;
    margin-top: 10px;
    position: absolute;
    width: 100%;
    bottom: 0 ;
`

const RedirectButton = styled.button`
    cursor: pointer;
    flex: 5;
    margin-right: 20px ;
    width: 100% ;
    color: rgb(255, 255, 255);
    background-color: black;
    cursor: pointer;
    border: 0px;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    &:hover{
        background-color: rgb(153, 0, 51)

  }
`

const FavContainer = styled.div`
    cursor: pointer;
`

const Rev = styled.div``

const FeatureContainer = styled.div`
    border: 2px solid gray ;
    padding: 10px ;
    margin: 10px ;
    margin-bottom: 40px;
`

const FeatureTitle = styled.div`
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    padding-top: 20px;
`

const PolarityContainer = styled.div`
    border: 1px solid gray;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 30px;
`

const PolarityTitle = styled.h2`
    padding-left: 45px;
`

const PolarityRev = styled.div`
    max-height: 50vh;
    overflow-x: hidden;
`

const PieContainer = styled.div`
    height: 30vh ;
`

const Review = styled.div`
    padding-left: 45px ;
    padding-right: 65px;
    padding-bottom: 45px ;
`

const User = styled.div`
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 10px ;
`

const Content = styled.div`
    letter-spacing: 0.2px ;
    text-align: justify;
`

const CircularContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ScoreContainer = styled.div`
    padding: 10px;
    margin: 10px;
    margin-bottom: 15px;
    align-items: center;
    justify-content: center;
`

const FeatureScore = styled.div`
    font-size: 33px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 5px;
`

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Recommendation = styled.div`
    margin-top: 60px;
    margin-left: 10px;
`

const RecommendationTitle = styled.h1`
    font-family: "Marker Felt";
`

const RecommendedProductsContainer = styled.div`
    margin-top: 20px;
    display: flex ;
    flex-wrap: wrap;
`;

const ProductInfo = (props) => {

    const location = useLocation();
    const {state} = location;
    console.log(state);
    const cat = state.category;
    const index = state.index;
    const logged = state.logged;
    const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);

    const [f1_name,setF1_name] = useState(categories[index].f1_name);
    const [f2_name,setF2_name] = useState(categories[index].f2_name);
    const [f3_name,setF3_name] = useState(categories[index].f3_name);
    const [f4_name,setF4_name] = useState(categories[index].f4_name);
    const [f5_name,setF5_name] = useState(categories[index].f5_name);
    const [f1_words,setF1_words] = useState(categories[index].f1_words);
    const [f2_words,setF2_words] = useState(categories[index].f2_words);
    const [f3_words,setF3_words] = useState(categories[index].f3_words);
    const [f4_words,setF4_words] = useState(categories[index].f4_words);
    const [f5_words,setF5_words] = useState(categories[index].f5_words);
    const [f1_exists,setF1_exists] = useState(categories[index].f1_exists);
    const [f2_exists,setF2_exists] = useState(categories[index].f2_exists);
    const [f3_exists,setF3_exists] = useState(categories[index].f3_exists);
    const [f4_exists,setF4_exists] = useState(categories[index].f4_exists);
    const [f5_exists,setF5_exists] = useState(categories[index].f5_exists);

    const [f1,setF1] = useState(true);
    const [f2,setF2] = useState(true);
    const [f3,setF3] = useState(true);
    const [f4,setF4] = useState(true);
    const [f5,setF5] = useState(true);

    const [checked,setChecked] = useState(true);

    let { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [platform, setPlatform] = useState("");
    const [category, setCategory] = useState("");
    const [reviews, setReviews] = useState([]);
    const [sentiment, setSentiment] = useState(0);
    const [similarity, setSimilarity] = useState(0);
    const [topPositiveReviews, setTopPositiveReviews] = useState([]);
    const [topNegativeReviews, setTopNegativeReviews] = useState([]);
    const [f1Sentiment, setF1Sentiment] = useState(0);
    const [f1Positive,setF1Positive] = useState([]);
    const [f1Negative,setF1Negative] = useState([]);
    const [f1Percentage,setF1Percentage] = useState(0);
    const [f1PositiveCount,setF1PositiveCount] = useState(0);
    const [f1NegativeCount,setF1NegativeCount] = useState(0);
    const [f2Sentiment, setF2Sentiment] = useState(0);
    const [f2Positive,setF2Positive] = useState([]);
    const [f2Negative,setF2Negative] = useState([]);
    const [f2Percentage,setF2Percentage] = useState(0);
    const [f2PositiveCount,setF2PositiveCount] = useState(0);
    const [f2NegativeCount,setF2NegativeCount] = useState(0);    
    const [f3Sentiment, setF3Sentiment] = useState(0);
    const [f3Positive,setF3Positive] = useState([]);
    const [f3Negative,setF3Negative] = useState([]);
    const [f3Percentage,setF3Percentage] = useState(0);
    const [f3PositiveCount,setF3PositiveCount] = useState(0);
    const [f3NegativeCount,setF3NegativeCount] = useState(0);
    const [f4Sentiment, setF4Sentiment] = useState(0);    
    const [f4Positive,setF4Positive] = useState([]);
    const [f4Negative,setF4Negative] = useState([]);
    const [f4Percentage,setF4Percentage] = useState(0);
    const [f4PositiveCount,setF4PositiveCount] = useState(0);
    const [f4NegativeCount,setF4NegativeCount] = useState(0);
    const [f5Sentiment, setF5Sentiment] = useState(0);    
    const [f5Positive,setF5Positive] = useState([]);
    const [f5Negative,setF5Negative] = useState([]);
    const [f5Percentage,setF5Percentage] = useState(0);
    const [f5PositiveCount,setF5PositiveCount] = useState(0);
    const [f5NegativeCount,setF5NegativeCount] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [favProductsID,setFavProductsID] = useState([]);
    const [favourited,setFavourited] = useState(false);
    const [associatedProducts, setAssociatedProducts] = useState([]);

    const [tabValue, setTabValue] = React.useState(0);



    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleRedirect = () => {
        window.open(
            url,
            '_blank'
        );
    }

    const checkDirectVisit = () => {
        if (state === null ){
            console.log('Direct Visit')
        }
        else{
            console.log("checked?")
            console.log(state.checked)
            if (state.checked === false){
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].cat === cat){
                        setF1(categories[i].features.f1);
                        setF2(categories[i].features.f2);
                        setF3(categories[i].features.f3);
                        setF4(categories[i].features.f4);
                        setF5(categories[i].features.f5);
                    }
                }
            }
            else{
                setF1(state.f1);
                setF2(state.f2);
                setF3(state.f3);
                setF4(state.f4);
                setF5(state.f5);
                setChecked(state.checked);
            }
        }
    }


    const getProductRequest = async () => {
        try{
            setLoaded(false);
            checkDirectVisit();
            const res = await fetch(
                `/product/${id}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        f1: f1,
                        f2: f2,
                        f3: f3,
                        f4: f4,
                        f5: f5,
                    })
                }
            );

            const js = await res.json();
            const json = js.product;
            console.log(js.product);
            setName(json.name);
            setPrice(json.price);
            setUrl(json.url);
            setImageUrl(json.image_url);
            setDescription(json.description);
            setPlatform(json.platform);
            setCategory(json.category);
            setReviews(json.reviews);
            setSentiment(json.sentiment);
            setSimilarity(json.similarity);
            setF1Sentiment(json.f1_sentiment);
            setF1Percentage(json.f1_percentage);
            setF1Positive(json.f1_positive);
            setF1Negative(json.f1_negative);
            setF1PositiveCount(json.f1_positive_count);
            setF1NegativeCount(json.f1_negative_count);
            setF2Sentiment(json.f2_sentiment);
            setF2Percentage(json.f2_percentage);
            setF2Positive(json.f2_positive);
            setF2Negative(json.f2_negative);
            setF2PositiveCount(json.f2_positive_count);
            setF2NegativeCount(json.f2_negative_count);
            setF3Sentiment(json.f3_sentiment);
            setF3Percentage(json.f3_percentage);
            setF3Positive(json.f3_positive);
            setF3Negative(json.f3_negative);
            setF3PositiveCount(json.f3_positive_count);
            setF3NegativeCount(json.f3_negative_count);
            setF4Sentiment(json.f4_sentiment);
            setF4Percentage(json.f4_percentage);
            setF4Positive(json.f4_positive);
            setF4Negative(json.f4_negative);
            setF4PositiveCount(json.f4_positive_count);
            setF4NegativeCount(json.f4_negative_count);
            setF5Sentiment(json.f5_sentiment);
            setF5Percentage(json.f5_percentage);
            setF5Positive(json.f5_positive);
            setF5Negative(json.f5_negative);
            setF5PositiveCount(json.f5_positive_count);
            setF5NegativeCount(json.f5_negative_count);
            setAssociatedProducts(js.associated_products);
            setLoaded(true);
    
        }catch(error){
            console.log(error);
        }
    };

    const getFavouriteProductsID = async () => {
        try{
            const res = await fetch(
                '/checkfav',
                {
                    method: "GET",
                    mode: "cors",
                    credentials: 'same-origin',
                }
            );

            const json = await res.json();
            console.log(json.fav_product_ids);
            setFavProductsID(json.fav_product_ids);
            console.log(favProductsID[0]);
    
        }catch(error){
            console.log(error);
        }
    };

    const handleFavouriteIcon = () => {
        for (let i=0; i < favProductsID.length; i++){
            const found = favProductsID.includes(id);
            console.log(id);
            setFavourited(found);
            console.log(found);
        }
    }

    // add or remove favourited products
    const handleFavourite = async () => {

        if (logged===false){
            setSignInModalIsOpen(true);
        }

        else{
            setFavourited(!favourited);
            try{
                const res = await fetch(
                    '/updatefavlist',
                    {
                        method: "POST",
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            name: name,
                            price: price,
                            url: url,
                            image_url: imageUrl,
                        })
                    }
                );
                console.log(res.status)
            }catch(error){
                console.log(error);
            }
        }
    };

    const months = {
        0: '01',
        1: '02',
        2: '03',
        3: '04',
        4: '05',
        5: '06',
        6: '07',
        7: '08',
        8: '09',
        9: '10',
        10: '11',
        11: '12'
      }
 
    const handleRecentlyViewed = async () => {
        console.log('VIEWED...');

        try{
            const res = await fetch(
                '/updateviewedlist',
                {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        id: id,
                        name: name,
                        price: price,
                        url: url,
                        image_url: imageUrl,
                    })
                }
            );
            console.log(res.status)
        }catch(error){
            console.log(error);
        }

    };


    useEffect(() => {
        checkDirectVisit();
        getProductRequest();
        getFavouriteProductsID();
    },[id]);   

    useEffect(() => {
        for (let i = 0; i < categories.length; i++){
            if (category == categories[i].cat){
                setF1_name(categories[i].f1_name);
                setF2_name(categories[i].f2_name);
                setF3_name(categories[i].f3_name);
                setF4_name(categories[i].f4_name);
                setF5_name(categories[i].f5_name);
                setF1_words(categories[i].f1_words);
                setF2_words(categories[i].f2_words);
                setF3_words(categories[i].f3_words);
                setF4_words(categories[i].f4_words);
                setF5_words(categories[i].f5_words);
                setF1_exists(categories[i].f1_exists);
                setF2_exists(categories[i].f2_exists);
                setF3_exists(categories[i].f3_exists);
                setF4_exists(categories[i].f4_exists);
                setF5_exists(categories[i].f5_exists);
            }

        } 
    },[category]); 
    

    useEffect(()=>{
        handleRecentlyViewed();
    },[imageUrl]);


    useEffect(()=>{
        handleFavouriteIcon();
    },[favProductsID]); 

    useEffect(()=>{
        getProductRequest();
    },[f1]); 

    useEffect(()=>{
        getProductRequest();
    },[f2]); 

    useEffect(()=>{
        getProductRequest();
    },[f3]); 

    useEffect(()=>{
        getProductRequest();
    },[f4]); 

    useEffect(()=>{
        getProductRequest();
    },[f5]);  


    return(
        <Container>
            {loaded? loaded: 
                <CircularContainer>
                    <CircularProgress color="inherit"/>
                </CircularContainer>
            }
            {loaded == true && (
                <div>
                <Info>
                    <ImgContainer>
                        <Image src={imageUrl} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{name}</Title>
                        <DescWrapper>
                            <Desc>{description}</Desc>
                        </DescWrapper>
                        <Price>{price}</Price>
                        <ButtonContainer>
                            <RedirectButton onClick={handleRedirect}>Purchase</RedirectButton>
                            <FavContainer onClick={handleFavourite}>
                                {favourited
                                ? <FavoriteOutlined color="secondary"/>
                                : <FavoriteBorderOutlined/>
                                }
                            </FavContainer>
                        </ButtonContainer>
                    </InfoContainer>
                </Info>
                <Rev>
                    <FeatureContainer>
                        <FeatureTitle>Feature-Related Reviews ({(f1PositiveCount+f1NegativeCount+f2PositiveCount+f2NegativeCount+f3PositiveCount+f3NegativeCount+f4PositiveCount+f4NegativeCount+f5PositiveCount+f5NegativeCount)})</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>
                        <Bar
                            data={{
                                labels: [f1_name,f2_name,f3_name,f4_name,f5_name],
                                datasets: [
                                    {
                                        label: 'Related Reviews(%)',
                                        data: [f1Percentage,f2Percentage,f3Percentage,f4Percentage,f5Percentage],
                                        backgroundColor: 'black',
                                    },
                                    {
                                        label: 'Positive Reviews (%)',
                                        data: [
                                            (f1PositiveCount/(f1PositiveCount+f1NegativeCount+1)*f1Percentage).toFixed(2),
                                            (f2PositiveCount/(f2PositiveCount+f2NegativeCount+1)*f2Percentage).toFixed(2),
                                            (f3PositiveCount/(f3PositiveCount+f3NegativeCount+1)*f3Percentage).toFixed(2),
                                            (f4PositiveCount/(f4PositiveCount+f4NegativeCount+1)*f4Percentage).toFixed(2),
                                            (f5PositiveCount/(f5PositiveCount+f5NegativeCount+1)*f5Percentage).toFixed(2),                                            
                                        ],
                                        backgroundColor: 'rgb(167, 0, 0)',
                                    },
                                    {
                                        label: 'Negative Reviews (%)',
                                        data: [
                                            (f1NegativeCount/(f1PositiveCount+f1NegativeCount+1)*f1Percentage).toFixed(2),
                                            (f2NegativeCount/(f2PositiveCount+f2NegativeCount+1)*f2Percentage).toFixed(2),
                                            (f3NegativeCount/(f3PositiveCount+f3NegativeCount+1)*f3Percentage).toFixed(2),
                                            (f4NegativeCount/(f4PositiveCount+f4NegativeCount+1)*f4Percentage).toFixed(2),
                                            (f5NegativeCount/(f5PositiveCount+f5NegativeCount+1)*f5Percentage).toFixed(2),                                            
                                        ],
                                        backgroundColor: 'rgb(0, 5, 120)',                                          
                                    }
                                    
                                ],
                            }}
                            height={150}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales:{
                                    yAxes:[
                                        {
                                            ticks:{
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                }
                            }}
                        />
                    </FeatureContainer>


                    <AppBar sx={{ color:"black", bgcolor: "white", boxShadow: "none", marginLeft: "10px", marginRight:"40px"}} position="static">
                        <Tabs backgroundColor="black" textColor="black" value={tabValue} onChange={handleTabChange} centered>
                            {(f1===true||checked===false) && f1_exists ?<Tab label={f1_name}/>:<div></div>}
                            {(f2===true||checked===false) && f2_exists ?<Tab label={f2_name}/>:<div></div>}
                            {(f3===true||checked===false) && f3_exists ?<Tab label={f3_name}/>:<div></div>}
                            {(f4===true||checked===false) && f4_exists ?<Tab label={f4_name}/>:<div></div>}
                            {(f5===true||checked===false) && f5_exists ?<Tab label={f5_name}/>:<div></div>}
                        </Tabs>
                    </AppBar>
                      
                    {tabValue === 0 && f1Percentage>0 && (f1===true||checked===false) && (f1_exists===true) &&(
                    <FeatureContainer>
                        <FeatureTitle>{(f1PositiveCount+f1NegativeCount)} Review(s) Related to "{f1_name}"</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{f1Sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={f1Sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>
                        <PolarityContainer>
                            <PolarityTitle>Positive Reviews ({f1PositiveCount})</PolarityTitle>
                            <PolarityRev>
                            {f1Positive.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f1_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f1_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                        <PolarityContainer>
                            <PolarityTitle>Negative Reviews ({f1NegativeCount})</PolarityTitle>
                            <PolarityRev>
                            {f1Negative.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f1_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f1_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                    </FeatureContainer>
                    )
                    }
                    {tabValue === 1 && f2Percentage>0 && (f2===true||checked===false) && (f2_exists===true) && (
                    <FeatureContainer>
                        <FeatureTitle>{(f2PositiveCount+f2NegativeCount)} Review(s) Related to "{f2_name}"</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{f2Sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={f2Sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>                        
                        <PolarityContainer>
                            <PolarityTitle>Positive Reviews ({f2PositiveCount})</PolarityTitle>
                            <PolarityRev>
                            {f2Positive.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f2_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f2_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                        <PolarityContainer>
                            <PolarityTitle>Negative Reviews ({f2NegativeCount})</PolarityTitle>
                            <PolarityRev>
                            {f2Negative.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f2_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f2_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                    </FeatureContainer>
                    )
                    }
                    {tabValue === 2 && f3Percentage>0 && (f3===true||checked===false) && (f3_exists===true) && (
                    <FeatureContainer>
                        <FeatureTitle>{(f3PositiveCount+f3NegativeCount)} Review(s) Related to "{f3_name}"</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{f3Sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={f3Sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>                        
                        <PolarityContainer>
                            <PolarityTitle>Positive Reviews ({f3PositiveCount})</PolarityTitle>
                            <PolarityRev>
                            {f3Positive.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f3_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f3_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                        <PolarityContainer>
                            <PolarityTitle>Negative Reviews ({f3NegativeCount})</PolarityTitle>
                            <PolarityRev>
                            {f3Negative.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f3_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f3_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                    </FeatureContainer>
                    )
                    }
                    { tabValue === 3 && f4Percentage>0 && (f4===true||checked===false) && (f4_exists===true) && (
                    <FeatureContainer>
                        <FeatureTitle>{(f4PositiveCount+f4NegativeCount)} Review(s) Related to "{f4_name}"</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{f4Sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={f4Sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>                        
                        <PolarityContainer>
                            <PolarityTitle>Positive Reviews ({f4PositiveCount})</PolarityTitle>
                            <PolarityRev>
                            {f4Positive.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f4_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f4_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                        <PolarityContainer>
                            <PolarityTitle>Negative Reviews ({f4NegativeCount})</PolarityTitle>
                            <PolarityRev>
                            {f4Negative.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f4_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f4_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                    </FeatureContainer>
                    )
                    }
                    {tabValue === 4 && f5Percentage>0 && (f5===true||checked===false) && (f5_exists===true) && (
                    <FeatureContainer>
                        <FeatureTitle>{(f5PositiveCount+f5NegativeCount)} Review(s) Related to "{f5_name}"</FeatureTitle>
                        <ScoreContainer>
                            <FeatureScore>{f5Sentiment.toFixed(2)}</FeatureScore>
                            <RatingContainer>
                                <Rating name="half-rating-read" defaultValue={f5Sentiment} precision={0.25} readOnly />
                            </RatingContainer>
                        </ScoreContainer>                        
                        <PolarityContainer>
                            <PolarityTitle>Positive Reviews ({f5PositiveCount})</PolarityTitle>
                            <PolarityRev>
                            {f5Positive.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f5_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f5_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                        <PolarityContainer>
                            <PolarityTitle>Negative Reviews ({f5NegativeCount})</PolarityTitle>
                            <PolarityRev>
                            {f5Negative.map(review => (
                                <Review>
                                    <User>{review.username}</User>
                                    <Content>
                                        <Highlighter
                                        searchWords={f5_words}
                                        autoEscape={true}
                                        caseSensitive={false}
                                        textToHighlight={review.content}
                                        highlightStyle={{backgroundColor:'white', fontWeight:'700'}}
                                        />
                                    </Content>
                                    <div>Sentiment Score: {review.f5_sentiment}</div>
                                </Review>   
                            ))}
                            </PolarityRev>
                        </PolarityContainer>
                    </FeatureContainer>
                    )
                    }
                </Rev>
                {associatedProducts.length>0
                ? 
                <Recommendation>
                    <RecommendationTitle>You May Also Like</RecommendationTitle>
                    <RecommendedProductsContainer>
                    {associatedProducts.map(ap=>(
                        <RecommendedProductCard
                        id={ap.id} name={ap.name} price={ap.price} image_url={ap.image_url} sentiment={ap.sentiment} category={ap.category}
                        logged={logged} 
                        />
                    ))}
                    </RecommendedProductsContainer>
                </Recommendation>
                :<div></div>}
            </div>
            )          
            }
        </Container>
    )
}

export default ProductInfo