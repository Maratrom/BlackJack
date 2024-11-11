import { useState } from 'react'
import './MyInput.css'

export default function MyInput(label, placeholder) {
    const [useLabel, setUseLabel] = useState(label);
    const [usePlaceholder, setUsePlaceholder] = useState(placeholder)
    return(
        <>
            <label className='input-label'>
                {useLabel}
                <input type='text' placeholder={usePlaceholder} className='input-field'></input>
            </label>
        </>
    )
}