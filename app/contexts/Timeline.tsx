import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date());

    useEffect(() => {
        // Get from local storage
        const savedEvents = localStorage.getItem('babylineEvents');
        
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);
    
    useEffect(() => {
        if (events && events.length) {
            // Save to local storage
            localStorage.setItem('babylineEvents', JSON.stringify(events));
        }
    }, [events]);

    const value = useMemo(() => ({ 
        currentDay,
        events, 
        setCurrentDay,
        setEvents 
    }), [currentDay, events]);

    return (
        <TimelineContext.Provider value={value}>
            {children}
        </TimelineContext.Provider>
    )
};

export const useTimelineContext = () => useContext(TimelineContext);