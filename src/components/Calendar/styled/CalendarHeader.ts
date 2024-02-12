import styled from "@emotion/styled";

export const CalendarHeader = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
    color: grey;
    position: relative;
    font-size: 21px;
    &>div{
        padding: 5px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
`