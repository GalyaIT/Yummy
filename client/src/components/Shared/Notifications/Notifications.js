import './_Notifications.scss'
const Notifications =({message, className})=>{
    return(
<div className={`message ${className}`}> <span>{message}</span> </div>
    )
}
export default Notifications