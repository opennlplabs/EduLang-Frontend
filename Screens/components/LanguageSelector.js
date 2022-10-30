import { Select, Stack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useEffect } from "react";

export function LanguageSelector({ onValueChange, placeholder, defaultValue }) {
    useEffect(() => {
        console.log("Defualt vluae ", defaultValue)
    }, [])
    return (
        <Select
            w={{
                base: "100%",
            }}
            InputLeftElement={
                <Icon
                    as={<Ionicons name="language" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                />
            }
            placeholder={placeholder}
            onValueChange={onValueChange}
            defaultValue={defaultValue}
        >
            <Select.Item label="English" value="EN" />
            <Select.Item label="Somali" value="SO" />
            <Select.Item label="Xhosa" value="XH" />
            <Select.Item label="Pashto" value="PS" />
            <Select.Item label="Ukrainian" value="UK" />
            <Select.Item label="Hindi" value="HI" />
            <Select.Item label="Telugu" value="TE" />
            <Select.Item label="Twi" value="TW" />
            <Select.Item label="Assamese" value="AS" />
            <Select.Item label="Bengali" value="BN" />
            <Select.Item label="Gujarati" value="GU" />
            <Select.Item label="Kannada" value="KN" />
            <Select.Item label="Malayalam" value="ML" />
            <Select.Item label="Marathi" value="MR" />
            <Select.Item label="Nepali" value="NE" />
            <Select.Item label="Oriya" value="OR" />
            <Select.Item label="Punjabi" value="PA" />
            <Select.Item label="Sindhi" value="SD" />
            <Select.Item label="Punjabi" value="PA" />
            <Select.Item label="Sinhala" value="SI" />
            <Select.Item label="Tamil" value="TA" />
            <Select.Item label="Urdu" value="UR" />
            <Select.Item label="Burmese" value="MY" />
            <Select.Item label="Cebuano" value="CEB" />
        </Select>
    )
}