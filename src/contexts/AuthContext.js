//We create this CONTEXT to house all authentication info we will need in any component in our application.
import React, { useContext, useState, useEffect } from 'react'

import firebaseApp, {authResult} from '../base'
import firebase from 'firebase'

//This React CONTEXT allows us to pass data through an application without having to pass props through too many components.
//Create the context below
const AuthContext = React.createContext();

//Below is the function that we will use to import our currentUser information, login/logout functions.
export function useAuth(){
    return useContext(AuthContext);
}

//Create the AuthProvider component. All other components will be nested inside of this component in App.js.
//CHILDREN is a parameter being passed through to this functional component that allows child components to be referred to as children.
export function AuthProvider({children}){
    //Create a hook that will capture the current user
    const [currentUser, setCurrentUser] = useState();

    //Create a hook that will manage when the components load in.
    //So this bool will start as true and flip to false as soon as the user information is loaded in, then the components will load in after that information is present.
    const [loading, setLoading] = useState(true);

    async function authenticate(){
        //instantiate a new Firebase GitHubAuthProvider object
        const authProvider = new firebase.auth.GithubAuthProvider();
        return(
            //signInWithPopup - firebase mechanism that will manage login through a popup screen
            firebase.auth().signInWithPopup(authProvider).then(authHandler)
        );
    }

    //The authHandler function details what we want to do with the user information we receive from GitHub.
    async function authHandler(authData){
        setCurrentUser(authData.user);
    }

    //Logout
    async function logout(){
        return firebaseApp.auth().signOut().then(setCurrentUser(null));
    }

    //Below we create an object that houses user, login, and logout functionalities. We will pass this object in as a prop in the UI below.
    const value = {currentUser, authenticate, logout};

    //Keep an updated record of user info using the useEffect()
    useEffect(() => {
        const authChange = authResult.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        //unsubscribe the firebase application since we have what we need from it
        return authChange;
    }, []);
    
    return(        
        //Use the AuthContext inside of the AuthProvider component to propagate/pass the state data throughout our application.
        //The prop called value is passing in our user info and functions to login/logout.
        <AuthContext.Provider value={value}>
            {/* if loading is false, child components render */}
            {!loading && children}
        </AuthContext.Provider>
    );
}