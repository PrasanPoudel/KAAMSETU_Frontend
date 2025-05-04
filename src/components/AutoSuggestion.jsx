import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AutoSuggestion = ({
  value,
  onChange,
  onSelect,
  suggestions,
  placeholder,
  icon,
  label,
  required = false,
  className = "",
  inputClassName = "",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (onChange) {
      onChange(e);
    }

    if (inputValue.length > 0 && suggestions.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered.length > 0 ? filtered : []);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (onSelect) {
      onSelect(suggestion);
    }
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "Tab") {
      if (filteredSuggestions.length > 0) {
        e.preventDefault();
        handleSuggestionSelect(filteredSuggestions[0]);
      }
    } else if (e.key === "Escape") {
      setFilteredSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-1 font-medium text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`
        flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-10 
        ${isFocused ? "ring-2 ring-sky-500 border-sky-500" : ""} 
        ${disabled ? "bg-gray-100 opacity-70" : ""}
        transition-all
      `}
      >
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full h-full focus:outline-none text-sm ${inputClassName} ${
              disabled ? "bg-gray-100" : "bg-white"
            }`}
          />

          {filteredSuggestions.length > 0 && value && isFocused && (
            <div className="absolute top-0 left-0 pointer-events-none flex h-full items-center text-sm">
              <span className="invisible">{value}</span>
              <span className="text-gray-400">
                {filteredSuggestions[0].slice(value.length)}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-lg text-gray-500">{icon}</div>}
      </div>
    </div>
  );
};

AutoSuggestion.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AutoSuggestion;
