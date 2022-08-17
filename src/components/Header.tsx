import classNames from "classnames";
import styles from "../app.module.scss";
import {Link} from "react-router-dom";
import {useAuthToken} from "../hooks";


export default ({ ifList, pathname }: any) => {
    let content;
    let right = false;
    const [{ user }] = useAuthToken()
    switch (true) {
        case ifList:
            right = true;
            content = (<div>{user?.fullName}</div>);
            break
        case pathname === '/login':
            content = ('Login please!')
            break;
        case pathname === '/register':
            content = ('Please sign up')
            break;
        case pathname === '/reset-password':
            content = ('Please put new password')
            break;
        default:
            content = ('Page not found!')

    }
    return (
        <div className={classNames(styles.box, styles.header, {
            [styles.right]: right,
            [styles.center]: !right
        })}>{ifList
            ? <>
                <Link className={styles.link} to="/login">Re-login</Link>
                <span className={styles.margin}>{user?.fullName || 'No user'}</span>
            </>
            : user?.fullName || content}</div>
    )
}