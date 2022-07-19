import React from 'react'
import ProductCard from './ProductCard';
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { FilterListOutlined } from '@material-ui/icons';
import { CircularProgress, IconButton, InputBase, Pagination, Paper, Stack} from '@mui/material';
import {FormLabel} from '@mui/material';
import {FormGroup} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
import { Link, useParams, useLocation } from "react-router-dom";
import { categories } from '../dummies';
import { ComparisonContext } from '../Helper/Context';

const Container = styled.div`
    display: flex;
    padding-left: 20px;
    padding-right: 30px ;
    margin-top: 20px ;
`;

const SmallContainer = styled.div`
    display: flex;
    padding-left: 20px;
    padding-right: 30px ;
    margin-left: 30px;
`

const Button = styled.button`
    cursor: pointer;
    flex: 5;
    margin-top: 20px ;
    width: 100% ;
    color: rgb(255, 255, 255);
    background-color: black;
    border: 0px;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    &:hover{
        background-color: rgb(153, 0, 51);
  }
`

const FeatureContainer = styled.div`
    padding-left: 10px ;
    padding-right: 10px ;
    padding-top: 20px ;
    flex: 1;
`;

const Wrapper = styled.div`
    flex: 6;
    padding: 30px;
    position: relative ;
`


const ComparisonButton = styled.button`
    cursor: pointer;
    flex: 5;
    width: 13% ;
    color: rgb(255, 255, 255);
    background-color: black;
    border: 0px;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    position: absolute;
    right: 0;
    margin-right: 50px;
    margin-top: 5px;
    &:hover{
        background-color: rgb(153, 0, 51);
  }
`
const ProductsContainer = styled.div`
    margin-top: 60px;
    display: flex ;
    flex-wrap: wrap;
`;

const CircularContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;


