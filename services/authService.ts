import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: name
        });
    }
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Erro ao sair", error);
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};