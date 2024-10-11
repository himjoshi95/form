function EmailInput({type,value,placeholder,onChange}){
    return <input 
    type={type} 
    className="w-full px-1 focus:outline-none" 
    value={value} 
    placeholder={placeholder}
    onChange={onChange}      
    ></input>

}

export default EmailInput;