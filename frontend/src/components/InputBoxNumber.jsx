
function InputBoxNumber({type,value,placeholder,onChange}){
    const handleChange = (e) => {
        const inputValue = e.target.value;

        // Check if the input is a number and restrict the length to 10 digits
        if (inputValue.length <= 10 && /^\d*$/.test(inputValue)) {
            onChange(e);  // Pass the valid value back to the parent
        }
    };
    
    return <input 
    type={type}     
    className="w-full px-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
    value={value} 
    placeholder={placeholder}
    onChange={handleChange}     
    ></input>
}

export default InputBoxNumber;