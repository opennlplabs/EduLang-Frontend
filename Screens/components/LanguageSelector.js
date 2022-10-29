import { Select } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

export function LanguageSelector({ onValueChange, placeholder }) {
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
        >
            <Select.Item label="English" value="EN" />
            <Select.Item label="Somali" value="SO" />
            <Select.Item label="Xhosa" value="XH" />
            <Select.Item label="Pashto" value="PS" />
            <Select.Item label="Ukrainian" value="UK" />

        </Select>
    )
}