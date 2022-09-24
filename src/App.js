import { useState } from "react";
import { auth, db, provider } from './firebase';
import Login from './components/Login'
import Home from './components/Home'

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleGoogleLogin = async () => {

    var newUser = {
        name: '',
        photo: '',
        uid: '',
        email : '',
        type : '',
    }

    try{
        var signedInUser = await auth.signInWithPopup(provider);    
        newUser = {
            email: signedInUser.user.email,
            name: signedInUser.user.displayName,
            photo: signedInUser.user.photoURL,
            uid: signedInUser.user.uid,
            type: signedInUser.additionalUserInfo.providerId,
        }
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        db.collection('users').doc(newUser.uid).get().then((doc) => {
            if(doc.exists){
                return
            }else{
                db.collection('/users').doc(newUser.uid).set(newUser)
            }
        })
    } catch(e){
        console.log(e.code);
    }
};

  const signOut = async () => {
		auth.signOut()
			.then(() => {
				localStorage.removeItem('user');
				setUser(null);
			})
			.catch((e) => {
				console.log(e.code);
			});
	};

  return (
    <div className="">
      {
        !user ?
        <Login handleGoogleLogin={handleGoogleLogin}/>
        :
        <Home signOut={signOut} user={user}/>
      }
    </div>
  );
}

export default App;
