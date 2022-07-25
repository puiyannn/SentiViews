import React, {useState, useEffect} from "react";
import styled from "styled-components";
import FavouriteProductCard from "../Components/FavouriteProductCard";

const Container = styled.div`
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 80px;
    margin-right: 120px ;
    margin-bottom: 30px ;
`

const Title = styled.h2`
    padding-left: 50px;
`

const Wrapper = styled.div`
    flex:1;
    padding-left: 50px;
    padding-right: 80px ;
    margin-top: 20px ;
    align-items: center;
    justify-content: center;
`;

const FavouriteList = () => {

    const [products, setProducts] = useState([]);

    const getFavouritesRequest = async () => {
        try{
            const res = await fetch(
                '/favourite',
                {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'same-origin',
                }
            );

            const json = await res.json();
            setProducts(json.products);        
            console.log(json.products);
    
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getFavouritesRequest();
    },[]);
    
    return(
        <Container>
            <Title>Wish List</Title>
            <Wrapper>
                {products.map(product=>(
                        <FavouriteProductCard id={product._id.$oid} name={product.name} price={product.price} image_url={product.image_url} url={product.url} category={product.category}/>
                    ))
                }
            </Wrapper>
        </Container>
    )

}

export default FavouriteList
