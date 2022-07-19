import React from 'react'
import styled from "styled-components";
import { categories } from '../dummies';
import CategoryCard from './CategoryCard';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: max-width;
`;


const Categories = () => {
    return <Container>
        {categories.map(item=>(
            <CategoryCard item={item}/>
        ))}
    </Container>
};

export default Categories