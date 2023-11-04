import { Switch } from 'react-native-paper';
import { useState } from 'react';

const ToggleSwitch = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Switch color='#6AB4AC' value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default ToggleSwitch;