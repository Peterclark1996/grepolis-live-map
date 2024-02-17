import classes from "./TabbedOptions.module.scss"

type Option = {
    label: string
    value: string
}

type TabbedOptionsProps = {
    title: string
    options: Option[]
    selectedOption: string
    setSelectedOption: (option: string) => void
}

const TabbedOptions = ({
    title,
    options,
    selectedOption,
    setSelectedOption
}: TabbedOptionsProps) => {
    return (
        <div className="d-flex justify-content-center">
            <span className={`px-2 me-2 ${classes.title}`}>{title}:</span>
            <div className={`d-flex ${classes.options}`}>
                {options.map(option => {
                    const onClick = () => setSelectedOption(option.value)

                    const selectedClasses =
                        selectedOption === option.value ? classes.selectedOption : ""

                    return (
                        <button
                            key={option.value}
                            className={`px-3 ${classes.button} ${selectedClasses}`}
                            onClick={onClick}
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default TabbedOptions
