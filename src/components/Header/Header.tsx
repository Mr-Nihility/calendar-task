import moment from "moment";
import { MouseEventHandler } from "react";
import { RiScreenshot2Line } from "react-icons/ri";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCountries } from "../../Api/Api-hook/useDateApi";
import { getCalendarType, getCountryCode, getCurrentDate, getLabelList } from "../../redux/task/task-selectors";
import { setCalendarType, setCountryCode, setDate } from "../../redux/task/task-slice";
import { Country, LabelTypes } from "../../redux/types/task.types";
import { DEFAULT_DATE_FORMAT, nextDate, prevDate } from "../../tools/calendar-tool";
import { DropDown } from "../DropDown/DropDown";
import { ControlsBox } from "./styled/ControlBox";
import { HeaderBox } from "./styled/HeaderBox";
import { HeaderButton } from "./styled/HeaderButton";
import { InputStyled } from "./styled/InputStyled";
import { SearchInputsBox } from "./styled/SearchInputsBox";

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
    const calendarType = useSelector(getCalendarType);
    const { countryListData } = useGetAllCountries()
    const dispatch = useDispatch();

    const onPrevClickHandler: MouseEventHandler = () => {
        const prevMonthDate = prevDate(moment(date, DEFAULT_DATE_FORMAT), calendarType);
        dispatch(setDate(prevMonthDate));
    };

    const onNextClickHandler: MouseEventHandler = () => {
        const nextMonthDate = nextDate(moment(date, DEFAULT_DATE_FORMAT), calendarType);
        dispatch(setDate(nextMonthDate));
    };

    const onCountryChange = (name: Country["name"]) => {
        const country = countryListData.find(item => item.name === name);
        if (!country) return;
        dispatch(setCountryCode(country.countryCode))
    }

    const onMonthClickHandler: MouseEventHandler = () => {
        dispatch(setCalendarType("month"))
    }
    const onWeekClickHandler: MouseEventHandler = () => {
        dispatch(setCalendarType("week"))
    }

    return (
        <HeaderBox>

            <ControlsBox>
                <TfiExport
                    fill="#fff"
                    size={25}
                />
                <TfiImport
                    size={25}
                    fill="#fff"
                />

                <RiScreenshot2Line
                    size={25}
                    fill="#fff"
                />
                <SlArrowLeft
                    size={25}
                    fill="#fff"
                    onClick={onPrevClickHandler}
                />
                <SlArrowRight
                    size={25}
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
                    <HeaderButton
                        isActive={calendarType === "week"}
                        onClick={onWeekClickHandler}
                    >
                        Week
                    </HeaderButton>
                    <HeaderButton
                        isActive={calendarType === "month"}
                        onClick={onMonthClickHandler}
                    >
                        Month
                    </HeaderButton>
                </div>
            </div>
            <SearchInputsBox>
                <div>
                    Filter
                </div>
                <InputStyled
                    type="text"
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => onSearchInputChange(e.target.value)}
                ></InputStyled>

                <DropDown
                    type="label"
                    items={labelList}
                    value={searchLabel}
                    handler={onSearchLabelChange}
                />
            </SearchInputsBox>

            <div>
                <DropDown
                    type="text"
                    items={countryListData.map(item => item.name)}
                    value={countryListData.find(item => item.countryCode === countryCode)?.name || ""}
                    handler={onCountryChange}
                />
            </div>
        </HeaderBox>
    );
}
