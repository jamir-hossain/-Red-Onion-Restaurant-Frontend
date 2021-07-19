import { toast } from 'react-toastify';
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken';
import { authenticate, removeCookie, removeLocalStorage } from './AuthHelper';
import * as firebase from "firebase/app";
import { useContextData } from '../ContextProvider';
import "firebase/auth";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../../../firebaseConfig";
firebase.initializeApp(firebaseConfig);


const FirebaseHandler = () => {
   const history = useHistory()
   const {setUser, setMessage, setFormLoader} = useContextData()

   // Save Logged in use token
   const userToken = () => {
      firebase.auth().currentUser.getIdToken(true)
      .then(function(idToken) {
         authenticate(idToken, () => {
            const {name} = jwtDecode(idToken)
            toast.success(`Hey ${name}, Welcome back!`);
         });
         setUser(jwtDecode(idToken))
      }).catch(function(error) {
         toast.success(error.message);
      });
   }

   // Sign In With Gmail
   const signInWithGmail = async () => {
      try {
         const provider = new firebase.auth.GoogleAuthProvider();
         await firebase.auth().signInWithPopup(provider)
         userToken()
         history.push('/')
      } catch (error) {
         toast.error(error.message)
      }
   }

   // Sign In With Facebook
   const signInWithFacebook = async () => {
      try {
         const fbProvider = new firebase.auth.FacebookAuthProvider();
         await firebase.auth().signInWithPopup(fbProvider)
         userToken()
         history.push('/')
      } catch (error) {
         toast.error(error.message)
      }
   }

   // Sign Up With Email and Password
   const signUpWithEmailAndPassword = async (dataToken) => {
      setFormLoader(true)
      const {username, email, password} = jwtDecode(dataToken)
      try {
         await firebase.auth().createUserWithEmailAndPassword(email, password)
         setFormLoader(false)
         toast.success('Sign Up Successful.')
         history.push('/login')
         addUserName(username)
      } catch (error) {
         toast.error(error.message)
         setFormLoader(false)
      }
   }
   const addUserName = (username) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: username,
      }).then(function() {
         console.log('Profile is successfully updated')
      }).catch(function(error) {
         console.log(error.message)
      });
   }
 
   // Email verification after submit Sign-up Form 
   const emailVerification = async (formData) => {
      setFormLoader(true)
      try {
         const {username, email, password} = formData
         const token = await jwt.sign({
            username, 
            email, 
            password 
         }, 'qwertyuiop', { expiresIn: "10m"});

         const config = {
            url: `http://localhost:3000/complete-registration/${token}`,
            handleCodeInApp: true,
         };
         await firebase.auth().sendSignInLinkToEmail(formData.email, config)
         toast.success(`We are sent an email to ${formData.email}. Please Check Your mail and Complete the registration Process`)
      } catch (error) {
         toast.error(error.message)
      }
   }

   // Sign In With Email and Password
   const signWithEmailAndPassword = async (email, password) => {
      setFormLoader(true)
      try {
         await firebase.auth().signInWithEmailAndPassword(email, password)
         setFormLoader(false)
         userToken()
         history.push('/')
      } catch (error) {
         setFormLoader(false)
         toast.error(error.message)
      }
   }

   // Sign Out
   const signOut = async () => {
      try {
         setUser(null)
         removeCookie('redOnionToken');
         removeLocalStorage('redOnionUser');
         toast.success('Sign Out Successful.')
         history.push('/')
         await firebase.auth().signOut()
      } catch (error) {
         toast.success(error.message)
      }
   }

   // Password Reset Email
   const resetPassword = async (email, history) => {
      setFormLoader(true)
      try {
         var auth = firebase.auth();
         await auth.sendPasswordResetEmail(email)
         toast.success('We Are Sent A Password Reset Email. Please Check Your Email.')
         setFormLoader(false)
         history.push('/signin')
      } catch (error) {
         setFormLoader(false)
         toast.error(error.message)
      }
   }


   return {
      signOut,
      resetPassword,
      signInWithGmail,
      emailVerification,
      signInWithFacebook,
      signUpWithEmailAndPassword,
      signWithEmailAndPassword
   }
};

export default FirebaseHandler;