import { useEffect } from "react"
import useSelection from "../hooks/useSelection"
import classes from "./DatePicker.module.scss"

type DatePickerProps = { dates: string[] }

const DatePicker = ({ dates }: DatePickerProps) => {
    const { selectedDate, setSelectedDate } = useSelection()

    const sortedDates = dates.sort((a, b) => (a < b ? 1 : -1))

    useEffect(() => {
        if (selectedDate !== undefined && dates.includes(selectedDate)) return
        setSelectedDate(sortedDates[0])
    }, [sortedDates, selectedDate, setSelectedDate, dates])

    const onDatePicked = (date: string) => {
        if (dates.includes(date)) {
            setSelectedDate(date)
            return
        }

        alert("No data for this date")
    }

    return (
        <div className="d-flex">
            <span className={`px-2 me-2 my-auto ${classes.title}`}>Date:</span>
            <input
                className={`${classes.input} px-2`}
                type="date"
                min={sortedDates[sortedDates.length - 1].replaceAll("_", "-")}
                max={sortedDates[0].replaceAll("_", "-")}
                value={selectedDate?.replaceAll("_", "-") || sortedDates[0].replaceAll("_", "-")}
                onChange={event => onDatePicked(event.target.value.replaceAll("-", "_"))}
            />
        </div>
    )
}

export default DatePicker
