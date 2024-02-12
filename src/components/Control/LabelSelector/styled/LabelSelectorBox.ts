import styled from "@emotion/styled";

type LabelSelectorBoxProps = {
    top: number
    left: number
    width: number
}
export const LabelSelectorBox = styled.ul<LabelSelectorBoxProps>(
    {
        position: "absolute",
        backgroundColor: "#fff",
        padding: '5px',
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
        height: "auto",
        zIndex: 200,
        border: "1px solid grey",
        borderRadius: "4px"
    },
    ({ top, left, width }) => ({
        top,
        left,
        width
    })
)