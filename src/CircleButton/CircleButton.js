import React from 'react';
import './CircleButton.css';

export default function CircleButton(props) {
    const { tag, className, childrenm, ...otherProps} = props
    
    return React.createElement(
        props.tag,
        {
            className: ['NavCircleButton', props.className].join(' '),
            ...otherProps
        },
        props.children 
    );
}

CircleButton.defaultProps = {
    tag: 'a',
}