import { twMerge } from 'tailwind-merge';
import { TimelineEvent } from "@/app/components/Timeline/types";
import { useTimelineContext } from "@/app/contexts/Timeline";
import { formatDateToTime, formateDateToInputTime, getEventsForDay } from "@/app/utils/dates";
import Select from '@/app/components/Kit/Select';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';

dayjs.extend(duration);

const Timeline = () => {
    const { currentDay, events, setEvents } = useTimelineContext();
    const [eventsInCurrentdDay, setEventsInCurrentDay] = useState<TimelineEvent[]>([]);

    const handleRemoveEvent = (event: TimelineEvent) => {
        setEvents((prevState) => prevState.filter((item) => (
            item.id !== event.id
        )));
    };

    const handelOnValueChange = (event: TimelineEvent, value) => {
        setEvents((prevState) => prevState.map((item) => {
            if (item.id === event.id) {
                return {
                    ...item,
                    type: value,
                }
            }

            return item;
        }));
    };

    const handleChangeEventDate = (event: TimelineEvent, inputEvent) => {
        console.log(inputEvent.target.value);
        const timeSplit = inputEvent.target.value.split(':');
        const date = new Date();

        date.setHours(parseInt(timeSplit[0]));
        date.setMinutes(parseInt(timeSplit[1]));

        setEvents((prevState) => prevState.map((item) => {
            if (item.id === event.id) {
                return {
                    ...item,
                    date,
                }
            }

            return item;
        }));
    };

    const getEventTypeColor = (event: TimelineEvent) => {
        switch (event.type) {
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

    useEffect(() => {
        setEventsInCurrentDay(getEventsForDay(events, currentDay));
    }, [currentDay, events]);

    return (
        <ol className="flex flex-col p-4">
            {events && events.length > 0 && eventsInCurrentdDay.map((event: TimelineEvent, index: number) => {
                const indexOfCurrentEventType = eventsInCurrentdDay.filter((eventItem) => (
                    eventItem.type === event.type
                )).map((eventItem) => (
                    eventItem.id
                )).indexOf(event.id);
                let diff = null;

                if (eventsInCurrentdDay[index + 1]) {
                    if (event.type === 'Nap' && eventsInCurrentdDay[index + 1].type === 'Wake') {
                        const millisecondDiff = dayjs(eventsInCurrentdDay[index + 1].date).diff(dayjs(event.date));
                        const durationObject = dayjs.duration(millisecondDiff);
                        const durationHours = durationObject.hours();
                        const durationMinutes = durationObject.minutes();

                        diff = `${durationHours ? durationHours + 'h ' : ''}${durationMinutes ? durationMinutes + 'm' : ''}`;
                    }
                }

                return (
                    <li key={event.id}>
                        <div className="grid grid-cols-[1fr_max-content_1fr] items-center justify-center gap-2 lg:gap-4">
                            <div className="text-right text-xl xl:text-2xl">
                                <Select 
                                    onValueChange={(value) => {
                                        handelOnValueChange(event, value);
                                    }}
                                    options={[
                                        {
                                            label: 'Diaper',
                                            value: 'Diaper',
                                        },
                                        {
                                            label: 'Milk',
                                            value: 'Milk',
                                        },
                                        {
                                            label: 'Medicine',
                                            value: 'Medicine',
                                        },
                                        {
                                            label: 'Nap',
                                            value: 'Nap',
                                        },
                                        {
                                            label: 'Snack',
                                            value: 'Snack',
                                        },
                                        {
                                            label: 'Wake',
                                            value: 'Wake',
                                        },
                                    ]}
                                    placeholder={event.type}
                                />
                                {/* <span className="ml-2 font-light text-slate-400">#{indexOfCurrentEventType + 1}</span> */}
                            </div>

                            <button 
                                className={twMerge(
                                    'w-5 h-5 border rounded-full text-xs text-transparent hover:text-white transition-colors',
                                    getEventTypeColor(event),
                                )}
                                onClick={() => {
                                    handleRemoveEvent(event);
                                }}
                            >
                                x
                            </button>

                            <div className="font-light text-left text-slate-400">
                                <input 
                                    className="invalid:bg-red-900 bg-transparent rounded lowercase"
                                    min={events[index - 1] ? formateDateToInputTime(events[index - 1].date) : '00:00'}
                                    onChange={(inputEvent) => {
                                        handleChangeEventDate(event, inputEvent);
                                    }}
                                    required 
                                    type="time" 
                                    value={formateDateToInputTime(event.date)} 
                                />
                            </div>
                        </div>

                        {index !== eventsInCurrentdDay.length - 1 && (
                            <div className="w-px h-6 border-r -my-0.5 mx-auto border-slate-500 border-dashed" />
                        )}

                        {diff && (
                            <>
                                <div className="flex items-center justify-center">
                                    <div className="mx-auto py-2 px-3 bg-slate-800 rounded-md text-center text-green-300">
                                        +{diff}
                                    </div>
                                </div>
                                <div className="w-px h-6 border-r -my-0.5 mx-auto border-slate-500 border-dashed" />
                            </>
                        )}

                    </li>
                )
            })}
        </ol>
    );
};

export default Timeline;