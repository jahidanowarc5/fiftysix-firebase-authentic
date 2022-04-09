import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import './App.css';
import { useState } from 'react';
const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider ();
  const gitProvider = new GithubAuthProvider ();
  const handleSignIn = () =>{
    signInWithPopup( auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
    })
  }
  const handleGitSign = () =>{
    signInWithPopup(auth,gitProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
    })
  }
  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    .catch(error =>{
      console.error(error)
    })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>sign out</button> :
       <>
        <button onClick={handleSignIn}>Google sign in</button>
        <button onClick={handleGitSign}>github sign in</button>
       
       </>
      }
      <h4>NAME:{user.displayName}</h4>
      <p>email:{user.email}</p>
    </div>
  );
}

export default App;
