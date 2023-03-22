import styled from "styled-components";

export const Container = styled.div`
    width: 100%; 
    max-width: 1250px;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 50px 0;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

export const HeaderArea = styled.header`
    width: 100%; 
    padding: 5px 0;
    background-color: #007AF1;
    border-bottom: 5px solid #0060BF;
    border-top-right-radius: 3vh;
    border-top-left-radius: 3vh;
`;

export const HeaderImg = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const ChangeCycle = styled.div`
    display: flex;
    width: 30px;
    height: 30px;
    background-color: #F3C01C;
    cursor: pointer;
`;

export const CycleSelector = styled.div`
    display: none;
`;

export const CalcCycle = styled.div`
    display: flex;
    width: 100%;
    height: auto;
`;

export const InputSide = styled.div`
    flex: 1;
    background-color: #F5F5F7;
`;

export const ResultSide = styled.div`
    flex: 1;
    background-color: #2962FF;
`;