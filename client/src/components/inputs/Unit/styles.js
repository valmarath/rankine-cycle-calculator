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

`;

export const Select = styled.select`

`;