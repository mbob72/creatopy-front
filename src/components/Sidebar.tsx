import classNames from "classnames";
import styles from "../app.module.scss";
import {Link} from "react-router-dom";
import {useAuthToken} from "../hooks";
import {NewItem} from "./ItemList";


function ToSignUp({ user }: any) {
    return !user ? (
        <div className={styles.center} >
            <div>No Account?</div>
            <Link className={styles.link} to="/register">Sign up</Link>
        </div>
    ) : (
        <div className={styles.center} >
            <div>Show items?</div>
            <Link className={styles.link} to="/">Yep...</Link>
        </div>
    )
}

function ToLogin() {
    return (<div className={styles.center} ><Link className={styles.link} to="/login" >Login</Link></div>)
}

function ToMain() {
    return (<div className={styles.center} ><Link className={styles.link} to={'/'}>To main page</Link></div>)
}

export default ({ ifList, pathname }: any) => {
    const [{ user }] = useAuthToken();
    let content = <span></span>;
    switch (true) {
        case !!( ifList && user):
            content = (<NewItem />);
            break;
        case !!(ifList && !user):
        case pathname === '/login':
            content = (<ToSignUp user={user}/>);
            break;
        case pathname === '/register':
            content = (<ToLogin />);
            break;
        case pathname === '/reset-password':
            content = (<ToMain />);
            break;
    }
    return (
        <div className={classNames(styles.box, styles.sidebar)}>{content}</div>
    )
}