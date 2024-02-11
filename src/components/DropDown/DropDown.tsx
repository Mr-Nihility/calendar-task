import { useState } from "react";
import { DropDownButton } from "./styled/DropDownButton";
import { DropDownContent } from "./styled/DropDownContent";
import { DropDownItem } from "./styled/DropDownItem";
import { DropDownBox } from "./styled/DropDownbox";

type DropDownProps = {
    items: string[],
    value: string | null,
    handler: (item: string) => void;
}


export const DropDown = ({ items, value, handler }: DropDownProps) => {

    const [isActive, setIsActive] = useState(false);
    return (
        <DropDownBox>
            <DropDownButton
                onClick={() => {
                    setIsActive(!isActive);
                }}

            >
                <div color={value ? value : 'white'}>{value}</div>
            </DropDownButton>
            <DropDownContent
                style={{ display: isActive ? "block" : "none" }}
            >
                {items.map((item, i) => {
                    return (
                        <DropDownItem
                            key={i}
                            onClick={() => {
                                setIsActive(!isActive);
                                handler(item);
                            }}
                        >
                            <div
                                color={item}
                            >
                                {item}
                            </div>
                        </DropDownItem>
                    );
                })}

            </DropDownContent>
        </DropDownBox>
    )
}



