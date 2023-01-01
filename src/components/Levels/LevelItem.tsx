import React from "react";
import {Typography} from "antd";
import {LevelType} from "../../redux/levels-reducer";

type LevelItemType = {
    level: LevelType
}
const {Title} = Typography;
const {Text} = Typography;


const LevelItem: React.FC<LevelItemType> = ({level}) => {
    return (
        <div>
            <Title level={5}>{level.name}</Title>
            <Text>Order: {level.order}</Text>
        </div>
    );
}


export default LevelItem;