import classNames from "classnames";
import styles from "../app.module.scss";
import {useEffect, useState} from "react";

import { gql, useQuery, useMutation } from '@apollo/client';

const GET_GREETING = gql`
  query GetGreeting($language: String!) {
    greeting(language: $language) {
      message
    }
  }
`;
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

export default ({ ifList, pathname, loaded, userList }: any) => {
    let anotherScrieen = <div>404 ERROR!!</div>
    switch (pathname) {
        case '/login':
            anotherScrieen = <LoginForm />;
            break;
        case '/register':
            anotherScrieen = <RegisterForm />;
            break;
        case pathname === '/reset-password':
            anotherScrieen = <ResetPasswordForm send={(a: any) => console.log('send reset::', a) }/>

    }



    return (
        <div className={classNames(styles.box, styles.content, !ifList && styles.boxForm)}>{
            ifList
                ? loaded && (userList as any[]).map((item: any) => <div>{item.title}</div>)
                : anotherScrieen}</div>
    )
}
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [send, {data, loading, error }] =  useMutation(CREATE_USER)
  console.log('have status::', data, loading, error);
  return (
    <form className="auth-form" onSubmit={(e) => {
        e.preventDefault();
        send({
            variables: { login: email, password, fullName: email },
        })
    }}>
        <div className="email mb-3">
            <input type="email"
                   className={`form-control`}
                   id="email"
                   name="email"
                   value={email}
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}
            />

        </div>

        <div className="password mb-3">
            <div className="input-group">
                <input type={showPassword ? 'text' : 'password'}
                       className={`form-control`}
                       name="password"
                       id="password"
                       value={password}
                       placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button
                    type="button"
                    onClick={() => setShowPassword(i => !i)}>
                <i className={classNames(styles.far, styles[`fa-eye${showPassword ? '' : '-slash'}`])} ></i>
                </button>
            </div>

        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Log In</button>
        </div>
    </form>
 )
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
    console.log('have status::', data, loading, error);
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
            >Log In</button>
        </form>}
        {!pwOk && <div className={styles.warningBox} >Passwords are not equal!</div>}
        {error && <div className={styles.warningBox}>{error.toString()}</div>}
        {loading && <div className={styles.warningBox}>{'Loading...'}</div>}
        {data && <div className={styles.warningBox}>{'User created!!'}</div>}
    </>
    )
}


function ResetPasswordForm({ send }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordOld, setPasswordOld] = useState('');
    const [newPassword, setNewPasswordNew] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('')
    return (
        <form className="auth-form" onSubmit={(e) => send({ email, passwordOld, newPassword, password2 })}>
            <div className="email mb-3">
                <input type="email"
                       className={`form-control`}
                       id="email"
                       name="email"
                       value={email}
                       placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <div className="password mb-3">
                <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'}
                           className={`form-control`}
                           name="password"
                           id="password"
                           value={passwordOld}
                           placeholder="Password"
                           onChange={(e) => setPasswordOld(e.target.value)}
                    />

                    <input type={showPassword ? 'text' : 'password'}
                           className={`form-control`}
                           name="password"
                           id="password"
                           value={newPassword}
                           placeholder="Password"
                           onChange={(e) => setNewPasswordNew(e.target.value)}
                    />
                    <input type={showPassword ? 'text' : 'password'}
                           className={`form-control`}
                           name="password"
                           id="password"
                           value={password2}
                           placeholder="Password"
                           onChange={(e) => setPassword2(e.target.value)}
                    />
                <br/>
                    <button
                        type="button"
                        onClick={() => setShowPassword(i => !i)}>
                        <i className={classNames(styles.far, styles[`fa-eye${showPassword ? '' : '-slash'}`])} ></i>
                    </button>
                </div>

            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Log In</button>
            </div>
        </form>
    )
}

