const LOCALE = "de-DE";
const DATE_FORMAT = "2-digit";

class DateTimeUtilService {

    static formatDateTime(dateTime) {
        const datetime = new Date(dateTime);

        const formattedYMD = datetime.toLocaleDateString(LOCALE, {
            year: "numeric",
            month: DATE_FORMAT,
            day: DATE_FORMAT,
        });

        const formattedHM = datetime.toLocaleTimeString(LOCALE, {
            hour12: false,
            hour: DATE_FORMAT,
            minute: DATE_FORMAT
        });

        return `${formattedYMD}  ${formattedHM}`;
    }

}

export default DateTimeUtilService;