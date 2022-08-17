import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Navigate, useLocation} from "react-router-dom";
import {useAuthToken} from "../hooks";

export default () => {
    const { pathname } = useLocation();
    const ifList = pathname === '/';
    const [{ user }] = useAuthToken();
    if(ifList && !user )
    return <Navigate to="/login" />
    return (
        <>
            <Header { ...{  ifList, pathname }}/>
            <Sidebar { ...{  ifList, pathname }}/>
            <Content { ...{ ifList, pathname }}/>
        </  >
    )
}