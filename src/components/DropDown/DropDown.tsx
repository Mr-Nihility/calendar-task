import { useEffect, useRef, useState } from "react";
import { LabelTypes } from "../../redux/types/task.types";
import Label from "../Label/Label";
import { DropDownButton } from "./styled/DropDownButton";
import { DropDownContent } from "./styled/DropDownContent";
import { DropDownItem } from "./styled/DropDownItem";
import { DropDownBox } from "./styled/DropDownStyledBox";

type DropDownProps = {
    items: string[] | LabelTypes[],
    value: string | null,
    handler: (item: string) => void;
    type: "label" | "text"
}


export const DropDown = ({ items, value, handler, type }: DropDownProps) => {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsActive(false);

        }
        document.addEventListener("keyup", listener)
        return () => {
            document.removeEventListener("keyup", listener)
        }

    }, [])
    const element = useRef(null)
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (event.target !== element.current) setIsActive(false);

        }
        document.addEventListener("mouseup", listener)
        return () => {
            document.removeEventListener("mouseup", listener)
        }

    }, [])

    const [isActive, setIsActive] = useState(false);

    return (
        <DropDownBox
            type={type}
            ref={element.current}
        >
            <DropDownButton
                style={{
                    backgroundColor: `${type === "label" ? value || "white" : "unset"}`
                }}
                onClick={() => {
                    setIsActive(!isActive);
                }}

            >
                <div>{type === "text" ? value : ""}</div>
            </DropDownButton>
            <DropDownContent
                style={{ display: isActive ? "block" : "none" }}
            >
                {items.map((item, i) => {
                    return (
                        <DropDownItem
                            key={i}
                            onClick={() => {
                                setIsActive(false);
                                handler(item);
                            }}
                        >
                            {type === "text" && (
                                <div
                                    color={item}
                                >
                                    {item}
                                </div>
                            )}

                            {type === "label" && (
                                <Label
                                    color={item as LabelTypes}
                                >
                                </Label>
                            )}
                        </DropDownItem>
                    );
                })}
                {type === "label" && (
                    <DropDownItem
                        onClick={() => {
                            setIsActive(false);
                            handler("");
                        }}
                    >
                        <Label
                            color={"white" as LabelTypes}
                        >
                        </Label>
                    </DropDownItem >
                )}

            </DropDownContent>
        </DropDownBox>
    )
}



