import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    margin-left: 15px;
    justify-content: center;
    align-items: center;
`;

export const Label = styled.h4`
    color: #F0F8FE;
    margin: 0.5em 0;
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
    padding: .2em 1.5em;
    color: #F0F8FE;
    height: 1.7em;
    cursor: pointer;
    outline: none;
`;