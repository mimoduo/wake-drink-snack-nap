import dayjs from "dayjs";

export const formateDateToInputTime = (date: Date) => {
    return dayjs(date).format('HH:mm');
};

export const formatDateToTime = (date: Date) => {
    return dayjs(date).format('h:mm a');
};

export const formatDateToDay = (date: Date) => {
    return dayjs(date).format('MMMM D, YYYY');
};

export const getEventsForDay = (events, date = new Date()) => {
    return events?.filter((event) => {
        const eventDate = new Date(event.date);

        return eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear();
    })
};