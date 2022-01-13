export const getCurrentDate = () => {
    return adjustForTimezone(new Date().toISOString());
}

export const adjustForTimezone = (dateString) => {
    const date = new Date(dateString)
    return new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset())).toISOString();
}