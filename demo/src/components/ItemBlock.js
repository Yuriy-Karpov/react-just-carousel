import React from 'react';

export function ItemBlock({title, width}) {
    return (
        <div className="ItemBlock" style={{width}}>
            <span className="ItemBlock-title">{title}</span>
        </div>
    );
}
