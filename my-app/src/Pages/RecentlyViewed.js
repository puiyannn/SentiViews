import React, {useState, useEffect} from "react";
import styled from "styled-components";
import ViewedProductCard from "../Components/ViewedProductCard";

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

const RecentlyViewed = () => {

    const [products, setProducts] = useState([]);

    const parseTime = (time) => {
        const date = new Date();
        date.setTime(time);
        return date;
    }

    const getFavouritesRequest = async () => {
        try{
            const res = await fetch(
                '/viewed',
                {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'same-origin',
                }
            );

            const json = await res.json();

            const parseProduct = (product) => {
                product.date = parseTime(product.date.$date);
                return product;
            }
            const products = json.products.map(product => parseProduct(product));
            products.sort((a,b)=> b.date.getTime() - a.date.getTime())
            setProducts(products);        
            console.log(products);
    
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getFavouritesRequest();
    },[]);
    
    return(
        <Container>
            <Title>Recently Viewed</Title>
            <Wrapper>
                {products.map(product=>(
                        <ViewedProductCard id={product._id.$oid} name={product.name} price={product.price} image_url={product.image_url} url={product.url} category={product.category}/>
                    ))
                }
            </Wrapper>
        </Container>
    )
}

export default RecentlyViewed
