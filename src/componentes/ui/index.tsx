import React from 'react';

type ButtonProps = {
    color: string;
    text: string;
};

const Button: React.FC<ButtonProps> = ({ color, text }) => {
    return (
        <button className={`${color} p-1 rounded-md text-white`}>
            {text}
        </button>
    );
};

export default Button;