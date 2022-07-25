import React, { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Link, Navigate} from 'react-router-dom';
import { Favorite, FavoriteBorderOutlined, FavoriteOutlined, SearchOutlined } from "@material-ui/icons";
import { Checkbox, FormControlLabel, Rating } from "@mui/material";
import SignInModal from "./SignInModal";
import { SignInModalContext } from "../Helper/Context";
import { ComparisonContext } from "../Helper/Context";


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
    padding-left: 40px;
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
    padding-top: 40px ;
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

const RatingScore = styled.div`
    padding-left: 8px;
    font-weight: 500;
`

const RatingContainer = styled.div`
    display: flex;
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

const ProductCard = (props) => {

    const {comparison, setComparison} = useContext(ComparisonContext);
    const {compareButton, setCompareButton} = useContext(ComparisonContext);
    const {comparisonList} = useContext(ComparisonContext);
    const [favProductsID,setFavProductsID] = useState([]);
    const [favourited,setFavourited] = useState(false);
    const {signInModalIsOpen,setSignInModalIsOpen} = useContext(SignInModalContext);
    const [compare, setCompare] = useState(false);

    const{
        name,
        price,
        image_url,
        id,
        url,
        sentiment,
        f1,
        f2,
        f3,
        f4,
        f5,
        checked,
        category,
        index,
        logged
      } = props;


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

    useEffect(() => {
        getFavouriteProductsID();
    },[]);

    useEffect(()=>{
        handleFavouriteIcon();
    },[favProductsID]);

    const handleChange = (event) => {
        var exist = false;

        for (let i=0; i<comparisonList.length; i++) {
            if(props.id === comparisonList[i]){
                comparisonList.splice(i, 1);
                exist = true;
            }
        }

        if (exist===false){
            comparisonList.push(props.id);
        }

        console.log(comparisonList);
    };

    return(
        <CardContainer>
            {comparison?
            <FormControlLabel
                style={{
                    position:"absolute", 
                    right:"0px", 
                    '&:hover': {
                        backgroundColor: "transparent",
                    }
                }}
                control={
                    <Checkbox color="default" onChange={handleChange} name="comparison"/>
                }
                label=""
            />
            :comparison
            
            }
            
            <Card>
                <ImageContainer>
                    <Image src={props.image_url}/>
                </ImageContainer>
                <InfoContainer>
                    <Name>{props.name}</Name>
                    <Price>{props.price}</Price>
                    <RatingContainer>
                        <Rating name="half-rating-read" defaultValue={3.66+(1.36*props.sentiment)} precision={0.25} readOnly
                        sx={{
                            "& .MuiRating-iconFilled": {
                            color: "rgb(153, 0, 51)"
                            },
                            fontSize: "1.2rem",
                            paddingTop: "2px",

                        }}/>
                        <RatingScore>{(3.66+(1.36*props.sentiment)).toFixed(2)}</RatingScore>
                    </RatingContainer>
                </InfoContainer>
            </Card>
            <Search>
                <Link 
                to={`/product/${props.id}`}  
                state={{f1:f1,f2:f2,f3:f3,f4:f4,f5:f5, checked:checked, directLink:false, category:category, index:index, logged:logged}}
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

export default ProductCard;