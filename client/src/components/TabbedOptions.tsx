import classes from "./TabbedOptions.module.scss"

type TabbedOptionsProps<TOption extends string> = {
    title: string
    options: readonly TOption[]
    selectedOption: TOption
    setSelectedOption: (option: TOption) => void
}

const TabbedOptions = <TOption extends string>({ title, options, selectedOption, setSelectedOption }: TabbedOptionsProps<TOption>) => {
    return (
        <div className="d-flex justify-content-center">
            <span className={`px-2 me-2 ${classes.title}`}>{title}:</span>
            <div className={`d-flex ${classes.options}`}>
                {options.map(option => {
                    const onClick = () => setSelectedOption(option)

                    const selectedClasses = selectedOption === option ? classes.selectedOption : ""

                    return (
                        <button key={option} className={`px-3 text-capitalize ${classes.button} ${selectedClasses}`} onClick={onClick}>
                            {option}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default TabbedOptions
