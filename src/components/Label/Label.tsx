import styled from '@emotion/styled'
import { LabelTypes } from '../../redux/types/task.types'



const LabelDiv = styled.li<LabelProps>(
    {
        height: "13px",
        borderRadius: "4px",
        width: "70px"
    },
    props => ({
        backgroundColor: props.color
    })
)
type LabelProps = {
    color: LabelTypes
}
export default function Label({ color }: LabelProps) {
    return (
        <LabelDiv color={color}></LabelDiv>
    )
}