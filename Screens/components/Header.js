import { COLORS, FONTS } from "../../constants";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function Header(props) {
    return (
        <View style={{
            height: 150
        }}>
            {/* <SvgComponent /> */}
            <View
                style={{
                    backgroundColor: "#4CA4D3",
                    padding: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    margin: 5,
                    width: "90%",
                    top: 60,
                    position: "absolute",
                    borderRadius: 6,
                    justifyContent: "space-between",
                }}
            >

                <TextInput
                    style={{ backgroundColor: "#4CA4D3", width: "90%", color: "white" }}
                    placeholder="Search book"
                    placeholderTextColor="white"
                    onChangeText={props.onSearchBarChange}
                />
                <AntDesign name="search1" size={24} color="white" />
            </View>
            <View
                style={{
                    position: "absolute",
                    top: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    paddingHorizontal: 20,
                }}
            >
                {/* Greetings */}
                <Text style={{ ...FONTS.h2, color: COLORS.black, flex: 1 }}>
                    {props.title}
                </Text>
                {props.onFeedbackPress != undefined &&
                    <TouchableOpacity onPress={props.onFeedbackPress}>
                        <Image
                            source={require("../../assets/images/feedbackIcon.png")}
                            style={{ height: 25, width: 25, marginLeft: 16 }}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};