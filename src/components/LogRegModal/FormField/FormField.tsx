import { useState } from 'react';
import watchPassword from './../../../images/watch-password.png';
import notwatchPassword from './../../../images/dont-watch.png';
import { FormFieldProps } from '../../../utils/types-and-interfaces';

import './FormField.scss'

export const FormField: React.FC<FormFieldProps> = ({ placeholder, label, value, type, name, id, setChange }) => {
    const [changeType, setChangeType] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChange(e.target.value);
    }

    return (
        <div className='form-field'>
            {type === 'password' ?
                <div className='change-password__input'>
                    <label htmlFor={id}>
                        <h3 className="input__name">
                            {label}
                        </h3>
                    </label>
                    <input
                        placeholder={placeholder}
                        type={changeType ? 'text' : 'password'}
                        name={name}
                        id={id}
                        value={value}
                        onChange={handleChange}
                    />
                    <img onClick={() => setChangeType(prev => !prev)} className='change-password__watch' src={changeType ? watchPassword : notwatchPassword} alt="see" />
                </div> :
                <div className='form-field__input'>
                    <label htmlFor={id}>
                        <h3 className="input__name">
                            {label}
                        </h3>
                    </label>
                    <input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        name={name}
                        id={id}
                        onChange={handleChange}
                    />
                </div>
            }
        </div>
    );
}