
import { useState } from 'react';

function InputTexto({ estilo, nombre, id, name }) {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={id || nombre}>{nombre}</label>
            <input
                type="text"
                className={estilo}
                id={id || nombre}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputTexto;