const Products = () => {

    const {comparison, setComparison} = useContext(ComparisonContext);
    const {comparisonList} = useContext(ComparisonContext);
    const {compareButton, setCompareButton} = useContext(ComparisonContext);
    const location = useLocation();
    const {state} = location;
    const category = state.category;
    const index = state.index;
    const f1_name = categories[index].f1_name;
    const f2_name = categories[index].f2_name;
    const f3_name = categories[index].f3_name;
    const f4_name = categories[index].f4_name;
    const f5_name = categories[index].f5_name;
    const f1_exists = categories[index].f1_exists;
    const f2_exists = categories[index].f2_exists;
    const f3_exists = categories[index].f3_exists;
    const f4_exists = categories[index].f4_exists;
    const f5_exists = categories[index].f5_exists;
    const ff1 = categories[index].features.f1;
    const ff2 = categories[index].features.f2;
    const ff3 = categories[index].features.f3;
    const ff4 = categories[index].features.f4;
    const ff5 = categories[index].features.f5;

    const [load, setLoad] = useState(true);
    const [products, setProducts] = useState([]);
    const [checked,setChecked] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [productAmount, setProductAmount] = useState(0);

    const [feature,setFeature] = useState({
        f1: false,
        f2: false,
        f3: false,
        f4: false,
        f5: false,
    });

    const {f1, f2, f3, f4, f5} = feature;

    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchTerm(e) {
        setSearchTerm(e.target.value);
    }

    const getProductsRequest = async () => {

        if (checked===true){
            recByFeature();

        }else{
            setLoad(false);
            console.log(pageNumber);

            try{
                const res = await fetch(
                    `/products/${category}/${pageNumber}`,
                    {
                        type: "GET",
                    }
                );

                const json = await res.json();
                setProducts(json.products);
                setProductAmount(json.amount);
                setLoad(true);
        
            }catch(error){
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getProductsRequest();
        getLogStatus();
    },[pageNumber]);

    useEffect(() => {
        setComparison(false);
    },[]);

    const handleChange = (event) => {
        setFeature({
          ...feature,
          [event.target.name]: event.target.checked,
        });
      };


    const recByFeature = async () => {
        setChecked(true);
        try{
            setLoad(false);
            const res = await fetch(
                `/featured/${pageNumber}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        f1: f1,
                        f2: f2,
                        f3: f3,
                        f4: f4,
                        f5: f5,
                        category: category,
                    })
                }
            );

            const json = await res.json();
            setProducts(json.products);
            setLoad(true);
            setProductAmount(json.amount);
            console.log(json.products);
    
        }catch(error){
            console.log(error);
        }
    };

    const handleFilter = async () => {
        if (checked===false){
            try{
                setLoad(false);
                const res = await fetch(
                    `/searchInCategory`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            f1: ff1,
                            f2: ff2,
                            f3: ff3,
                            f4: ff4,
                            f5: ff5,
                            category: category,
                            searchTerm: searchTerm,
                        })
                    }
                );
    
                const json = await res.json();
                setProducts(json.products);
                setLoad(true);
                setProductAmount(json.amount);
                console.log(json.products);
        
            }catch(error){
                console.log(error);
            }
        }
        else{
            try{
                setLoad(false);
                const res = await fetch(
                    `/searchInCategory`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            f1: f1,
                            f2: f2,
                            f3: f3,
                            f4: f4,
                            f5: f5,
                            category: category,
                            searchTerm: searchTerm,
                        })
                    }
                );

                const json = await res.json();
                setProducts(json.products);
                setLoad(true);
                setProductAmount(json.amount);
                console.log(json.products);
        
            }catch(error){
                console.log(error);
        }}
    };

    const handlePagination = (event, page) => {
        console.log(page);
        setPageNumber(page);
    }

    const [logged,setLogged] = useState(false);

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

    
    return (
        <Container>
            <FeatureContainer>
                <FormGroup>
                <FormLabel component="legend">Features</FormLabel>
                {f1_exists===true && (
                    <FormControlLabel
                    control={
                    <Checkbox color="default" checked={f1} onChange={handleChange} name="f1" />
                    }
                    label={f1_name}
                />
                )}
                {f2_exists===true && (
                    <FormControlLabel
                    control={
                    <Checkbox color="default" checked={f2} onChange={handleChange} name="f2" />
                    }
                    label={f2_name}
                />
                )}
                {f3_exists===true && (
                    <FormControlLabel
                    control={
                    <Checkbox color="default" checked={f3} onChange={handleChange} name="f3" />
                    }
                    label={f3_name}
                />
                )}
                {f4_exists===true && (
                    <FormControlLabel
                    control={
                    <Checkbox color="default" checked={f4} onChange={handleChange} name="f4" />
                    }
                    label={f4_name}
                />
                )}
                {f5_exists===true && (
                    <FormControlLabel
                    control={
                    <Checkbox color="default" checked={f5} onChange={handleChange} name="f5" />
                    }
                    label={f5_name}
                />
                )}
                </FormGroup>
                <Button onClick={recByFeature}>Filter</Button>
            </FeatureContainer>
            <Wrapper>
                <SmallContainer>
                    <Paper variant="outlined"
                    component="form"
                    elevation="4"
                    
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 30}}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1, fontSize: "14px"}}
                        placeholder="Search within category"
                        onChange={handleSearchTerm}
                    />
                    <IconButton onClick={()=>{handleFilter();}} sx={{ p: '10px' }} aria-label="search">
                        <FilterListOutlined/>
                    </IconButton>
                    </Paper>
                    {comparison
                    ?<Link to='/comparison' 
                            state={{f1_name:f1_name,f2_name:f2_name,f3_name:f3_name,f4_name:f4_name,f5_name:f5_name,
                                f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,category:category,index:index,logged:logged, checked:checked
                            }}>
                        <ComparisonButton>Compare</ComparisonButton>
                    </Link>
                    :<ComparisonButton onClick={()=>{setComparison(true);}}>Compare Products</ComparisonButton>            
                    }
                </SmallContainer>
                <ProductsContainer>
                    {load? load: 
                        <CircularContainer>
                            <CircularProgress color="inherit"/>
                        </CircularContainer>}
                    {load==true &&
                    products.map(product=>(
                        <ProductCard
                        id={product._id.$oid} name={product.name} price={product.price} image_url={product.image_url} url={product.url} sentiment={product.sentiment}
                        f1={f1} f2={f2} f3={f3} f4={f4} f5={f5} checked={checked} category={product.category} index={index} logged={logged}
                        />
                    ))}
                </ProductsContainer>
                {load==true &&
                    <Pagination page={pageNumber} count={Math.ceil((productAmount/15))} shape="rounded" onChange={handlePagination} size="large" style={{marginBottom:"30px",display:"flex",justifyContent:"center"}}/>
                }
                </Wrapper>
        </Container>    
        )
    
};

export default Products