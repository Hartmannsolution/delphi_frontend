import properties from "./properties";
import {AnswerType} from './types'
// import type AnswerType from "./AnswerList";
/**
 *
 * @param {The url that will be made a request to} url
 * @param {A callback function to handle the data, that comes back from the server} handleData
 * @param {A callback function to handle any error that comes back from the server} handleError
 * @param {GET (default), POST, PUT or DELETE} method
 * @param {Whether to attach a JWT token to the request or not: true or false} withToken
 * @param {For PUT or POST requests. The data to send to the server} body
 */
interface TokenObject { token: string } //Used here because fetchAny method uses a callback: handleData, that sometimes recieves back an object from the server and sometimes a string
// interface AnswerType {
//     text:string 
//     class_name: string
//     is_positive: boolean
//     id: number
//     count: number
//     inc_number?: number
//  }
function fetchAny(url: string, handleData: (data: TokenObject | string | [] | AnswerType[] | boolean) => void, handleError: (res: string) => void, method?: string, withToken?: boolean, body?: object) {
    if (properties.SERVERURL)
        url = properties.SERVERURL + url;
        console.log('*URUR*',url);
    const options = makeOptions(method, withToken, body);
    fetch(url, options)
        .then(res => handleHttpErrors(res))
        .then(data => handleData ? handleData(data) : null)
        .catch(err => {
            if (err.status) {
                err.fullError.then((e: { message: string; }) => { if (handleError) handleError(err.status + ': ' + e.message) });
                console.log("ERROR:", err.status);
            }
            else { console.log("Network error"); }
        }
        );
    console.log(options);

    type OptType = { method: string, headers: { "Content-type"?: string, "Accept"?: string, "x-access-token"?: string }, body?: string }
    
    function makeOptions(method?: string, withToken?: boolean, body?: object) {
        method = method ? method : 'GET';
        var opts: OptType = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && { //using spread operator to conditionally add member to headers object.
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (withToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken()!; //The exclamation mark is the non-null assertion operator in TypeScript.
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    function handleHttpErrors(res: Response) {
        if (!res.ok) {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json();
    }
}

const login = (username: string, password: string, setLoggedIn: (loggedIn: boolean) => void, setError: () => void) => {
    const body = { username, password };

    // "Safeguard method" to see typecheck if res below is of type object and it would have a property: token
    function isTokenObject(object: any): object is TokenObject {
        return 'token' in object;
    }
    return fetchAny(
        "login",
        (res) => {
            if (isTokenObject(res)) { //This is necessary because res is sometimes a string and sometimes an object with a property: token.
                setToken(res.token!);
                setLoggedIn(true)
            }
        },
        setError,
        'POST',
        false
        , body
    )
}
//getToken,
//loggedIn,
//login,
//logout
const setToken = (token: string) => {
    localStorage.setItem('jwtToken', token)
}

const getToken = () => {
    return localStorage.getItem('jwtToken')
}

const loggedIn = () => {
    return getToken() != null;
}

const logout = (setLoggedIn: (loggedIn: boolean) => void) => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
}

export default { fetchAny, login, setToken, getToken, loggedIn, logout };


