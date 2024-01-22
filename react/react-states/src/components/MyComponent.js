import React, { useState } from 'react';
import useMyComponent from './useMyComponent';

function MyComponent() {
    const [toggle, setToggle] = useState(false);
    const { data, fns } = useMyComponent();

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    return (
        <div>
            <button fns={fns} onClick={toggleHandler}>Toggle</button>
            <div>{toggle? 'Toggle is on': 'Toggle is off'}</div>
        </div>
    );
}

export default MyComponent;