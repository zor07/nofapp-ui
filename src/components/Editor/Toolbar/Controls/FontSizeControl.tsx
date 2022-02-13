import {useActive, useCommands, useHelpers, useRemirrorContext} from "@remirror/react";
import React, {useState} from "react";
import {cx} from "remirror";
import {BoldIcon} from "./Icons";
import {AutoComplete, Input } from "antd";
import {UserOutlined} from "@ant-design/icons";
import css from './Controls.module.css'
import Select from "react-select";

const FontSizeControl = () => {
    const {setFontSize} = useCommands();
    const {getFontSizeForSelection} = useHelpers();
    const {view} = useRemirrorContext({autoUpdate: true});


    const [selectedOption, setSelectedOption] = useState({ value: '30', label: '30' });

    const options = [
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
    ];

    return (
        <>
            {/*"remirror-input"*/}
            <Select className={css.select}
                    filterOption={() => true}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    options={options}
                    placeholder="Font Size"/>

        </>
    );
}

export default FontSizeControl