import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./LiveTranslation";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';
import { server } from "./LiveTranslation";
import { uploadBook } from "./StorageUtils/BookStorage";

export const AddPDF = ({ navigation, route }) => {
    const [cameraPreview, setCameraPreview] = useState(false)
    const [images, setImages] = useState([])
    const [buttonTitle, setButtonTitle] = useState("Upload Book")
    var camera;

    const __deletePicture = async (index) => {
        var copy = [...images];
        copy.splice(index, 1);
        setImages(copy);
    };

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            // do something
            setCameraPreview(true);
        } else {
            Alert.alert("Access denied");
        }
    };

    const __takePicture = async () => {
        if (!camera) return;
        const photo = await camera.takePictureAsync({ base64: true, quality: 0.15 });
        var copy = [...images];
        copy.push(photo);
        setImages(copy);
        setCameraPreview(false);
    };

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }

    const GetPDF = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" })
        if (result.type === "cancel") return
        const base64 = await getBase64FromUrl(result.uri)

        const form = new FormData()
        form.append("PDFBase64", base64)
        const response = await axios({
            method: "post",
            url: `${server}/PDFtoImage`,
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        });
        const out = JSON.parse(response.data["response"])
        setImages(out)
    }

    const uploadPDF = async () => {
        console.log(route.params?.language.item)
        setButtonTitle("Uploading Book...")
        const title = route.params?.title
        const description = route.params?.description
        const lang = route.params?.language.item
        const cover = images[0]
        const pages = images

        await uploadBook(
            title,
            description,
            lang,
            cover,
            pages,
            true
        )
        navigation.goBack()
    }

    return (
        <View>
            <Text style={styles.IntroText}>
                Take pictures of the book that you want to translate using buttons, "Add PDF" or "Add Page" below. When you are1 done, click "Upload" button!
            </Text>
            {cameraPreview ? (
                <Camera
                    style={{ height: "65%", margin: 30, borderRadius: 20 }}
                    ref={(r) => {
                        camera = r;
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            flexDirection: "row",
                            flex: 1,
                            width: "100%",
                            padding: 20,
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                alignSelf: "center",
                                flex: 1,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={__takePicture}
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    backgroundColor: "#fff",
                                }}
                            />
                        </View>
                    </View>
                </Camera>
            ) : (
                <View style={styles.ContainerView}>
                    <Text style={styles.Header}>Pages:</Text>
                    <SafeAreaView style={{ height: "70%" }}>
                        {images.length === 0 && (
                            <Text style={styles.warning}>No pages added.</Text>
                        )}
                        <ScrollView horizontal showsVerticalScrollIndicator={false}>
                            {images.length !== 0 &&
                                images.map((element, index) => {
                                    return (
                                        <ImageBackground
                                            key={index}
                                            style={styles.Image}
                                            imageStyle={{ borderRadius: 20 }}
                                            source={{
                                                uri: `data:image/jpeg;base64,${element}`,
                                            }}
                                        >
                                            <Text style={styles.PageText}>Page #{index + 1}</Text>
                                            <TouchableOpacity
                                                style={styles.CloseButton}
                                                onPress={() => __deletePicture(index)}
                                            >
                                                <AntDesign
                                                    name="closecircleo"
                                                    size={24}
                                                    color="white"
                                                />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    );
                                })}
                        </ScrollView>
                    </SafeAreaView>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={[styles.Button, { marginRight: 5 }]} onPress={__startCamera}>
                            <Text style={{ textAlign: "center" }}>Add Page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Button, { marginLeft: 5 }]} onPress={GetPDF}>
                            <Text style={{ textAlign: "center" }}>Add PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.BottomView}>
                <TouchableOpacity
                    style={[styles.Button, styles.TranslateButton]}
                    onPress={uploadPDF}
                    disabled={buttonTitle !== "Upload Book"}
                >
                    <Text style={{ textAlign: "center" }}>{buttonTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}