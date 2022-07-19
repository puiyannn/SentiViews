import React, { useState } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { SearchOutlined } from "@material-ui/icons";

const Container = styled.div`
    height: 15vh ;
    border-bottom: 1px solid #ccc;
    margin-left: 30px;
    margin-right: 60px;
    display: flex;
    padding-top: 5px ;
    padding-left: 30px;
    align-items: center;
`

const Name = styled.h1`
    flex: 1;
    font-size: 42px;
    font-family: "Marker Felt";
    padding-top: 5px;

`

const SearchContainer = styled.div`
    flex: 2;
    display: flex;
    margin-right: 0;    
    height: 60px;
    align-items: center;
    justify-content: center;
`

const SearchTerm = styled.input`
    height: 23px;
    border: 1px solid black;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 6px;
    letter-spacing: 0.5px ;
    font-size: 14px;
    width: 80%;
    font-family: "Segoe UI";
    ::placeholder,
    ::-webkit-input-placeholder {
        color: darkgray ;
    }
`

const SearchButton = styled.button`
    height: 35px;
    width: 35px;
    color: rgb(255, 255, 255);
    background-color: black;
    cursor: pointer;
    border: 0px;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    margin-bottom: 0;
    &:hover{
        background-color: rgb(153, 0, 51);
    }
`

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchTerm(e) {
        setSearchTerm(e.target.value);
    }

    return(
        <Container>
                <Name>
                    <Link to="/" style={{textDecoration:'none', color:'black'}}>
                        SentiViews
                    </Link>
                </Name>
                <SearchContainer>
                    <SearchTerm type="text"  placeholder="Search for all brands or products"  onChange={handleSearchTerm}/>
                    <Link to='/search' state={{searchTerm:searchTerm}}>
                        <SearchButton>
                            <SearchOutlined sx={{ color: 'white'}}/>
                        </SearchButton>   
                    </Link>
                </SearchContainer>
        </Container>
    )
};

export default SearchBar