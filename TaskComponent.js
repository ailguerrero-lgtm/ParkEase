// =====================================================
// TaskComponent.js
// =====================================================
// Este componente se encarga de mostrar la información
// de una tarea dentro de la interfaz de usuario.
//
// Buenas prácticas aplicadas:
// 1. Responsabilidad única: solo muestra una tarea.
// 2. Reutilizable: puede usarse para cualquier tarea.
// 3. Código limpio y fácil de mantener.
// 4. Validación de propiedades con PropTypes.
// =====================================================

import React from "react";
import PropTypes from "prop-types";

/**
 * Componente TaskComponent
 *
 * Recibe:
 * - title: Nombre de la tarea.
 * - description: Descripción de la tarea.
 * - status: Estado de la tarea (Completada o Pendiente).
 *
 * Devuelve una tarjeta visual con la información
 * correspondiente de la tarea.
 */
const TaskComponent = ({ title, description, status }) => {
  return (
    <div className="task-card">
      
      {/* Título principal de la tarea */}
      <h3>{title}</h3>

      {/* Descripción detallada de la tarea */}
      <p>{description}</p>

      {/* Estado actual de la tarea */}
      <span
        className={`task-status ${
          status === "Completada" ? "completed" : "pending"
        }`}
      >
        {status}
      </span>

    </div>
  );
};

/**
 * Validación de propiedades.
 * Garantiza que los datos recibidos sean correctos.
 */
TaskComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

// Exportación del componente para ser utilizado
// en otras partes de la aplicación.
export default TaskComponent;