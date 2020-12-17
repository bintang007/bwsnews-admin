import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Credentials!',
            credentials: {
                username: {label: 'Username!', type: 'text', placeholder: 'Your username'},
                password: {label: 'Password', type: 'password'}
            },
            authorize: async credentials => {
                if (credentials.username === 'username' && credentials.password === 'password') {
                    return Promise.resolve(true)
                }
            }
        })
    ],
    callbacks: {
        // signIn: async (user) => {
        //     return Promise.resolve(false)
        // }
    },
    pages: {
        signIn: '/auth/signin'
    }
}

export default (req, res) => NextAuth(req, res, options)