import { onAuthStateChanged } from "firebase/auth";
import { firebaseService } from "@/services";
import { firebaseAuthStateListener } from "@/services/firebase";

onAuthStateChanged(firebaseService.auth, firebaseAuthStateListener);

/* eslint-disable-next-line import/first */
import "expo-router/entry";
