import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #F0F8FE;
    width: 100%;
    margin: 0 0;
    text-align: center;
    p {
        padding: 1em;
        font-size: 1.05em;
    }
`;

export const Title = styled.h2`
    @media (max-width:600px) {
        padding-top: 0.5em;
        border-top: 2px solid #007AF1;    
    }
`;

export const Loading = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
`;
