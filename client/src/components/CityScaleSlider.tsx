import classes from "./CityScaleSlider.module.scss"

type CityScaleSliderProps = {
    cityScalePercentage: number
    setCityScalePercentage: (cityScale: number) => void
}

const CityScaleSlider = ({ cityScalePercentage, setCityScalePercentage }: CityScaleSliderProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCityScalePercentage(parseFloat(e.target.value))

    return (
        <div className="d-flex justify-content-center">
            <span className={`px-2 me-2 ${classes.title}`}>City Scale:</span>
            <input type="range" min="50" max="300" value={cityScalePercentage} onChange={onChange} className="form-range w-50" id="cityScaleSlider" />
        </div>
    )
}

export default CityScaleSlider
