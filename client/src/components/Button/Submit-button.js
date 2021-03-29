const SubmitButton = ({ title, onClick }) => {
    return (      
      <button className="btn" type="submit" onClick={onClick}>{title}</button>
    )
  } 
  export default SubmitButton