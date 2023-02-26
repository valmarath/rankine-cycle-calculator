import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

export const Label = styled.h4`

`;

export const Select = styled.select`

`;