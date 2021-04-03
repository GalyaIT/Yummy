import './_Submit-button.scss'

const SubmitButton = ({ title, onClick }) => {
    return (      
      <button className="btn btn--submit" type="submit" onClick={onClick}>{title}</button>
    )
  } 
  export default SubmitButton