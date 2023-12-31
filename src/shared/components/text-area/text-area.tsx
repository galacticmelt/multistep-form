import { useState, forwardRef, TextareaHTMLAttributes } from 'react';
import styles from './text-area.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  symbolCount?: boolean;
  errorText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, symbolCount, errorText, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(props.value);
    const [charCount, setCharCount] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      const count = value.replace(/\s/g, '').length;
      if (count <= 200) {
        setCharCount(count);
        setInputValue(value);
      }
    };

    const validityStyle = errorText ? styles.invalid : '';

    return (
      <div className={styles.textAreaWrapper}>
        {label && <span className={styles.textAreaLabel}>{label}</span>}
        <textarea
          value={inputValue}
          className={[styles.textAreaField, validityStyle].join(' ')}
          {...props}
          ref={ref}
          onChange={handleChange}
        />
        {symbolCount && <span className={styles.textAreaTip}>{charCount}</span>}
        {errorText && <span className={styles.errorText}>{errorText}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextAreaArea ';

export default TextArea;
