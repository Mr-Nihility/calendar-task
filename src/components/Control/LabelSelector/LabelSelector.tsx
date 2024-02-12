import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LabelTypes } from "../../../redux/types/task.types";
import Label from "../../Label/Label";
import { LabelSelectorBox } from "./styled/LabelSelectorBox";


type LabelSelectorProps = {
    allLabels: LabelTypes[],
    currentItemLabel: LabelTypes[],
    rect: DOMRect,
    onClickHandler: (label: LabelTypes) => void;
    onClose: () => void
}
export default function LabelSelector({ allLabels, currentItemLabel, onClickHandler, rect, onClose }: LabelSelectorProps) {

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();

        }
        document.addEventListener("keyup", listener)
        return () => {
            document.removeEventListener("keyup", listener)
        }

    }, [onClose])

    return (
        <LabelSelectorBox top={rect.bottom - rect.height * 2 - rect.height / 2} left={rect.left} width={rect.width}>

            {!!allLabels.length && allLabels.map((label, i) => {
                return (
                    <Label
                        key={i}
                        onClickHandler={() => onClickHandler(label)}
                        color={label}
                        disable={currentItemLabel.includes(label)}
                    ></Label>
                )
            })}
            <div onClick={onClose}>
                <IoCloseSharp />
            </div>
        </LabelSelectorBox>
    )
}
