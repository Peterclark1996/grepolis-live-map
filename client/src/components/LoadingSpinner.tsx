import classes from "./LoadingSpinner.module.scss"

const LoadingSpinner = () => {
    return (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
            <div className={classes.loadingSpinner} />
        </div>
    )
}
export default LoadingSpinner
