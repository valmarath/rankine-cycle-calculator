import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: .4em 0;
`;

export const Label = styled.h4`
    color: #F0F8FE;
    margin: 0.5em 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
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
    color: #F0F8FE;
    height: 1.3em;
    cursor: pointer;
    outline: none;
    color: #F0F8FE;
    ::placeholder {
        color: #F0F8FE;
    }
`;