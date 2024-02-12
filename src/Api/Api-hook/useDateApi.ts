import { useState } from "react";
import { useQuery } from "react-query";
import { Country, Holyday } from "../../redux/types/task.types";
import { performHolidays } from "../../tools/calendar-tool";
import { getAllCountries, getPublicHolidays } from "../api-service";

export const useGetAllCountries = () => {
    const [countryListData, setCountryListData] = useState<Country[]>([])

    const { isFetching, error, status, refetch } = useQuery(
        "country info",
        () => getAllCountries(),
        {
            onSuccess: (countryList) => {
                console.log("country info", countryList);
                setCountryListData(countryList)
            },
            onError: (error) => {
                console.log('error', error);
            }
        }
    );

    return { isLoading: isFetching, countryListData, error, status, refetchComputers: refetch }
}

export const usePublicHolidays = (year: string, code: string) => {
    const [holydaysList, setHolydaysList] = useState<Holyday[]>([])

    const { isFetching, error, status, refetch } = useQuery(
        "get public Holidays",
        () => getPublicHolidays(year, code),
        {
            onSuccess: (holidays: Holyday[]) => {
                console.log("get public Holidays", holidays);
                setHolydaysList(performHolidays(holidays))
            },
            onError: (error) => {
                console.log('error', error);
            }
        }
    );

    return { isLoading: isFetching, holydaysList, error, status, refetchPublicHolydays: refetch }
}