import { useTimelineContext } from "@/app/contexts/Timeline";
import { formatDateToDay } from "@/app/utils/dates";
import { CaretLeftIcon, CaretRightIcon} from '@radix-ui/react-icons'
import dayjs from "dayjs";

const DayPicker = () => {
    const { currentDay, setCurrentDay } = useTimelineContext();
    
    const handlePreviousDay = () => {
        setCurrentDay((day) => (
            dayjs(day).subtract(1, 'day').toDate()
        ));
    };

    const handleNextDay = () => {
        setCurrentDay((day) => (
            dayjs(day).add(1, 'day').toDate()
        ));
    };

    return (
        <div className="flex items-center justify-center p-4 text-2xl lg:text-3xl text-center">
            <button 
                className="p-4 text-slate-500 text-4xl"
                onClick={handlePreviousDay}
            >
                <CaretLeftIcon className="w-10 h-10" />
            </button>

            {formatDateToDay(currentDay)}

            <button 
                className="p-4 text-slate-500"
                onClick={handleNextDay}
            >
                <CaretRightIcon className="w-10 h-10" />
            </button>
        </div>
    )
};

export default DayPicker;