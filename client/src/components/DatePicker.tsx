import { useEffect } from "react"
import useSelection from "../hooks/useSelection"
import classes from "./DatePicker.module.scss"

const DatePicker = ({ dates }: { dates: string[] }) => {

    const { selectedDate, setSelectedDate } = useSelection()

    const sortedDates = dates.sort((a, b) => a < b ? 1 : -1)

    useEffect(() => {
        if (selectedDate !== undefined && dates.includes(selectedDate)) return
        setSelectedDate(sortedDates[0])
    }, [sortedDates, selectedDate, setSelectedDate, dates])

    return (
        <div className="d-flex">
            <span className={`px-2 me-2 my-auto ${classes.title}`}>
                Date:
            </span>
            <input
                type="date"
                min={sortedDates[sortedDates.length - 1].replaceAll("_", "-")}
                max={sortedDates[0].replaceAll("_", "-")}
                value={selectedDate?.replaceAll("_", "-")}
                onChange={event => setSelectedDate(event.target.value.replaceAll("-", "_"))}
            />
        </div>
    )
}

export default DatePicker