import classNames from "classnames";
import styles from "../app.module.scss";
import {Link} from "react-router-dom";
import {useState} from "react";

function NewItem({ sendNew }: any) {
    const [title, setTitle] = useState('');

    return (
        <div className={styles.center} >
            <label>Title</label><br/>
            <input type={'text'} value={title} onChange={(e) => { setTitle(e.target.value) }} /><br/>
            <button onClick={() => { sendNew(title); setTitle('')}}>Add new</button>
        </div>
    )
}

function ToSignUp() {
    return (
        <div className={styles.center} >
            <div>No Account?</div>
            <Link to="/register">Sign up</Link>
        </div>
    )
}

function ToLogin() {
    return (<div className={styles.center} ><Link to="/login" >Login</Link></div>)
}

function ToMain() {
    return (<div className={styles.center} ><Link to={'/'}>To main page</Link></div>)
}

export default ({user, userLoaded, ifList, pathname }: any) => {
    let content = <span></span>;
    console.log('in sidebar::', user, userLoaded, ifList )
    switch (true) {
        case !!(userLoaded && ifList && user):
            content = (<NewItem sendNew={(e: string) => console.log('sent::', e)}/>);
            break;
        case !!(ifList && userLoaded && !user):
        case pathname === '/login':
            content = (<ToSignUp />);
            break;
        case pathname === '/register':
            content = (<ToLogin />);
            break;
        case pathname === '/reset-password':
            content = (<ToMain />);
            break;
    }
    console.log('content is::', content)
    return (
        <div className={classNames(styles.box, styles.sidebar)}>{content}</div>
    )
}