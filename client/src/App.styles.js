import styled from "styled-components";

export const Container = styled.div`
    width: 100%; 
    max-width: 900px;
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
    background-color: #FFFD4D;
`;

export const HeaderImg = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const ChangeCycle = styled.div`
    display: flex;
    width: 40px;
    background-color: black;
    cursor: pointer;
`;

export const CycleSelector = styled.div`
    display: none;
`;

export const CalcCycle = styled.div`
    display: flex;
    width: 100%;
    height: 750px;
`;

export const InputSide = styled.div`
    flex: 1;
    background-color: #F5F5F7;
`;

export const ResultSide = styled.div`
    flex: 1;
    background-color: #2962FF;
`;