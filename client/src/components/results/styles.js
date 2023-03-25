import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    width: 70%;
    margin: 0 auto;
    text-align: center;
`;

export const Title = styled.h2`
    @media (max-width:600px) {
        padding-top: 0.5em;
        border-top: 2px solid #007AF1;    
    }
`;

export const Results = styled.div`

`;

export const Loading = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
`;
