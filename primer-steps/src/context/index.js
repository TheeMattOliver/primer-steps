import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const StepsContext = React.createContext({
    activeStep: 0,
});
export const useStepsContext = () => React.useContext(StepsContext);
export const StepsProvider = ({ value, children, }) => {
    const [widths, setWidths] = React.useState([]);
    const [stepSizes, setStepSizes] = React.useState([
        'sm',
        'md',
        'lg',
    ]);
    const isError = value.state === 'error';
    const isLoading = value.state === 'loading';
    const isVertical = value.orientation === 'vertical';
    const isLabelVertical = value.orientation !== 'vertical' && value.labelOrientation === 'vertical';
    return (_jsx(StepsContext.Provider, { value: {
            ...value,
            widths,
            setWidths,
            stepSizes,
            setStepSizes,
            isError,
            isLoading,
            isVertical,
            isLabelVertical,
        }, children: children }));
};
