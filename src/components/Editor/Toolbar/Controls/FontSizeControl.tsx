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
    value: number
    label: string
}

const FontSizeControl = () => {
    const {setFontSize} = useCommands();
    const {getFontSizeForSelection} = useHelpers();
    const {view} = useRemirrorContext({autoUpdate: true});

    const options = [
        { value: 10, label:'8' },
        { value: 12, label:'9' },
        { value: 13, label:'10' },
        { value: 15, label:'11' },
        { value: 16, label:'12' },
        { value: 18, label:'14' },
        { value: 24, label:'18' },
        { value: 32, label:'24' },
        { value: 40, label:'30' },
        { value: 48, label:'36' },
        { value: 64, label:'48' },
        { value: 80, label:'60' },
        { value: 96, label:'72' },
        { value: 128, label:'96' }
    ];

    const handleFontSizeSelectChange = (
        newFontSizeOption: OnChangeValue<FontSizeOption, false>,
        actionMeta: ActionMeta<FontSizeOption>
    ) => {
        console.group('Value Changed');
        console.log(newFontSizeOption);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

        setFontSize(newFontSizeOption.value)
    };

    return (
        <>
            <Select className={`remirror-role remirror-tabbable ${css.select}`  }
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