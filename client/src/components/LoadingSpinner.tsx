import classes from "./LoadingSpinner.module.scss"

const LoadingSpinner = () => {
    return (
        <div className="d-flex h-100 align-items-center">
            <div className={classes.loadingSpinner} />
        </div>
    )
}
export default LoadingSpinner
