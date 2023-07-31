import { useTimelineContext } from "@/app/contexts/Timeline";
import { TimelineEvent } from "@/app/components/Timeline/types";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from 'uuid';

const getEventTypeColor = (eventType) => {
    switch (eventType) {
        case 'Diaper':
            return 'border-orange-400 hover:bg-orange-400/10';
        case 'Milk':
            return 'border-green-400 hover:bg-green-400/10';
        case 'Medicine':
            return 'border-red-400 hover:bg-red-400/10';
        case 'Nap':
            return 'border-blue-400 hover:bg-blue-400/10';
        case 'Snack':
            return 'border-purple-400 hover:bg-purple-400/10';
        case 'Wake':
            return 'border-yellow-400 hover:bg-yellow-400/10';
    }
};

interface EventPickerButtonProps {
    label: string;
    onClick: () => void;
    eventType: string;
}

const EventPickerButton = ({
    label,
    onClick,
    eventType,
}: EventPickerButtonProps) => {
    return (
        <button
            className={twMerge(
                'w-full flex-grow border py-2 px-4 lg:px-12 font-bold rounded-md transition-colors',
                getEventTypeColor(eventType),
            )}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

const EventPickerTypes = [
    'Milk',
    'Snack',
    'Nap',
    'Wake',
    'Diaper',
    'Medicine',
];

const EventPicker = () => {
    const { currentDay, events, setEvents } = useTimelineContext();

    const handleClickEvent = (type: any) => {
        // TODO: Prevent adding the same event into the same time slot
        const now = new Date();
        const hoursOfNow = now.getHours();
        const minutesOfNow = now.getMinutes();
        const secondsOfNow = now.getSeconds();
        let dateToAdd = currentDay.setHours(hoursOfNow);
        dateToAdd = currentDay.setMinutes(minutesOfNow);
        dateToAdd = currentDay.setSeconds(secondsOfNow);
        
        // Check if there is already an event with the same date and time
        const hasSameDateTimeEvent = events.some((event) => {
            const eventDate = new Date(event.date);

            return (
                eventDate.getFullYear() === now.getFullYear() &&
                eventDate.getMonth() === now.getMonth() &&
                eventDate.getDate() === now.getDate() &&
                eventDate.getHours() === hoursOfNow &&
                eventDate.getMinutes() === minutesOfNow &&
                event.type === type
            );
        });

        if (!hasSameDateTimeEvent) {
            setEvents((events: TimelineEvent[]) => ([
                ...events,
                {
                    id: uuid(),
                    date: dateToAdd,
                    type,
                }
            ]));
        }
    };

    return (
        <ul className="w-full lg:w-auto absolute lg:top-0 bottom-0 right-0 flex flex-wrap lg:flex-col gap-2 lg:gap-4 p-4 border-t lg:border-t-0 lg:border-l border-slate-700 bg-slate-900">
            {EventPickerTypes.map((type) => {
                return (
                    <li className="flex-grow flex flex-col" key={type}>
                        <EventPickerButton 
                            label={type}
                            onClick={() => {
                                handleClickEvent(type);
                            }}
                            eventType={type}
                        />
                    </li>
                )   
            })}
        </ul>
    );
};

export default EventPicker;