import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://18.218.29.30:3002/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://vsq.marveladvisors.com', // Configura el origen permitido para el backend
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend reply:', data);
	if (data.message === 'User already exists') {
  		alert('El usuario ya existe.'); // Muestra una alerta al usuario
	}else if (data.redirectURL) {
  		navigate('/confirmation', { state: formData });
	} else {
  		console.log('No hay URL de redireccionamiento');
	}

    } catch (error) {
      console.error('Error while sending the data:', error);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <h2>Register for a link to the Form</h2>
        <label>
          Company Name:
          <input type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <br />
        <button type="submit">
          <strong>SEND</strong>
        </button>
      </form>
    </div>
  );
};

export default FormComponent;

