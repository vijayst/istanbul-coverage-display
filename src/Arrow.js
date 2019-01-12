import React from 'react';
import PropTypes from 'prop-types';

export default function Arrow({ className, down }) {
    const deg = down ? 180 : 0;
    return (
        <svg
            className={className}
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
                transform: `rotate(${deg}deg)`,
                transition: 'transform 200ms ease-in-out'
            }}
        >
            <path
                d="M18.221 7.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z"
                fill="#515151"
            />
        </svg>
    );
}

Arrow.propTypes = {
    down: PropTypes.bool
};
