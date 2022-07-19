import React, { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Link, Navigate} from 'react-router-dom';
import { FavoriteBorderOutlined, FavoriteOutlined, SearchOutlined } from "@material-ui/icons";
import { Rating } from "@mui/material";
import { categories } from "../dummies";
import { SignInModalContext } from "../Helper/Context";

const Search = styled.div`
    padding-left: 20.5px !important;
    padding-right: 20.5px !important;
    opacity: 0;
    width: 90%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex; 
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const CardContainer = styled.div`
    margin-bottom: 120px;
    width: 33.33%;
    min-width: 430px;
    min-height: 65vh;
    position: relative;
    &:hover ${Search}{
        opacity: 1;
  }
`;

const Card = styled.div`
    margin-left: 20.5px !important;
    margin-right: 20.5px !important;
    padding-left: 10px;
    padding-right: 10px;
`

const ImageContainer = styled.div`
    align-items: center;
    justify-content: center;
    padding-left: 50px;
    padding-right: 50px;
    min-height: 350px;
`

const Image = styled.img`
    padding-top: 30px;
    margin: auto;
    display: block; 
    height: 100%;
    max-width: 280px;
    object-fit: contain;
`

const InfoContainer = styled.div`
    padding-top: 30px ;
    padding-left: 15px;
    padding-right: 15px;
`

const Name = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
    padding-left: 3px;
    text-align: justify ;
`

const Price = styled.div`
    font-size: 18px;
    padding-left: 3px;
    margin-bottom: 5px;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: white;
        transform: scale(1.2);
    }
`;

const RecommendedProductCard = (props) => {

    const [index,setIndex] = useState(0);
    const [f1,setF1] = useState(false);
    const [f2,setF2] = useState(false);
    const [f3,setF3] = useState(false);
    const [f4,setF4] = useState(false);
    const [f5,setF5] = useState(false);
    const [favProductsID,setFavProductsID] = useState([]);
    const [favourited,setFavourited] = useState(false);
    const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);

    const handleFavourite = async () => {

        if (props.logged===false){
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
                            id: props.id,
                            name: props.name,
                            price: props.price,
                            url: props.url,
                            image_url: props.image_url,
                        })
                    }
                );
                console.log(res.status)
            }catch(error){
                console.log(error);
            } 
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
            setFavProductsID(json.fav_product_ids);
    
        }catch(error){
            console.log(error);
        }
    };

    const handleFavouriteIcon = () => {

        for (let i=0; i < favProductsID.length; i++){
            const found = favProductsID.includes(props.id);
            console.log(props.id);
            setFavourited(found);
            console.log(found);
        }
    }


    useEffect(()=>{
        for (let i = 0; i < categories.length; i++){
            if (props.category == categories[i].cat){
                setIndex(categories[i].index);
                setF1(categories[i].features.f1);
                setF2(categories[i].features.f2);
                setF3(categories[i].features.f3);
                setF4(categories[i].features.f4);
                setF5(categories[i].features.f5);
            }

        } 
    },[])

    
    return(
        <CardContainer>         
            <Card>
                <ImageContainer>
                    <Image src={props.image_url}/>
                </ImageContainer>
                <InfoContainer>
                    <Name>{props.name}</Name>
                    <Price>{props.price}</Price>
                    <Rating name="half-rating-read" defaultValue={3.66+(1.36*props.sentiment)+0.228} precision={0.25} readOnly
                    sx={{
                        "& .MuiRating-iconFilled": {
                          color: "rgb(153, 0, 51)"
                        },
                        fontSize: "1.2rem",
                    
                    }}/>
                </InfoContainer>
            </Card>
            <Search>
                <Link 
                to={`/product/${props.id}`}  
                state={{f1:props.f1, f2:props.f2, f3:props.f3, f4:props.f4, f5:props.f5, checked:false, directLink:false, category:props.category, index:index, logged:props.logged}}
                style={{color:'black'}}
                >
                    <Icon>
                        <SearchOutlined />
                    </Icon>
                </Link>
                <Icon onClick={handleFavourite}>
                {favourited
                    ? <FavoriteOutlined color="secondary"/>
                    : <FavoriteBorderOutlined/>
                }        
                </Icon>
            </Search>
        </CardContainer>

    )
    
};

export default RecommendedProductCard;