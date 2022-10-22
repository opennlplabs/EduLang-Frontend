import * as firebase from "firebase";

export function createUser(email, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve("Success")
            })
            .catch((re) => {
                switch (re.code) {
                    case "auth/email-already-in-use":
                        reject(`Email address ${email} already in use.`);
                        break;
                    case "auth/invalid-email":
                        reject(`Email address ${email} is invalid.`);
                        break;
                    case "auth/weak-password":
                        reject(
                            "Password is not strong enough. Add additional characters including special characters and numbers."
                        );
                        break;
                    default:
                        reject("Unknown error!");
                }
            });
    })
}

export function loginEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve("success")
            })
            .catch((re) => {
                switch (re.code) {
                    case "auth/wrong-password":
                        reject("You have entered an incorrect password.");
                        break;
                }
                reject("Unknown login error")
            });
    })
};

export async function logoutUserFirebase() {
    return firebase.auth().signOut()
}

export function getUserInfoFirebase() {
    return new Promise((resolve, reject) => {
        firebase
            .firestore()
            .collection("userInfo")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(async (snapshot) => {
                if (snapshot) {
                    // Get data from snapshot
                    var grade = snapshot.data().grade 
                    var nativeLanguage = snapshot.data()?.nativeLanguage
                    var translatedLanguageConfig = snapshot.data()?.translatedLanguageConfig
                    var username = snapshot.data()?.username
                    var isAdmin = snapshot.data()?.isAdmin 

                    // Check if variable are undefined and set to default values
                    if (grade == undefined) {
                        await setUserInfo(undefined, undefined, 1, undefined)
                        grade = 1
                    }
                    if (nativeLanguage == undefined) {
                        const val = {
                            id: "EN",
                            item: "English"
                        }
                        await setUserInfo(val, undefined, undefined, undefined)
                        nativeLanguage = val
                        
                    }
                    if (translatedLanguageConfig == undefined) {
                        const val = {
                            id: "XH",
                            item: "Xhosa",
                        }
                        await setUserInfo(undefined, val, undefined, undefined)
                        translatedLanguageConfig = val
                    } 
                    resolve([grade, nativeLanguage, translatedLanguageConfig, username, isAdmin]) 
                }
                else {
                    reject("Unable to get snapshot data")
                }
            });
    })
}

export async function setUserInfo(nativelanguage, translatedlanguage, grade, username) {
    const info = {}
    if (nativelanguage != undefined && nativelanguage != null) info.nativeLanguage = nativelanguage
    if (translatedlanguage != undefined && translatedlanguage != null) info.translatedLanguageConfig = translatedlanguage
    if (grade != undefined && grade != null) info.grade = grade
    if (username != undefined && username != null) info.username = username
    info.isAdmin = false

    return new Promise((resolve, reject) => {
        let uid = firebase.auth()?.currentUser?.uid;
        if (uid == undefined || uid == null) reject("UID is null!")

        firebase
            .firestore()
            .collection("userInfo")
            .doc(uid)
            .set(info, {
                merge: true
            })
            .then(() => { resolve("success") })
            .catch((err) => { reject(err) });
    })
}