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

    const isEarliestDate = selectedDate === sortedDates[sortedDates.length - 1]
    const isLatestDate = selectedDate === sortedDates[0]

    const onPreviousClicked = () => {
        if (selectedDate === undefined) return

        const currentIndex = sortedDates.indexOf(selectedDate)
        if (isEarliestDate) return

        setSelectedDate(sortedDates[currentIndex + 1])
    }

    const onNextClicked = () => {
        if (selectedDate === undefined) return

        const currentIndex = sortedDates.indexOf(selectedDate)
        if (isLatestDate) return

        setSelectedDate(sortedDates[currentIndex - 1])
    }

    const onLatestClicked = () => {
        setSelectedDate(sortedDates[0])
    }

    return (
        <div className="d-flex justify-content-center gap-2">
            <button
                className={`px-2 ${classes.button}`}
                onClick={onPreviousClicked}
                disabled={isEarliestDate}
            >
                <i className="fa-solid fa-backward" />
            </button>
            <input
                className={`${classes.input} px-2`}
                type="date"
                min={sortedDates[sortedDates.length - 1].replaceAll("_", "-")}
                max={sortedDates[0].replaceAll("_", "-")}
                value={selectedDate?.replaceAll("_", "-") ?? sortedDates[0].replaceAll("_", "-")}
                onChange={event => onDatePicked(event.target.value.replaceAll("-", "_"))}
            />
            <button
                className={`px-2 ${classes.button}`}
                onClick={onNextClicked}
                disabled={isLatestDate}
            >
                <i className="fa-solid fa-forward" />
            </button>
            <button
                className={`flex px-2 ${classes.button}`}
                onClick={onLatestClicked}
                disabled={isLatestDate}
            >
                <span className="me-2">Latest</span>
                <i className="fa-solid fa-forward-step" />
            </button>
        </div>
    )
}

export default DatePicker
