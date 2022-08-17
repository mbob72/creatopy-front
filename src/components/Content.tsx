import classNames from "classnames";
import styles from "../app.module.scss";
import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";

import { gql, useMutation } from '@apollo/client';
import {useAuthToken} from "../hooks";
import {ItemList} from "./ItemList";

const CREATE_USER = gql`
    mutation CreateUser($login: String!, $password: String!, $fullName: String!)  {
        createUser(createUserInput: { 
            login: $login,
            password: $password, 
            fullName: $fullName }) {
            id
            login
            fullName
        }
    }`

const UPDATE_USER = gql`
    mutation UpdateUser($login: String!, $password: String!, $fullName: String!)  {
        updateUser(updateUserInput: { 
            login: $login,
            password: $password, 
            fullName: $fullName }) {
            id
            login
            fullName
        }
    }`

const CREATE_TOKEN = gql`
    mutation CreateToken($login: String!, $password: String!) {
        createToken(createTokenInput: {
             login: $login, 
             password: $password 
         }) {
            token
            user {
                id
                fullName
                login
            }
        }
    }`


const Content = ({ ifList, pathname }: any) => {
    const [{ token }] = useAuthToken();
    if(token && ifList) {
        return <div className={classNames(styles.box, styles.content, !ifList && styles.boxForm)}><ItemList /></div>
    }
    let anotherScreen = <div>404 ERROR!!</div>
    switch (pathname) {
        case '/':
        case '/login':
            anotherScreen = <LoginForm />;
            break;
        case '/register':
            anotherScreen = <RegisterForm />;
            break;
        case '/reset-password':
            anotherScreen = token ? <ResetPasswordForm /> : <Navigate to="/login" />;
            break;
    }

    return (
        <div className={classNames(styles.box, styles.content, !ifList && styles.boxForm)}>{anotherScreen}</div>
    )
}
export default Content;

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [{ user }, { setToken, setUser }, logout] = useAuthToken();
    const [send, {loading, error, reset }] =  useMutation(CREATE_TOKEN, {
        onCompleted: (data) => {
            setToken!(data.createToken.token || '');
            setUser!(data.createToken.user || '')
        }
    });
    const disable = error || loading || !email || !password
    useEffect(() => {
        error && setTimeout(() => {
            setEmail('');
            setPassword('');
            reset()
        }, 2000)
    }, [error])

  return <>{!user ? (
      <form
        className={styles.inform}
        onSubmit={(e) => {
            e.preventDefault();
            send( {
                variables: { login: email, password}
            });
        }
        }>
        <input type="email"
               className={styles['form-control']}
               id="email"
               name="email"
               value={email}
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
        />
      <input type={showPassword ? 'text' : 'password'}
             className={styles['form-control']}
             name="password"
             id="password"
             value={password}
             placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}
      />
          <button
              type="button"
              className={styles.btn}
              onClick={() => setShowPassword(i => !i)}>
              <i
                  className={classNames(styles.far, styles[`fa-eye${showPassword ? '' : '-slash'}`])}
              ></i>
          </button>
          <button
              type="submit"
              disabled={!!disable}
              className={classNames(styles.btn, styles.center)}
          >Sign Up</button>
      </form>) : <div className={styles.inform}>You are<div>:: {user.fullName} ::</div>
                <button
                    className={classNames(styles.btn, styles.center)}
                    onClick={() => logout()}>Log OUT</button>
      <Link className={classNames(styles.btn, styles.center)} to="/reset-password">
          Change password/user info</Link>
                </div>}
      {error && <div className={styles.warningBox}>{error.toString()}</div>}
      {loading && <div className={styles.warningBox}>{'Loading...'}</div>}
      </>
}

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [send, {data, loading, error, reset }] =  useMutation(CREATE_USER);
    const [pwOk, setPwOk] = useState(true);
    const [userCreated, setUserCreated] = useState(false)
    const disable = error || loading || !email || !fullName || !password || !password2 || password !== password2
    useEffect(() => {
        setTimeout(() => {
            setEmail('');
            setFullName('');
            setPassword('');
            setPassword2('');
            reset()
        }, 2000)
    }, [error])
    useEffect(() => {
        data && setUserCreated(true)
    }, [data])
    useEffect(() => {
        setPwOk(password === password2);
    }, [password, password2])
    return (
    <>
        {!userCreated && <form
          className={styles.inform}
          onSubmit={(e) => {
            e.preventDefault();
            send( {
                variables: { login: email, password, fullName },
            });
            }
        }>
            <input type="email"
                   className={styles['form-control']}
                   id="email"
                   name="email"
                   value={email}
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="text"
                   className={styles['form-control']}
                   name="email"
                   value={fullName}
                   placeholder="Full name"
                   onChange={(e) => setFullName(e.target.value)}
            />
            <input type={showPassword ? 'text' : 'password'}
                   className={styles['form-control']}
                   name="password"
                   id="password"
                   value={password}
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}
            />
            <input type={showPassword ? 'text' : 'password'}
                   className={styles['form-control']}
                   name="password"
                   id="password"
                   value={password2}
                   placeholder="Password"
                   onChange={(e) => setPassword2(e.target.value)}
            />
            <button
                type="button"
                className={styles.btn}
                onClick={() => setShowPassword(i => !i)}>
                <i
                    className={classNames(styles.far, styles[`fa-eye${showPassword ? '' : '-slash'}`])}
                ></i>
            </button>
            <button
                type="submit"
                disabled={!!disable}
                className={classNames(styles.btn, styles.center)}
            >Sign Up</button>
        </form>}
        {!pwOk && <div className={styles.warningBox} >Passwords are not equal!</div>}
        {error && <div className={styles.warningBox}>{error.toString()}</div>}
        {loading && <div className={styles.warningBox}>{'Loading...'}</div>}
        {data && <div className={styles.warningBox}>{'User updated!!'}</div>}
    </>
    )
}


