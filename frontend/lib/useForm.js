import { useState, useEffect } from 'react';

const useForm = (callback, initValues = {}) => {
  const [values, setValues] = useState(initValues)
  const [lowercaseValues, setLowercaseValues] = useState(initValues)
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if(isSubmitting) {
      callback();
    }
  }, [callback, isSubmitting]);

  const handleSubmit = e => {
    if (e) {
      e.preventDefault()
    };
    setIsSubmitting(true)
  };

  const handleChange = e => {
    e.persist();
    let val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setValues(v => ({
      ...v, [e.target.name]: val
    }))
    setLowercaseValues(v => ({
      ...v, [e.target.name]: typeof(val) === 'string' ? val.toLowerCase() : val
    }))
    
  };

  return {
    handleChange,
    handleSubmit,
    values,
    lowercaseValues
  }
}

export default useForm;