
import { City, Country, State } from "country-state-city";

interface IDropdownOption { text: string, key: any };

const genderOptions: IDropdownOption[] = [
    { text: "Male", key: "M" },
    { text: "Female", key: "F" },
    { text: "Other", key: "O" },
]

const maritalStatusOptions: IDropdownOption[] = [
    { text: "Married", key: "M" },
    { text: "Unmarried", key: "U" },
    { text: "Divorced", key: "D" },
    { text: "Separated", key: "S" },
]

const raceOptions: IDropdownOption[] = [
    { text: "American Indian", key: "I" },
    { text: "Asian", key: "A" },
    { text: "Black", key: "B" },
    { text: "Pacific", key: "P" },
    { text: "Other", key: "O" },
]

const employmentOptions: IDropdownOption[] = [
    { text: "Part Time", key: "P" },
    { text: "Full Time", key: "E" },
    { text: "Retired", key: "R" },
    { text: "Self Employed", key: "S" },
]

const studentOptions: IDropdownOption[] = [
    { text: "Full Time Student", key: "F" },
    { text: "Not a student", key: "N" },
    { text: "Part Time Student", key: "P" },
]

const languageOptions: IDropdownOption[] = [
    { text: "English", key: "en" },
    { text: "Spanish", key: "es" },
    { text: "French", key: "fr" },
]

const defaultCountryOptions = Country.getAllCountries();
const defaultStateOptions = State.getAllStates();
const defaultCityOptions = City.getAllCities();

export { genderOptions, maritalStatusOptions, raceOptions, employmentOptions, studentOptions, defaultCountryOptions, defaultStateOptions, defaultCityOptions, languageOptions };