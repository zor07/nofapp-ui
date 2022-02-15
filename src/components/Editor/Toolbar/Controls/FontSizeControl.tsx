import {useActive, useCommands, useHelpers, useRemirrorContext} from "@remirror/react";
import React, {useEffect, useState} from "react";
import {cx} from "remirror";
import {BoldIcon} from "./Icons";
import {AutoComplete, Input } from "antd";
import {UserOutlined} from "@ant-design/icons";
import css from './Controls.module.css'
import Select, {ActionMeta, OnChangeValue} from "react-select";
import CreatableSelect from "react-select/creatable";

type FontSizeOption = {
    value: string
    label: string
}

const FontSizeControl = () => {
    const {setFontSize} = useCommands();
    const {getFontSizeForSelection} = useHelpers();
    const {view} = useRemirrorContext({autoUpdate: true});


    const [selectedOption, setSelectedOption] = useState({ value: '31', label: '31' });

    const options = [
        { value: 10, label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
    ];

    const handleChange = (
        newValue: OnChangeValue<FontSizeOption, false>,
        actionMeta: ActionMeta<FontSizeOption>
    ) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    const handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    return (
        <>
            {/*"remirror-input"*/}
            <CreatableSelect
                    isClearable
                    defaultMenuIsOpen
                    className={css.select}
                    // value={selectedOption}
                    filterOption={() => true}
                    components={{ DropdownIndicator:() => null, ClearIndicator:() => null, IndicatorSeparator:() => null }}
                    options={options}
                    onInputChange={handleInputChange.bind(this)}
                    onChange={handleChange.bind(this)}/>

        </>
    );
}

export default FontSizeControl