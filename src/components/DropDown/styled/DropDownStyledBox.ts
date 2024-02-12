import styled from "@emotion/styled";

type DropDownBoxProps = {
  type: "text" | "label"
}

export const DropDownBox = styled.ul<DropDownBoxProps>(
  {
    margin: "0 auto",
    zIndex: 10000,
    position: "relative",
  },
  props => ({
    width: props.type === "text" ? "150px" : "80px"
  })
)