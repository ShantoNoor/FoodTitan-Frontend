import { createContext, useEffect, useState } from "react";
import app from "../utils/firebase.init";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as _updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { axiosn } from "../hooks/useAxios";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      (async () => {
        if (currentUser?.email) {
          try {
            const userInfo = await axiosn.get(
              `/users?email=${currentUser?.email}`
            );
            setUser(userInfo.data[0]);
          } catch (err) {
            console.error(err);
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      })();
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const popUpSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const signOut = () => {
    setLoading(true);
    _signOut(auth)
      .then(() => {
        toast.success("Sign Out successfull!");
        return true;
      })
      .catch((err) => {
        toast.error("Failed To Sign Out");
        toast.error(err.message);
        return false;
      });
  };

  const updateProfile = (name, photo) => {
    return new Promise((resolve) => {
      _updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
        .then(() => {
          toast.success("Profile Update Successfull!");
          resolve(true);
        })
        .catch((err) => {
          toast.error("Failed To Update Profile");
          toast.error(err.message);
        });
    });
  };

  const signUp = (name, email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Sign Up Successfull!");
          resolve(userCredential.user);
        })
        .catch((err) => {
          toast.error("Failed To Sign Up");
          toast.error(err.message);
        });
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Sign In Successfull!");
          resolve(userCredential.user);
        })
        .catch((err) => {
          toast.error("Failed To Sign In");
          toast.error(err.message);
        });
    });
  };

  const popUp = (media) => {
    setLoading(true);
    return new Promise((resolve) => {
      popUpSignIn(media)
        .then((res) => {
          toast.success("Sign In Successfull!");
          resolve(res.user);
        })
        .catch((err) => {
          toast.error("Failed To Sign In");
          toast.error(err.message);
        });
    });
  };

  const googlePopUp = () => popUp(googleProvider);
  const githubPopUp = () => popUp(githubProvider);

  return (
    <AuthContext.Provider
      value={{
        googlePopUp,
        githubPopUp,
        user,
        setUser,
        signOut,
        signUp,
        signIn,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
