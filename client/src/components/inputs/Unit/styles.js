import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    justify-content: center;
    align-items: center;
    flex: 1;
    padding-right: 0.3em;
`;

export const Label = styled.h4`
    color: #F0F8FE;
    margin: 0.5em 0;
    height: 3em;
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
    border-radius: 0.5em;
    width: fit-content;
    padding: .2em 0;
    width: 6em;
    color: #F0F8FE;
    height: 1.7em;
    cursor: pointer;
    outline: none;
`;