import styled from "styled-components";

export const Container = styled.div`
    width: auto; 
    max-width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 25px 0;

    @media (max-width: 900px) {
        flex-direction: column;
        max-width: 100%;        
        width: 100%;
    }
    @media (max-width: 700px) {
        padding: 0;
    }
`;

export const HeaderArea = styled.header`
    width: 100%; 
    padding: 5px 0;
    background-color: #007AF1;
    border-bottom: 5px solid #0060BF;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
`;

export const HeaderImg = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const ChangeCycle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }
`;

export const CycleSelector = styled.div`
    display: none;
`;

export const CalcCycle = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-bottom-left-radius: 3vh;
    @media (max-width:800px) {
        flex-direction: column;
    }
`;

export const InputSide = styled.div`
    flex: 1;
    background-color: #007AF1;
    border-bottom-left-radius: 3vh;
`;

export const ResultSide = styled.div`
    flex: 1;
    background-color: #007AF1;
    border-left: 6px solid #0060BF;
    @media (max-width: 800px) {
        border-left: none;
        border-top: 6px solid #0060BF;
    }
    border-bottom-right-radius: 3vh;
`;