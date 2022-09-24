import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreateForm from '../../components/CreateForm'

function Create() {
    const router = useRouter()
    const isLoggedIn = useSelector(state => state.auth.uid);

    useEffect(() => {
        !isLoggedIn && router.push("/")
    }, [isLoggedIn])

    return (
        <div>
            <Head>
                <title>CodingHunter | Create Blog</title>
            </Head>
            <CreateForm update />
        </div>
    )
}

export default create;