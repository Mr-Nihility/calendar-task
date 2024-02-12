import styled from '@emotion/styled'

type CalendarCellStyledProps = {
    isActive: boolean
}
export const CalendarCellStyled = styled.div<CalendarCellStyledProps>(
    {
        position: "relative",
        borderRadius: "4px",
        backgroundColor: "#E3E4E6",

        minHeight: "10%",
        padding: "20px",
        overflowY: "auto",
    },
    props => ({
        border: `2px solid ${props.isActive ? "green" : "#ebebeb"}`
    })

)
