import useOptions from "../hooks/useOptions"
import classes from "./CityScaleSlider.module.scss"

const CityScaleSlider = () => {
    const options = useOptions()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => options.setOption({ key: "cityScale", value: parseInt(e.target.value) })

    return (
        <div className="d-flex justify-content-center">
            <span className={`px-2 me-2 ${classes.title}`}>City Scale:</span>
            <input type="range" min="50" max="300" value={options.cityScale} onChange={onChange} className="form-range w-50" id="cityScaleSlider" />
        </div>
    )
}

export default CityScaleSlider
