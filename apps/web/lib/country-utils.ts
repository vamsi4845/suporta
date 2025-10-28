import * as ct from "countries-and-timezones";


export function getCountryFromTimeZone(timeZone: string | undefined) {
    if(!timeZone) return null;
    const timezone = ct.getTimezone(timeZone);
    if(!timezone?.countries?.length) return null;
    const countryCode = timezone.countries[0];
    const country = ct.getCountry(countryCode as string);
    if(!country) return null;
    return {
        name: country.name,
        code: countryCode,
    };
}