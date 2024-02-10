import styled from "@emotion/styled";

export const CalendarBox = styled.ul`
    background-color: aqua;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, minmax(1fr, auto));
    height: 100vh;
    position: relative;
`