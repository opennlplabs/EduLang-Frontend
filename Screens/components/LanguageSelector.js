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
            <Select.Item label="Afrikaans" value="AF" />
            <Select.Item label="English" value="EN" />
            <Select.Item label="Amharic" value="AM" />
            <Select.Item label="Arabic" value="AR" />
            <Select.Item label="Aymara" value="AY" />
            <Select.Item label="Azerbaijani" value="AZ" />
            <Select.Item label="Belarusian" value="BE" />
            <Select.Item label="Bulgarian" value="BG" />
            <Select.Item label="Bambara" value="BM" />
            <Select.Item label="Bosnian" value="BS" />
            <Select.Item label="Catalan" value="CA" />
            <Select.Item label="Corsican" value="CO" />
            <Select.Item label="Czech" value="CS" />
            <Select.Item label="Welsh" value="CY" />
            <Select.Item label="Danish" value="DA" />
            <Select.Item label="German" value="DE" />
            <Select.Item label="Dhivehi" value="DV" />
            <Select.Item label="Greek" value="EL" />
            <Select.Item label="Esperanto" value="EO" />
            <Select.Item label="Spanish" value="ES" />
            <Select.Item label="Estonian" value="ET" />
            <Select.Item label="Basque" value="EU" />
            <Select.Item label="Persian" value="FA" />
            <Select.Item label="Finnish" value="FI" />
            <Select.Item label="French" value="FR" />
            <Select.Item label="Frisian" value="FY" />
            <Select.Item label="Irish" value="GA" />
            <Select.Item label="Scots Gaelic" value="GD" />
            <Select.Item label="Galician" value="GL" />
            <Select.Item label="Guarani" value="GN" />
            <Select.Item label="Hausa" value="HA" />
            <Select.Item label="Hawaiian" value="HAW" />
            <Select.Item label="Hebrew" value="HE" />
            <Select.Item label="Croatian" value="HR" />
            <Select.Item label="Haitian Creole" value="HT" />
            <Select.Item label="Hungarian" value="HU" />
            <Select.Item label="Armenian" value="HY" />
            <Select.Item label="Indonesian" value="ID" />
            <Select.Item label="Igbo" value="IG" />
            <Select.Item label="Icelandic" value="IS" />
            <Select.Item label="Italian" value="IT" />
            <Select.Item label="Japanese" value="JA" />
            <Select.Item label="Javanese" value="JV" />
            <Select.Item label="Georgian" value="KA" />
            <Select.Item label="Kazakh" value="KK" />
            <Select.Item label="Khmer" value="KM" />
            <Select.Item label="Kannada" value="KN" />
            <Select.Item label="Korean" value="KO" />
            <Select.Item label="Kurdish" value="KU" />
            <Select.Item label="Lao" value="LA" />
            <Select.Item label="Latvian" value="LV" />
            <Select.Item label="Lithuanian" value="LT" />
            <Select.Item label="Luxembourgish" value="LB" />
            <Select.Item label="Macedonian" value="MK" />
            <Select.Item label="Malagasy" value="MG" />
            <Select.Item label="Malay" value="MS" />
            <Select.Item label="Malayalam" value="ML" />
            <Select.Item label="Maltese" value="MT" />
            <Select.Item label="Maori" value="MI" />
            <Select.Item label="Marathi" value="MR" />
            <Select.Item label="Mongolian" value="MN" />
            <Select.Item label="Burmese" value="MY" />
            <Select.Item label="Nepali" value="NE" />
            <Select.Item label="Norwegian Bokmal" value="NB" />
            <Select.Item label="Ndebele, North" value="ND" />
            <Select.Item label="Ndebele, South" value="NS" />
            <Select.Item label="Ndonga" value="NG" />
            <Select.Item label="Nepali" value="NE" />
            <Select.Item label="Dutch" value="NL" />
            <Select.Item label="Norwegian Nynorsk" value="NN" />
            <Select.Item label="Norwegian" value="NO" />
            <Select.Item label="Nuosu" value="II" />
            <Select.Item label="Occitan" value="OC" />
            <Select.Item label="Oromo" value="OM" />
            <Select.Item label="Odia (Oriya)" value="OR" />
            <Select.Item label="Punjabi" value="PA" />
            <Select.Item label="Polish" value="PL" />
            <Select.Item label="Pashto" value="PS" />
            <Select.Item label="Portuguese" value="PT" />
            <Select.Item label="Quechua" value="QU" />
            <Select.Item label="Romanian" value="RO" />
            <Select.Item label="Russian" value="RU" />
            <Select.Item label="Kinyarwanda" value="RW" />
            <Select.Item label="Sanskrit" value="SA" />
            <Select.Item label="Sindhi" value="SD" />
            <Select.Item label="Sinhala (Sinhalese)" value="SI" />
            <Select.Item label="Slovak" value="SK" />
            <Select.Item label="Slovenian" value="SL" />
            <Select.Item label="Samoan" value="SM" />
            <Select.Item label="Shona" value="SN" />
            <Select.Item label="Somali" value="SO" />
            <Select.Item label="Albanian" value="SQ" />
            <Select.Item label="Serbian" value="SR" />
            <Select.Item label="Sesotho" value="ST" />
            <Select.Item label="Sundanese" value="SU" />
            <Select.Item label="Swedish" value="SV" />
            <Select.Item label="Swahili" value="SW" />
            <Select.Item label="Tamil" value="TA" />
            <Select.Item label="Telugu" value="TE" />
            <Select.Item label="Tajik" value="TG" />
            <Select.Item label="Thai" value="TH" />
            <Select.Item label="Tigrinya" value="TI" />
            <Select.Item label="Turkmen" value="TK" />
            <Select.Item label="Tagalog (Filipino)" value="TL" />
            <Select.Item label="Turkish" value="TR" />
            <Select.Item label="Tsonga" value="TS" />
            <Select.Item label="Tatar" value="TT" />
            <Select.Item label="Twi" value="TW" />
            <Select.Item label="Uyghur" value="UG" />
            <Select.Item label="Ukrainian" value="UK" />
            <Select.Item label="Urdu" value="UR" />
            <Select.Item label="Uzbek" value="UZ" />
            <Select.Item label="Vietnamese" value="VI" />
            <Select.Item label="Xhosa" value="XH" />
            <Select.Item label="Yiddish" value="YI" />
            <Select.Item label="Yoruba" value="YO" />
            <Select.Item label="Chinese (Simplified)" value="ZH-CN" />
            <Select.Item label="Chinese (Traditional)" value="ZH-TW" />
            <Select.Item label="Zulu" value="ZU" />
            <Select.Item label="Hindi" value="HI" />

        </Select>
    )
}