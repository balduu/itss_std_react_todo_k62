import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAU4T7XoRZJS_NGyPfYn1FoMDeN3I3PvGw",
    authDomain: "fir-sample-faabb.firebaseapp.com",
    projectId: "fir-sample-faabb",
    storageBucket: "fir-sample-faabb.appspot.com",
    messagingSenderId: "826639031334",
    appId: "1:826639031334:web:7a39eae2650b2456da9ae7"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getAllFBItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    console.log(items);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addNewFBItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
    console.log(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFBItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
    console.log(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearAllFBItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await db.collection("users").doc(uid).set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
}
