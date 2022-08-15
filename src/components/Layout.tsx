import styles from '../app.module.scss'
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import classNames from 'classnames'
import {Navigate, useLocation} from "react-router-dom";
import {useGetUserList, useUser} from "./hooks";
import {useState} from "react";

const haveUser = true
export default () => {
    const [login, setLogin] = useState({ user: null, token: null})
    const { pathname } = useLocation();
    const ifList = pathname === '/';
    const { user } = login;
    if(ifList && !user )
    return <Navigate to="/login" />
    return (
        <>
            <Header { ...{  ifList, pathname, user: login.user }}/>
            <Sidebar { ...{  ifList, pathname, user: login.user }}/>
            <Content { ...{ ifList, pathname,  setLogin }}/>
        </  >
    )
}