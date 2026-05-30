import React, { useEffect, useRef } from 'react';
import FormField from './FormField';
import { useFormValidation } from '../hooks/useFormValidation';
import './MatriculaForm.css';

const CICLOS = ['I ciclo','II ciclo','III ciclo','IV ciclo','V ciclo','VI ciclo','VII ciclo','VIII ciclo','IX ciclo','X ciclo'];
const CARRERAS = ['Ingeniería de sistemas','Administración de empresas','Contabilidad','Derecho','Medicina humana','Psicología','Arquitectura','Enfermería'];
const MODALIDADES = ['Presencial','Semipresencial','Virtual'];

export default function MatriculaForm() {
  const {
    values, errors, submitStatus,
    handleChange, handleBlur, handleSubmit,
    handleReset, getFieldState, setSubmitStatus,
  } = useFormValidation();

  const toastRef = useRef(null);

  useEffect(() => {
    if (submitStatus && toastRef.current) {
      toastRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submitStatus]);

  const onSubmit = (e) => {
    handleSubmit(e);
  };

  return (
    <form className="mf-form" onSubmit={onSubmit} noValidate>

      {/* Sección 1: Datos personales */}
      <section className="mf-section">
        <div className="mf-section-header">
          <span className="mf-section-num">01</span>
          <div>
            <h2 className="mf-section-title">Datos personales</h2>
            <p className="mf-section-sub">Información de identificación del estudiante</p>
          </div>
        </div>

        <div className="mf-grid-2">
          <FormField
            label="Nombre"
            name="nombre"
            placeholder="Ej: Juan Carlos"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nombre}
            fieldState={getFieldState('nombre')}
            required
          />
          <FormField
            label="Apellido"
            name="apellido"
            placeholder="Ej: Pérez López"
            value={values.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.apellido}
            fieldState={getFieldState('apellido')}
            required
          />
        </div>

        <FormField
          label="DNI / Documento de identidad"
          name="dni"
          placeholder="Ej: 12345678"
          value={values.dni}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.dni}
          fieldState={getFieldState('dni')}
          hint="Ingresa tus 8 dígitos sin espacios ni puntos."
          required
        />
      </section>

      <div className="mf-divider" />

      {/* Sección 2: Datos de contacto */}
      <section className="mf-section">
        <div className="mf-section-header">
          <span className="mf-section-num">02</span>
          <div>
            <h2 className="mf-section-title">Datos de contacto</h2>
            <p className="mf-section-sub">Medios para comunicarnos con el alumno</p>
          </div>
        </div>

        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="Ej: juan.perez@correo.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          fieldState={getFieldState('email')}
          hint="Formato esperado: usuario@dominio.com"
          required
        />

        <FormField
          label="Teléfono / Celular"
          name="telefono"
          type="telefono"
          placeholder="Ej: 987 654 321"
          value={values.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.telefono}
          fieldState={getFieldState('telefono')}
          hint="Opcional — se usará para notificaciones."
        />
      </section>

      <div className="mf-divider" />

      {/* Sección 3: Datos académicos */}
      <section className="mf-section">
        <div className="mf-section-header">
          <span className="mf-section-num">03</span>
          <div>
            <h2 className="mf-section-title">Datos académicos</h2>
            <p className="mf-section-sub">Información sobre el programa de estudios</p>
          </div>
        </div>

        <div className="mf-grid-2">
          <FormField
            label="Ciclo académico"
            name="ciclo"
            as="select"
            value={values.ciclo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.ciclo}
            fieldState={getFieldState('ciclo')}
            required
          >
            <option value="">Seleccionar ciclo…</option>
            {CICLOS.map(c => <option key={c} value={c}>{c}</option>)}
          </FormField>

          <FormField
            label="Modalidad"
            name="modalidad"
            as="select"
            value={values.modalidad}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.modalidad}
            fieldState={getFieldState('modalidad')}
            required
          >
            <option value="">Seleccionar modalidad…</option>
            {MODALIDADES.map(m => <option key={m} value={m}>{m}</option>)}
          </FormField>
        </div>

        <FormField
          label="Carrera"
          name="carrera"
          as="select"
          value={values.carrera}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.carrera}
          fieldState={getFieldState('carrera')}
          required
        >
          <option value="">Seleccionar carrera…</option>
          {CARRERAS.map(c => <option key={c} value={c}>{c}</option>)}
        </FormField>
      </section>

      {/* Toast de resultado */}
      {submitStatus && (
        <div
          ref={toastRef}
          className={`mf-toast mf-toast--${submitStatus}`}
          role="alert"
          aria-live="polite"
        >
          {submitStatus === 'success' ? (
            <>
              <span className="mf-toast-icon mf-toast-icon--success">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 9l2.5 2.5L12.5 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <p className="mf-toast-title">¡Registro completado!</p>
                <p className="mf-toast-desc">El estudiante fue registrado correctamente en el sistema.</p>
              </div>
            </>
          ) : (
            <>
              <span className="mf-toast-icon mf-toast-icon--error">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 5.5v4M9 11.5v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </span>
              <div>
                <p className="mf-toast-title">Corrige los errores</p>
                <p className="mf-toast-desc">Revisa los campos marcados en rojo antes de continuar.</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Acciones */}
      <div className="mf-actions">
        <button
          type="button"
          className="mf-btn mf-btn--secondary"
          onClick={handleReset}
        >
          Limpiar formulario
        </button>
        <button type="submit" className="mf-btn mf-btn--primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 2H5L2 5v9h12V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <rect x="5" y="9" width="6" height="5" rx=".5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="5.5" y="2" width="5" height="3.5" rx=".5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Guardar registro
        </button>
      </div>
    </form>
  );
}
