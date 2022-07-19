import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
    /* flex:1; */
    width: 500px;
    margin: 3px;
    height: 70vh;
    position: relative;
`;

const Image = styled.img`
    width:100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 10px;
    letter-spacing: 1px;
    font-family: "Bahnschrift";
`;

const Button = styled.button`
cursor: pointer;
    flex: 5;
    margin-top: 20px ;
    width: 100% ;
    background-color: white;
    cursor: pointer;
    padding: 5px;
    letter-spacing: 0.5px ;
    font-size: 15px;
    font-weight: 600;
    &:hover{
        transform: scale(1.1);
    }
`;


const CategoryCard = ({item}) => {
    return(
        <Container>
            <Image src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Link to='/products' state={{category:item.cat, index:item.index}}>
                    <Button>SHOP NOW</Button>   
                </Link>
            </Info>
        </Container>
    )
}

export default CategoryCard