function ResetPasswordForm() {
    const [{ user }] = useAuthToken();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(user!.login)
    const [fullName, setFullName] = useState(user!.fullName)
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [send, {data, loading, error, reset}] = useMutation(UPDATE_USER);
    const [pwOk, setPwOk] = useState(true);
    const [userCreated, setUserCreated] = useState(false)
    const disable = error || loading || !email || !fullName || !password || !password2 || password !== password2
    useEffect(() => {
        error && setTimeout(() => {
            setEmail(user!.login);
            setFullName(user!.fullName);
            setPassword('');
            setPassword2('');
            reset()
        }, 2000)
    }, [error])
    useEffect(() => {
        data && setUserCreated(true)
    }, [data])
    useEffect(() => {
        setPwOk(password === password2);
    }, [password, password2])


    return (
        <>
        <form
            className={styles.inform}
            onSubmit={(e) => {
                e.preventDefault();
                send( {
                    variables: { login: email, password, fullName },
                });
            }
            }>
            <input type="email"
                   className={styles['form-control']}
                   id="email"
                   name="email"
                   value={email}
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="text"
                   className={styles['form-control']}
                   name="email"
                   value={fullName}
                   placeholder="Full name"
                   onChange={(e) => setFullName(e.target.value)}
            />
            <input type={showPassword ? 'text' : 'password'}
                   className={styles['form-control']}
                   name="password"
                   id="password"
                   value={password}
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}
            />
            <input type={showPassword ? 'text' : 'password'}
                   className={styles['form-control']}
                   name="password"
                   id="password"
                   value={password2}
                   placeholder="Password"
                   onChange={(e) => setPassword2(e.target.value)}
            />
            <button
                type="button"
                className={styles.btn}
                onClick={() => setShowPassword(i => !i)}>
                <i
                    className={classNames(styles.far, styles[`fa-eye${showPassword ? '' : '-slash'}`])}
                ></i>
            </button>
            <button
                type="submit"
                disabled={!!disable}
                className={classNames(styles.btn, styles.center)}
            >Update</button>
        </form>
        {!pwOk && <div className={styles.warningBox} >Passwords are not equal!</div>}
        {error && <div className={styles.warningBox}>{error.toString()}</div>}
        {loading && <div className={styles.warningBox}>{'Loading...'}</div>}
        {data && <div className={styles.warningBox}>{'User created!!'}</div>}
    </>
    )
}

