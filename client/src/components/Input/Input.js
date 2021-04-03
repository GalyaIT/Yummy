import './_Input.scss'

const Input = ({label, id, value, onChange, type, placeholder}) => {

    return (
      <div className="input">   
        <label htmlFor={id}/>
          {label}:
          <input type={type || 'text'} id={id} value={value} onChange={onChange} placeholder={placeholder} />
      
      </div>
    )  
  }
  
  export default Input