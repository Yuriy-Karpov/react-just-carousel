import React from 'react';

const example =
`npm install react-just-carousel
// or 
yarn react-just-carousel
`;
export const InstallBlock = (id) => {
    return (
        <>
            <h2 id={id}>Install</h2>
            <pre className="code-one-type">
                {example}
            </pre>
        </>
    );
};
