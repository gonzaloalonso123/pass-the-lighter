import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import { Lighter, Log } from "../types/types";
import { log } from "console";

export const getOneLighter = async (id: string) => {
  console.log(id);
  const docRef = doc(db, "lighters", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Lighter;
  } else {
    return null;
  }
};

export const submitLog = async (
  log: Log,
  distanceTraveled: number,
  lighterId: string,
  previousDistanceTraveled: number
) => {
  const lightersRef = doc(db, "lighters", lighterId);

  await updateDoc(lightersRef, {
    log: arrayUnion({
      nickname: log.nickname,
      when: log.when,
      where: log.where,
      message: log.message,
      image: log.image,
    }),
    distanceTraveled: distanceTraveled + previousDistanceTraveled,
  });

  const metadataRef = doc(db, "metadata", "tP8pFfOA8QMPfaxMgNze");
  const docSnap = await getDoc(metadataRef);
  const metadata = docSnap.data() as {
    totalPassed: number;
    totalLighters: number;
    totalKm: number;
  };
  await updateDoc(metadataRef, {
    totalKm: metadata.totalKm + distanceTraveled,
    totalPassed: metadata.totalPassed + 1,
  });
};

export const getMetadata = async () => {
  const docRef = doc(db, "metadata", "tP8pFfOA8QMPfaxMgNze");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as {
      totalPassed: number;
      totalLighters: number;
      totalKm: number;
    };
  } else {
    return null;
  }
};

export const createLighter = async (
  code: string,
  nickname: string,
  objective: string
) => {
  console.log(code);
  const lighterRef = doc(db, "lighters", code);
  updateDoc(lighterRef, {
    nickname: nickname,
    distanceTraveled: 0,
    objective: objective,
  });
};

export const resetTestLighter = () => {
  const lighterRef = doc(db, "lighters", "1AKV5");
  updateDoc(lighterRef, {
    distanceTraveled: 0,
    log: [],
    objective: "",
    nickname: "",
  });
};
