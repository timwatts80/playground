import { useState } from 'react';

const useMyComponent = () => {
    const [toggle, setToggle] = useState(false);
    const data = {
        toggle: toggle
    };

    const fns = {
        toggleHandler: () => {
            setToggle(!toggle);
            console.log(toggle);
        }
    };

    return { data, fns };
};

export default useMyComponent;