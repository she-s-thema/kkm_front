import React from 'react';

const Auth = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)
    return (
        <div>
            { code }
        </div>
    );
};

export default Auth;