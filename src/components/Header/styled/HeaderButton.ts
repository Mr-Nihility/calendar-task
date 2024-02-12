import styled from "@emotion/styled";

export const HeaderButton = styled.button<{ isActive: boolean }>(
    `

border: 1px solid #fff ;
border-radius: 4px ;
padding: 5px 10px;
min-width: 100px;

`,
    props => ({
        backgroundColor: `${props.isActive ? "#fff" : "transparent"}`,
        color: `${props.isActive ? "#fe9903" : "#fff"}`
    })


)