import moment from "moment";
import { MouseEventHandler } from "react";
import { RiScreenshot2Line } from "react-icons/ri";
import { SlArrowLeft, SlArrowRight, SlPencil } from "react-icons/sl";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCountries } from "../../Api/Api-hook/useDateApi";
import { getCountryCode, getCurrentDate, getLabelList } from "../../redux/task/task-selectors";
import { setCountryCode, setDate } from "../../redux/task/task-slice";
import { Country, LabelTypes } from "../../redux/types/task.types";
import { DEFAULT_DATE_FORMAT, nextMonth, prevMonth } from "../../tools/calendar-tool";
import { HeaderButton } from "../Button/HeaderButton";
import { DropDown } from "../DropDown/DropDown";
import { ControlsBox } from "./styled/ControlBox";
import { HeaderBox } from "./styled/HeaderBox";

type HeaderProps = {
    onSearchInputChange: (value: string) => void,
    onSearchLabelChange: (label: string) => void,
    searchInput: string,
    searchLabel: LabelTypes | string | null
}

export default function Header({ onSearchInputChange, onSearchLabelChange, searchInput, searchLabel }: HeaderProps) {
    const labelList = useSelector(getLabelList);
    const date = useSelector(getCurrentDate);
    const countryCode = useSelector(getCountryCode);
    const { countryListData } = useGetAllCountries()
    const dispatch = useDispatch();

    const onPrevClickHandler: MouseEventHandler = () => {
        const prevMonthDate = prevMonth(moment(date, DEFAULT_DATE_FORMAT));
        dispatch(setDate(prevMonthDate));
    };

    const onNextClickHandler: MouseEventHandler = () => {
        const nextMonthDate = nextMonth(moment(date, DEFAULT_DATE_FORMAT));
        dispatch(setDate(nextMonthDate));
    };

    const onCountryChange = (name: Country["name"]) => {
        const country = countryListData.find(item => item.name === name)

        dispatch(setCountryCode(country?.countryCode))
    }

    return (
        <HeaderBox>

            <ControlsBox>
                <TfiExport
                    fill="#fff"
                    size={30}
                />
                <TfiImport
                    size={30}
                    fill="#fff"
                />
                <SlPencil
                    size={30}
                    fill="#fff"
                />
                <RiScreenshot2Line
                    size={30}
                    fill="#fff"
                />
                <SlArrowLeft
                    size={30}
                    fill="#fff"
                    onClick={onPrevClickHandler}
                />
                <SlArrowRight
                    size={30}
                    fill="#fff"
                    onClick={onNextClickHandler}
                />
            </ControlsBox>

            <div>
                <div style={{
                    fontSize: "20px",
                    fontWeight: 700
                }}>
                    {moment(date, "DD-MM-YYYY").format("MMM YYYY")}
                </div>
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <HeaderButton>Week</HeaderButton>
                    <HeaderButton>Month</HeaderButton>
                </div>
            </div>
            <div>
                <label>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchInput}
                        onChange={(e) => onSearchInputChange(e.target.value)}
                    ></input>
                </label>
                <DropDown
                    items={labelList}
                    value={searchLabel}
                    handler={onSearchLabelChange}
                />
            </div>

            <div>
                <DropDown
                    items={countryListData.map(item => item.name)}
                    value={countryListData.find(item => item.countryCode === countryCode)?.name || ""}
                    handler={onCountryChange}
                />
            </div>
        </HeaderBox>
    );
}
