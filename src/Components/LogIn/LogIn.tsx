import { AuthCheck,
    StorageImage,
    useFirestoreDocData,
    useUser,
    useAuth,
    useFirestore
} from 'reactfire';
import firebase from "firebase";

function LogiIn() {
    const auth = useAuth();

    const signIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => auth.signInWithEmailAndPassword(email, password);


}