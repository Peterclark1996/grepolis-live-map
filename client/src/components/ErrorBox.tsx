import classes from "./ErrorBox.module.scss"

const ErrorBox = ({ message }: { message: string }) => {
    return (
        <div className="m-4">
            <div className={classes.errorBox}>
                <i className="fa-solid fa-triangle-exclamation me-2" />
                {message}
            </div>
        </div>
    )
}

export default ErrorBox