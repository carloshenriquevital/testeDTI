import React, { InputHTMLAttributes, useCallback, FormEvent } from 'react';

import './styles.css';

interface NumericInputInterface extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}


const NumericInput: React.FC<NumericInputInterface> = ({label, name, ...props}) => {
    
    const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        e.currentTarget.value = value;
    }, []);

    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} {...props} onKeyUp={handleKeyUp}/>
        </div>
    );
}

export default NumericInput;