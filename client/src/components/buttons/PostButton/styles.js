import styled from "styled-components";

export const Container = styled.div`
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
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding: 8px;
    cursor: pointer;
    :hover {
        background-color: #F3C01C;
        opacity: 0.9;
    }
    transition: ease-in-out 0.4s;
    margin-left: 10px;
`;

export const Label = styled.h4`
    font-size: 1.1em;
    margin: 0;
`;
