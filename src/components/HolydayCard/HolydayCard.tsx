import styled from "@emotion/styled"

const HolydayStyledCard = styled.div`
    padding: 5px;
    background-color: green;
    color: #fff;
`

export default function HolydayCard({ name }: { name: string }) {
    return (
        <HolydayStyledCard >
            {name}
        </HolydayStyledCard>
    )
}
