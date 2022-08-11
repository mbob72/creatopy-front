import classNames from "classnames";
import styles from "../app.module.scss";
import {useState} from "react";

export default ({ ifList, pathname, loaded, userList }: any) => {
    let anotherScrieen = <div>404 ERROR!!</div>
    switch (pathname) {
        case '/login':
            anotherScrieen = <LoginForm send={(a: any) => console.log('send login::', a)}/>;
            break;
        case '/register':
            anotherScrieen = <RegisterForm send={(a: any) => console.log('send register::', a) }/>;
            break;
        case pathname === '/reset-password':
            anotherScrieen = <ResetPasswordForm send={(a: any) => console.log('send reset::', a) }/>

    }



    return (
        <div className={classNames(styles.box, styles.content)}>{
            ifList
                ? loaded && (userList as any[]).map((item: any) => <div>{item.title}</div>)
                : anotherScrieen}</div>
    )
}
function LoginForm({ send }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  return (
    <form className="auth-form" onSubmit={(e) => send({ email, password })}>
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

function RegisterForm({ send }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('')
    return (
        <form className="auth-form" onSubmit={(e) => send({ email, password, password2 })}>
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

