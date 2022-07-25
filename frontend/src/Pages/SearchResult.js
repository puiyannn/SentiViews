import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import RecommendedProductCard from "../Components/RecommendedProductCard";
import { CircularProgress, Pagination } from "@mui/material";

const Container = styled.div`
`;

const Wrapper = styled.div`
    display: flex;
    padding-left: 90px;
    padding-right: 100px ;
    margin-top: 20px ;
`;

const ProductsContainer = styled.div`
    margin-top: 20px;
    display: flex ;
    flex-wrap: wrap;
`;

const Message = styled.div`
    padding-left: 63px;
    margin-top: 20px;   
    font-size: 18px;
    color: rgb(128,128,128);
`

const SmallMessage = styled.div`
    padding-left: 63px;
    margin-top: 20px;
    color: rgb(128,128,128);
`

const CircularContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;


const SearchResult = () => {
    const location = useLocation();
    const {state} = location;
    const searchTerm = state.searchTerm;

    const [products, setProducts] = useState([]);
    const [productAmount, setProductAmount] = useState(0);
    const [load, setLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [logged,setLogged] = useState(false);

    const getSearchResult = async () => {
        try{
            const res = await fetch(
                `/search/${searchTerm}/${pageNumber}`,
                {
                    type: "GET",
                }
            );

            const json = await res.json();
            setProducts(json.products);
            setProductAmount(json.amount);
            console.log(products);
            setLoad(false);
    
        }catch(error){
            console.log(error);
        }
    }

    const handlePagination = (event, page) => {
        setPageNumber(page);
    }

    const getLogStatus = async () => {
        try{
            const res = await fetch(
                '/logstatus',
                {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'same-origin',
                }
            );

            const json = await res.json();
            setLogged(json.status);
            console.log(logged);
    
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getSearchResult();
        getLogStatus();
    },[pageNumber]);

    useEffect(()=>{
        getSearchResult();
        getLogStatus();
    },[searchTerm])

    return(
        <Container>
            {products.length<=0 && load==false? <Message>Your search "{searchTerm}" does not match any product.</Message>
            :<SmallMessage>{productAmount} products found</SmallMessage>}
            <Wrapper>
            {load?<CircularContainer><CircularProgress color="inherit"/></CircularContainer>:<div></div>}
            <ProductsContainer>              
                {products.map(product=>(
                    <RecommendedProductCard
                        id={product._id.$oid} name={product.name} price={product.price} image_url={product.image_url} sentiment={product.sentiment} category={product.category}
                        logged={logged} 
                    />                    
                ))}
            </ProductsContainer>
        </Wrapper>
        {load==false &&
                <Pagination page={pageNumber} count={Math.ceil((productAmount/21))} shape="rounded" onChange={handlePagination} size="large" style={{marginBottom:"60px",display:"flex",justifyContent:"center"}}/>
            }
        </Container>
    )
}

export default SearchResult