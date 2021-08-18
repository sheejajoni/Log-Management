import React, {useReducer, createContext, useEffect} from "react";


export const UserContext = createContext();

const LOCAL_STORAGE_KEY = "ongev:patient:profile";
const UNAUTHENTICATED_PROFILE = {
    authenticated: false,
    uid: undefined,
    
    logoURL: false
}
const initialState =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || UNAUTHENTICATED_PROFILE;

if (!initialState.networks) {
    initialState.networks = []
}

if (Array.isArray(initialState.medications)) {
    initialState.medications = initialState.medications.join(', ')
}

if (!('interests' in initialState)) {
    initialState.interests = undefined
}

const reducer = (profile, action) => {
    let user

    switch (action.type) {
        case 'login':

            let newAge
            if (action.payload.birthday) {
                const diff_ms = Date.now() - new Date (action.payload.birthday).getTime()
                const age_dt = new Date(diff_ms);
                newAge = Math.abs(age_dt.getUTCFullYear() - 1970)
            }
            return{
                ...profile,
                authenticated: true,
            tokenExpired: false,
            uid: action.payload.id,
            firstName: action.payload.firstName,
            middleName: action.payload.middleName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            zip_code: action.payload.zip_code,
            


case 'logout':
    localStorage.removeItem("AUTH_TOKEN")
    localStorage.removeItem("contentSearch")
    localStorage.removeItem("contentSort")
    return {
        // ...profile,
        ...UNAUTHENTICATED_PROFILE,
};
default:
    return profile;
}
}

export const UserContextProvider = props => {
    const [profile, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
}, [profile])


    return(
        <UserContext.Provider value={[profile,dispatch]}>
    {props.children}
</UserContext.Provider>
)
}

export default UserContext
