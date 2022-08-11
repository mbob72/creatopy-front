import styles from '../app.module.scss'
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import classNames from 'classnames'
import {Navigate, useLocation} from "react-router-dom";
import {useGetUserList, useUser} from "./hooks";

const haveUser = true
export default () => {
    const { pathname } = useLocation();
    const ifList = pathname === '/';
    const { user, loaded: userLoaded } = useUser(ifList)
    const { userList, loaded } = useGetUserList(userLoaded, user && user!.id);
    if(ifList && !user && userLoaded)
    return <Navigate to="/login" />
    return (
        <>
            <Header { ...{user, userLoaded, ifList, pathname }}/>
            <Sidebar { ...{user, userLoaded, ifList, pathname }}/>
            <Content { ...{ loaded, ifList, pathname, userList }}/>
        </  >
    )
}