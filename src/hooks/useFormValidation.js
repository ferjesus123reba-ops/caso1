import { useState, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialValues = {
  nombre: '',
  apellido: '',
  dni: '',
  email: '',
  telefono: '',
  ciclo: '',
  carrera: '',
  modalidad: '',
};

const initialErrors = Object.fromEntries(Object.keys(initialValues).map(k => [k, '']));
const initialTouched = Object.fromEntries(Object.keys(initialValues).map(k => [k, false]));

function validateField(name, value) {
  switch (name) {
    case 'nombre':
      if (!value.trim()) return 'El nombre es obligatorio.';
      if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    case 'apellido':
      if (!value.trim()) return 'El apellido es obligatorio.';
      if (value.trim().length < 2) return 'El apellido debe tener al menos 2 caracteres.';
      return '';
    case 'dni':
      if (!value.trim()) return 'El DNI es obligatorio.';
      if (!/^\d{8}$/.test(value.trim())) return 'El DNI debe tener exactamente 8 dígitos.';
      return '';
    case 'email':
      if (!value.trim()) return 'El correo electrónico es obligatorio.';
      if (!EMAIL_REGEX.test(value.trim())) return 'El formato del correo electrónico no es válido.';
      return '';
    case 'ciclo':
      if (!value) return 'Selecciona el ciclo académico.';
      return '';
    case 'carrera':
      if (!value) return 'Selecciona una carrera.';
      return '';
    case 'modalidad':
      if (!value) return 'Selecciona la modalidad de estudio.';
      return '';
    default:
      return '';
  }
}

export function useFormValidation() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // live-validate only if already touched
    setErrors(prev => ({
      ...prev,
      [name]: touched[name] ? validateField(name, value) : prev[name],
    }));
    setSubmitStatus(null);
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // touch all fields
    const allTouched = Object.fromEntries(Object.keys(initialValues).map(k => [k, true]));
    setTouched(allTouched);

    // validate all
    const newErrors = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, validateField(k, v)])
    );
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    setSubmitStatus(hasErrors ? 'error' : 'success');
    return !hasErrors;
  }, [values]);

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
    setSubmitStatus(null);
  }, []);

  const getFieldState = useCallback((name) => {
    if (!touched[name]) return 'idle';
    if (errors[name]) return 'error';
    return 'valid';
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    getFieldState,
    setSubmitStatus,
  };
}
