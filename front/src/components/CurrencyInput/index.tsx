import React, { InputHTMLAttributes, useCallback, FormEvent } from 'react';

import './styles.css';

interface CurrencyInputInterface extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}


const CurrencyInput: React.FC<CurrencyInputInterface> = ({label, name, ...props}) => {
    
    const handleKeyDown = useCallback((e: FormEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{1})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
        
        e.currentTarget.value = value;

        return e;
    }, []);

    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} {...props} onKeyDown={handleKeyDown}/>
        </div>
    );
}

export default CurrencyInput;