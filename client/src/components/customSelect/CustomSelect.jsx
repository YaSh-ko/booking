// CustomSelect.jsx
import { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

export const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  console.log(selectedOption);
  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className={`custom-select__header ${isOpen ? 'custom-select__header--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select__selected">{selectedOption.label}</span>
        <span className="custom-select__arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${value === option.value ? 'custom-select__option--selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
