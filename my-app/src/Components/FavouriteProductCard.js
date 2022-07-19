import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../dummies";

const Container = styled.div`
    border: 2px solid #ccc;
    padding: 20px;
    display: flex;
    width: 100%;
    height: 25vh;
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
    cursor: pointer;
`

const InfoContainer = styled.div`
    flex: 3;
    padding-top: 10px;
    padding-right: 40px;
`
const Name = styled.div`
    padding-bottom: 10px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
`
const Price = styled.div`
    font-size: 16px;
    font-weight: 400;
`

const ButtonContainer = styled.div`
    flex: 1;
    padding-right: 20px;
    padding-top: 20px;
    justify-content: center;
`
const RedirectButton = styled.div`
    cursor: pointer;
    margin-top: 20px;
    height: 30px;
    color: rgb(255, 255, 255);
    background-color: black;
    border: 0px;
    padding-top: 8px;
    padding-bottom: 2px;    
    letter-spacing: 0.5px ;
    font-size: 15px;
    font-weight: 500;
    text-align: center ;
    &:hover{
        background-color: rgb(153, 0, 51);
    }
`


const RemoveButton = styled.div`
    cursor: pointer;
    margin-top: 20px;
    height: 30px;
    color: black;
    background-color: white;
    border: 2px solid black;
    padding-top: 8px;
    padding-bottom: 2px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
`


const FavouriteProductCard = (props) => {

    const category = props.category;
    const [f1,setF1] = useState(true);
    const [f2,setF2] = useState(true);
    const [f3,setF3] = useState(true);
    const [f4,setF4] = useState(true);
    const [f5,setF5] = useState(true);
    const [index,setIndex] = useState(0);
    console.log(category);

    useEffect(() => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].cat === category){
                setF1(categories[i].features.f1);
                setF2(categories[i].features.f2);
                setF3(categories[i].features.f3);
                setF4(categories[i].features.f4);
                setF5(categories[i].features.f5);
                setIndex(i);
            }
        }
    },[]); 

    const handleRedirect = () => {
        window.open(
            props.url,
            '_blank'
        );
    }

    const handleRemove = async () => {
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
                    })
                }
            );
            window.location.reload(true);

        }catch(error){
            console.log(error);
        }
    }

    return(
        <Container>
            <ImageContainer>
                <Link to={`/product/${props.id}`} style={{textDecoration:'none', color:'black'}}
                    state={{f1:f1,f2:f2,f3:f3,f4:f4,f5:f5, category:category, index:index, logged:true}}
                >                
                    <Image src={props.image_url}></Image>
                </Link>
            </ImageContainer>
            <InfoContainer>
                <Link to={`/product/${props.id}`} style={{textDecoration:'none', color:'black'}}
                    state={{f1:f1,f2:f2,f3:f3,f4:f4,f5:f5, category:category, index:index, logged:true}}                
                >
                    <Name>{props.name}</Name>
                </Link>
                <Price>{props.price}</Price>
            </InfoContainer>
            <ButtonContainer>
                <RedirectButton onClick={handleRedirect}>PURCHASE</RedirectButton>
                <RemoveButton onClick={handleRemove}>REMOVE</RemoveButton>
            </ButtonContainer>
        </Container>
    )
}

export default FavouriteProductCard