const debounce = (func, wait) => {
  let timeout;

  const executedFunction = (...args) =>{
    const later = () => {     
      timeout = null;    
      func(...args);
    };
    
    clearTimeout(timeout);        
    timeout = setTimeout(later, wait);
  };

  return executedFunction
};


export default debounce