import {
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error,setError] = useState (null)
    const [loading, setLoading] = useState(null)

// cleanup
// deal with memory leak
const [cancelled, setCancelled] = useState(false)

const auth = getAuth()

function checkIfIsCancelled () {
    if (cancelled) {
        return;
    }
}

const createUser = async (dataUser) => {
    checkIfIsCancelled();

    setLoading(true)
    setError(null);

    try{ 
        const {user} = await createUserWithEmailAndPassword(
            auth,
            dataUser.email,
            dataUser.password
        )

            await updateProfile(user, {
                displayName: dataUser.displayName,
                // sobrename: dataUser.sobrename
                email: dataUser.email
            })

            setLoading(false);

            return user

    } catch (error) {

        console.log(error.message)
        console.log(typeof error.message)

        let systemErrorMessage

        if(error.code === "auth/weak-password"){
            systemErrorMessage  = "A senha precisa conter pelomenos 6 caracteres.";
        }

        if(error.code ==="auth/email-already-in-use"){
            systemErrorMessage = "Usuário já cadastrado"
        }
        
        setLoading(false);
        setError(systemErrorMessage);
        console.log(systemErrorMessage)
    }
}

//logout - sign out
const logout = () => {
    checkIfIsCancelled();
    signOut(auth)
}

// login - sign in
const login = async(dataUser) => {

checkIfIsCancelled()

setLoading(true)
setError(false)

try {

    await signInWithEmailAndPassword(auth, dataUser.email, dataUser.password);
    setLoading(false);

} catch (error) {

    let systemErrorMessage;

    if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
    } else if(error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
    } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
    }
    setError(systemErrorMessage)
    setLoading(false);
    }
}


useEffect (() => {
    return () => setCancelled(true);
    }, []);

    return{
        auth,
        createUser,
        error,
        setError,
        loading,
        logout,
        login,
    };
};