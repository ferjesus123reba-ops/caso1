# Sistema de Matrícula — React App

Aplicación de matrícula estudiantil con validación de formulario en tiempo real.

## Tecnologías
- React 18
- CSS Modules (vanilla CSS)
- Custom Hook para validación (`useFormValidation`)

## Cómo ejecutar

```bash
npm install
npm start
```

La app abrirá en `http://localhost:3000`.

## Estructura del proyecto

```
src/
├── App.js                        # Layout principal
├── App.css
├── index.js                      # Punto de entrada
├── index.css                     # Variables CSS globales
├── hooks/
│   └── useFormValidation.js      # Lógica de validación centralizada
└── components/
    ├── MatriculaForm.js          # Formulario principal (3 secciones)
    ├── MatriculaForm.css
    ├── FormField.js              # Campo reutilizable con estados
    └── FormField.css
```

## Validaciones implementadas

| Campo | Regla |
|-------|-------|
| Nombre / Apellido | Obligatorio, mínimo 2 caracteres |
| DNI | Obligatorio, exactamente 8 dígitos |
| **Correo electrónico** | **Obligatorio + formato válido (`usuario@dominio.com`)** |
| Ciclo / Carrera / Modalidad | Selección obligatoria |
| Teléfono | Opcional |

## Comportamiento de validación

- **Al salir del campo (blur):** se valida y muestra error si corresponde.
- **Mientras escribe:** si el campo ya fue tocado, la validación es reactiva.
- **Al enviar:** todos los campos se validan simultáneamente.
- **Estado visual:**
  - 🔴 Borde rojo + mensaje de error + fondo tenue
  - 🟢 Borde verde + ícono de check cuando es válido
