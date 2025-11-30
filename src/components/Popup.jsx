import React from 'react'

export default function Popup({ title, subtitle, description, cause, impact, fix, onClose }) {
  if (!title) return null

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div
        className="popup-card"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="popup-header">
          <h2>{title}</h2>
          {subtitle && <p className="popup-subtitle">{subtitle}</p>}
        </div>

        <div className="popup-body">
          {description && (
            <p>
              <strong>Description: </strong>
              {description}
            </p>
          )}
          {cause && (
            <p>
              <strong>How it is caused: </strong>
              {cause}
            </p>
          )}
          {impact && (
            <p>
              <strong>Impact: </strong>
              {impact}
            </p>
          )}
          {fix && (
            <p className="popup-footer">
              <strong>How to fix / improve: </strong>
              {fix}
            </p>
          )}
        </div>

        <button className="button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  )
}
