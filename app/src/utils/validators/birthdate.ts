import { parse, isValid, subYears } from "date-fns"

export default function validateBirthDate (date: string): boolean {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date())

    if (! isValid(parsedDate)) {
        return false
    }

    return parsedDate <= subYears(new Date(), 18); // Deve ter pelo menos 18 anos
  };
