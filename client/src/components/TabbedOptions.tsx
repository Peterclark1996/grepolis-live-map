import classes from "./TabbedOptions.module.scss"

interface Option {
    label: string,
    value: string
}

const TabbedOptions = ({ title, options, selectedOption, setSelectedOption }: {
    title: string,
    options: Option[],
    selectedOption: string,
    setSelectedOption: (option: string) => void
}) => {
    return (
        <div className="d-flex">
            <span className={`px-2 me-2 ${classes.title}`}>
                {title}:
            </span>
            <div className={`d-flex ${classes.options}`}>
                {
                    options.map(option =>
                        <div
                            key={option.value}
                            className={`px-3 ${selectedOption === option.value && classes.selectedOption}`}
                            role="button"
                            onClick={() => setSelectedOption(option.value)}
                        >
                            {option.label}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TabbedOptions