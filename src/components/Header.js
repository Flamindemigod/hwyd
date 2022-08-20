import React from 'react'
import Login from './Login'
import { useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { unsetAll } from '../features/moodData'
const Header = ({ session, setSession }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (session) {
            getProfile()
        }
    }, [session])

    const getProfile = async () => {
        const user = supabase.auth.user()
    }




    return (
        <div className='w-full flex justify-between p-8 bg-primary-200'>
            <div className="text-xl italicp-4">HWYD</div>
            <div className='flex gap-4 items-center text-sm sm:text-base'>
                {session ? session.user.email : <></>}
                {session ? <Button variant='contained' onClick={() => { supabase.auth.signOut(); dispatch(unsetAll()); }}>Logout</Button> : <Login />}
            </div>
        </div>
    )
}

export default Header