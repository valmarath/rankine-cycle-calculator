import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #007AF1;
    border-bottom-right-radius: 3vh;
    border-bottom-left-radius: 3vh;
    transition: ease-in-out 0.5s;
`;

export const Label = styled.h4`
    font-size: 1.5em;
    color: #F0F8FE;
    text-align: center;
    margin-bottom: 0.5em;
`;

export const Select = styled.select`
    background-color: #0060BF;
    font-size: 1.3em;
    text-align: center;
    border: none;
    color: #F0F8FE;
    padding: 5px;
    border-radius: 1vh;
    cursor: pointer;
    outline: none;
`;

export const Inputs = styled.div`
    display:flex;
    transition: ease-in-out 0.5s;
`;

export const InputItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 1vh;
    border: 1px solid #0060BF;
    cursor: pointer;
    margin: 10px;
    margin-top: 0px;
    p {
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
    }
    background-color: #0060BF;
    ${props => props.cycleProperties === true && `
    background-color: #F3C01C;
`}
    padding: 1vw;
    font-size: 1.3em;
    transition: ease-in-out 0.5s;
`;

export const SelectedCircle = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #0060BF;
    ${props => props.cycleProperties === true && `
    background-color: #0060BF;
`}
    margin: 10px 0;
`;

export const InputCircle = styled.input`

`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align:center;
    width: 30%;
    @media (max-width:900px) {
        width: 40%;
    }
    @media (max-width:600px) {
        width: 60%;
    }
    @media (max-width:500px) {
        width: 80%;
    }
`;

export const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align:center;
    height: auto;
    width: auto;
    color: #F0F8FE;
    background-color: #0060BF;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 1.5em;
    padding: 8px;
    cursor: pointer;
    :hover {
        background-color: #F3C01C;
        opacity: 0.9;
    }
    transition: ease-in-out 0.4s;
    margin-left: 10px;
`;


