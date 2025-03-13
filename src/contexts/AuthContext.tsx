import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { User } from "firebase/auth"; // Import Firebase User type
import { createUserWithEmailAndPassword } from "firebase/auth";



interface AuthContextType {
	currentUser: User | null;
	signup: (email: string, password: string) => Promise<any>;
	// login: (email: string, password: string) => Promise<any>;
	// logout: () => Promise<void>;
	// resetPassword: (email: string) => Promise<void>;
	// updateEmail: (email: string) => Promise<void>;
	// updatePassword: (password: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);




export function useAuth() {
	return useContext(AuthContext);
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) { //so children are being passed into the function
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
			setCurrentUser(user);
			setLoading(false); //don't render any of the application, before you load the current user
		})
		//only runs once
		return unsubscribe;
	}, [])

	const value: AuthContextType = {
		currentUser,
		// login,
		signup,
		// logout,
		// resetPassword,
		// updateEmail,
		// updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}