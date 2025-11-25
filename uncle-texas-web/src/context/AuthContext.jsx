// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // aquí guardamos el usuario de Google
  const [loading, setLoading] = useState(true);

  // Escucha cambios de sesión (login / logout)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // signInWithPopup rellena "user" automáticamente en onAuthStateChanged
    } catch (err) {
      console.error("Error al iniciar sesión con Google", err);
      alert("No se pudo iniciar sesión con Google.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error al cerrar sesión", err);
      alert("No se pudo cerrar sesión.");
    }
  };

  const value = {
    user,            // aquí viene user.displayName, user.email, etc.
    loading,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
