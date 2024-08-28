import React from 'react';

function Loading() {
    return (
        <div className='flex w-full space-x-2 justify-center items-center'>
            <div className='h-3 w-3 bg-text-100 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-3 w-3 bg-text-100 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-3 w-3 bg-text-100 rounded-full animate-bounce'></div>
        </div>
    );
}

export default Loading;