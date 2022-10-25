import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function HeaderSection(props) {
    return (
        <View style={{ marginTop: 5, marginBottom: 5 }}>
            <View
                style={styles.Container}
            >
                <Text style={styles.Title}>
                    {props.title}
                </Text>
                {props.buttonTitle != undefined &&
                    <TouchableOpacity style={styles.Button} onPress={props.onButtonClick}>
                        <AntDesign name="plus" size={24} color="black" />
                        <Text style={styles.ButtonText}>
                            {props.buttonTitle}
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 35,
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    Title: {
        paddingLeft: 20,
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        width: "71%",
    },
    Button: {
        position: "relative",
        marginRight: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: 50,
        padding: 7,
        backgroundColor: "#dbdbdb",
        borderRadius: 10,
    },
    ButtonText: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 2,
        paddingLeft: 3,
    }
})