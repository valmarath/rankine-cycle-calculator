import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 0.5em;
    ${props => props.first === true && `
        border-bottom: 2px solid #0060BF;
`}
`;

export const Label = styled.h4`
    color: #F0F8FE;
    margin: 0.5em 0;
    height: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Select = styled.select`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0060BF;
    font-size: 1em;
    text-align: center;
    border: none;
    color: #F0F8FE;
    padding: 5px;
    border-radius: 1vh;
    width: fit-content;
    padding: .2em 0;
    width: 6em;
    color: #F0F8FE;
    height: 1.7em;
    cursor: pointer;
    outline: none;
`;