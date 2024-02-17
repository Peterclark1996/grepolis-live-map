import classes from "./ErrorBox.module.scss"

type ErrorBoxProps = {
    message: string
    subMessage?: string
}

const ErrorBox = ({ message, subMessage }: ErrorBoxProps) => {
    return (
        <div className="my-3 mx-auto">
            <div className={`d-flex flex-column align-items-center p-2 ${classes.errorBox}`}>
                <div>
                    <i className="fa-solid fa-triangle-exclamation me-2" />
                    {message}
                </div>
                <div>{subMessage}</div>
            </div>
        </div>
    )
}

export default ErrorBox
