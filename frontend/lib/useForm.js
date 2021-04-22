import { useState, useEffect } from 'react';

const useForm = (callback, initValues = {}) => {
  const [values, setValues] = useState(initValues);
  const [lowercaseValues, setLowercaseValues] = useState(initValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      callback();
    }
  }, [callback, isSubmitting]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!errors.email && !errors.password) {
      setIsSubmitting(true);
    } else {
      setErrors({ ...errors, form: 'Please check form for errors' });
    }
  };

  const handleChange = (e) => {
    e.persist();
    const { name, value, type } = e.target;

    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    let val = type === 'number' ? parseFloat(value) : value;
    switch (val) {
      case 'true':
        val = true;
        break;
      case 'false':
        val = false;
        break;
      default:
        break;
    }
    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          email: validEmailRegex.test(value)
            ? ''
            : 'Please enter a valid email',
        });
        break;
      case 'password':
        setErrors({
          ...errors,
          password:
            value.length < 8
              ? 'Password must be at least 8 characters long'
              : '',
        });
        break;
      default:
        break;
    }
    setValues((v) => ({
      ...v,
      [name]: val,
    }));
    setLowercaseValues((v) => ({
      ...v,
      [name]: typeof val === 'string' ? val.toLowerCase() : val,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    lowercaseValues,
    errors,
  };
};

export default useForm;
