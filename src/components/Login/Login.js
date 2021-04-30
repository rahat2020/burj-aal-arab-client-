import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';


// firebase.initializeApp(firebaseConfig);

const Login = () => {
    // const [user, setUser] = useState({})
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    /////////firebase auth 
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); // if already initialized, use that one~
     }
     
    const handleGoogleSignIn = () => {
       var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(function(result)  {
                const {displayName, email} = result.user;
                const signedInUser = {name:displayName, email}
                console.log(signedInUser)
                setLoggedInUser(signedInUser)
                storeAuthToken();
                history.replace(from);
             }).catch(function(error)  {
                var errorMessage = error.message;
                console.log( errorMessage);
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            // console.log(idToken);
            sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div style={{textAlign: 'center', border:'2px solid gray', width:'500px', margin: 'auto', marginTop: '20px', padding: '20px'}}>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>sign in with google</button>
             {/* <h2>show user name:{loggedInUser.displayName}</h2>
            <h2>show user photo :{loggedInUser.photoURL}</h2>  */}
        </div>
    );
};

export default Login;