import {useEffect, useState} from "react";

import { gql, useQuery } from '@apollo/client';

const GET_GREETING = gql`
  query GetGreeting($language: String!) {
    greeting(language: $language) {
      message
    }
  }
`;


export const useGetUserList = (ifList: boolean, userID: number | null) => {
    const [loaded, setLoaded] = useState(false)
    const [userList, setUserList] = useState(null as any[] | null);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
            const time = new Date()
            setUserList([{ title: 'Titile 1', time}, { title: 'Title 2', time: new Date(time.valueOf() + 2000) }])
        }, 1000)
    })

    if(!ifList || !userID) {
        return {
            loaded: false,
            userList: null
        }
    }
    return { loaded, userList }
}

export const useUser = (ifList: boolean): { user: { name: string; id: number } | null; loaded: boolean; setUser: Function } => {

    const [user, setUser] = useState(ifList
        ? { name: 'User 1', id: 1}
        //? null
        : null as any)
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1000)
    }, [user])
    if(!ifList) {
        return {
            loaded: true,
            user: null,
            setUser: () => {}
        }
    }
    return {
        user,
        loaded,
        setUser: ({ user, password }: { user: string; password: string }) => {
            //send mutation
            setTimeout(() => {
                setUser({ name: user, id: 1})
            }, 1000)
        }
    }
}