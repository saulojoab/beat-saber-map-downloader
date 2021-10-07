import React, { InputHTMLAttributes } from 'react';

import classNames from 'classnames';
import { FaTimes, FaSearch } from 'react-icons/fa';

import styles from './index.module.scss';

export interface InputComponentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  autocomplete?: string;
  rows?: number;
  icon?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  labelClassName?: string;
  labelTextColor?: string;
  invertIconOnX?: boolean;
  onClear?: () => void | undefined;
}

const NormalInput: React.FC<InputComponentProps> = ({
  rows = 0,
  icon,
  invertIconOnX = false,
  className,
  autocomplete,
  placeholder,
  onClear,
  ...base
}) => {
  const classesNamesInput = classNames(styles.input, className);

  return (
    <div className={icon && styles.inputWrapper}>
      {rows > 0 ? null : (
        <input
          aria-label="cost-input"
          className={classesNamesInput}
          name={base.id}
          placeholder={placeholder}
          autoComplete={autocomplete}
          {...base}
        />
      )}
      {icon && (
        <span className={styles.adornment}>
          {icon === 'search' && (
            <FaSearch
              className={classNames(styles.xIcon, styles.searchIcon, {
                [styles.xInvertedIcon]: invertIconOnX,
              })}
            />
          )}
          {icon === 'clear' && (
            <FaTimes
              onClick={onClear}
              className={classNames(styles.xIcon, {
                [styles.xInvertedIcon]: invertIconOnX,
              })}
            />
          )}
        </span>
      )}
    </div>
  );
};

export const Input: React.FC<InputComponentProps> = ({
  errorMessage = 'error',
  hasError = false,
  placeholder = '',
  className = '',
  labelClassName = '',
  label = '',
  autocomplete = 'on',
  ...base
}) => {
  const classesInput = classNames(className, styles.wrapper, {
    [styles.error]: hasError,
  });

  const maskProps = { ...base };
  delete maskProps.onClear;

  return (
    <div className={classesInput}>
      {label && (
        <label
          id={base.id}
          htmlFor={base.id}
          className={classNames(styles.label, labelClassName)}
        >
          <span>{label}</span>
        </label>
      )}

      <NormalInput
        placeholder={placeholder}
        autoComplete={autocomplete}
        className={className}
        {...base}
      />
      {hasError && <span className={styles.span}>{errorMessage}</span>}
    </div>
  );
};

export default React.memo(Input);
