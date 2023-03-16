import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #007AF1;
`;

export const Label = styled.h4`

`;

export const Select = styled.select`

`;

export const Inputs = styled.div`
    display:flex;
`;

export const InputItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #000;
    cursor: pointer;
    margin: 10px;
    p {
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
    }
    background-color: #053378;
    ${props => props.cycleProperties === true && `
    background-color: #F3C01C;
`}
`;

export const SelectedCircle = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #053378;
    ${props => props.cycleProperties === true && `
    background-color: #053378;
`}
    margin: 10px 0;
`;

export const InputCircle = styled.input`

`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`

`;


