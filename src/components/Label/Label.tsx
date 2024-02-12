import styled from '@emotion/styled'
import { LabelTypes } from '../../redux/types/task.types'

const LabelDiv = styled.li<LabelProps>(
    {
        height: "13px",
        borderRadius: "4px",
        width: "70px"
    },
    props => ({
        backgroundColor: props.color,
        filter: `${props.disable ? "grayscale(0.5)" : "none"}`,
        opacity: `${props.disable ? "0.5 " : "1"}`,
    })
)
type LabelProps = {
    color: LabelTypes
    onClickHandler?: (label: LabelTypes) => void;
    disable?: boolean
}

export default function Label({ color, onClickHandler, disable = false, }: LabelProps) {
    return (
        <LabelDiv
            color={color}
            onClick={() => {
                onClickHandler && onClickHandler(color)
            }}
            disable={disable}
        ></LabelDiv >
    )
}