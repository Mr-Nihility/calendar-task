import { Country } from "../redux/types/task.types"

const BASE_URl = "https://date.nager.at"


///api/v3/AvailableCountries
export async function getAllCountries(): Promise<Country[]> {
    return fetch(`${BASE_URl}/api/v3/AvailableCountries`).then(res => res.json())
}


///api/v3/PublicHolidays/{year}/{countryCode}
export async function getPublicHolidays(year: string, countryCode: string) {
    return fetch(`${BASE_URl}/api/v3/PublicHolidays/${year}/${countryCode}`).then(res => res.json())
}
