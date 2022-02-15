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

    const options = [
        { value: '8', label:'8' },
        { value: '9', label:'9' },
        { value: '10', label:'10' },
        { value: '11', label:'11' },
        { value: '12', label:'12' },
        { value: '14', label:'14' },
        { value: '18', label:'18' },
        { value: '24', label:'24' },
        { value: '30', label:'30' },
        { value: '36', label:'36' },
        { value: '48', label:'48' },
        { value: '60', label:'60' },
        { value: '72', label:'72' },
        { value: '96', label:'96' }
    ];

    const handleFontSizeSelectChange = (
        newValue: OnChangeValue<FontSizeOption, false>,
        actionMeta: ActionMeta<FontSizeOption>
    ) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    return (
        <>
            <Select className={css.select}
                    isSearchable={false}
                    options={options}
                    defaultValue={options[4]}
                    maxMenuHeight={750}
                    components={{ DropdownIndicator:() => null, ClearIndicator:() => null, IndicatorSeparator:() => null }}
                    onChange={handleFontSizeSelectChange}/>
        </>
    );
}

export default FontSizeControl