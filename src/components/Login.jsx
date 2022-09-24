import React from 'react'
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

function Login({handleGoogleLogin}) {

    return (
        <div className='w-full  h-screen bg-[#0E1117] flex flex-col gap-4 justify-center items-center'>
            <h1 className='text-white text-2xl font-bold'>ToDo App</h1>
            <Button size='large' variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin} className='text-lg py-2 px-4 border-2 rounded cursor-pointer'>Login with Google</Button>
        </div>
    )
}

export default Login