import {useCookies} from "react-cookie";
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';

const TOKEN_NAME = "authToken";
const USER = "USER"
type User = { login: string, fullName: string }

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = (): [{ token: string; user: User | null}, { setToken: Function; setUser: Function}, Function] => {

    //we use react-cookies to access our cookies
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME, USER]);
    let user: User | null = null;
    try { user = cookies[USER] }
    catch (e) {  }


    // this function allows to save any string in our cookies, under the key "authToken"
    const setToken = (authToken: string) => setCookie(TOKEN_NAME, authToken);
    const setUser = (user: User) => {
        try {
            setCookie(USER, JSON.stringify(user))
        } catch (e) { setCookie(USER, '')}
    };
    console.log('have user::', cookies, user)

    //this function removes the key "authToken" from our cookies. Useful to logout
    const removeToken = () => removeCookie(TOKEN_NAME);
    const removeUser = () => removeCookie(USER);

    return [{ token: cookies[TOKEN_NAME], user }, { setToken, setUser }, () => { removeToken(); removeUser() } ];
};

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authMiddleware = (authToken: string) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [{token}] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(token).concat(httpLink),
        cache,
    });
};