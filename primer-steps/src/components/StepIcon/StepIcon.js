import { jsx as _jsx } from "react/jsx-runtime";
// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies and logic
import { motion } from 'framer-motion';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Box, Spinner } from '@primer/react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
const MotionBox = motion(Box);
const AnimatedCloseIcon = motion(XIcon);
const AnimatedSpan = motion.span;
const animationConfig = {
    transition: {
        duration: 0.25,
    },
    exit: { scale: 0.5, opacity: 0 },
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
};
/**
 * Icon passed into the step. <span>
 */
const StepIcon = forwardRef(({ ...props }, ref) => {
    const internalRef = React.useRef(null);
    // use the ref internally, wire it to forwarded ref
    useImperativeHandle(ref, () => internalRef.current);
    const { isCompletedStep, isCurrentStep, isError, isLoading, isKeepError, icon: CustomIcon, index, checkIcon: CustomCheckIcon, } = props;
    const labelStyles = {
        fontWeight: 'semibold',
        textAlign: 'center',
        fontSize: 1,
        color: isCompletedStep ? 'fg.onEmphasis' : 'fg.default',
    };
    const Icon = React.useMemo(() => (CustomIcon ? CustomIcon : null), [CustomIcon]);
    const Check = React.useMemo(() => (CustomCheckIcon ? CustomCheckIcon : CheckIcon), [CustomCheckIcon]);
    return React.useMemo(() => {
        if (isCompletedStep) {
            if (isError && isKeepError) {
                return (_jsx(Box, { sx: { backgroundColor: 'danger.emphasis' }, children: _jsx(AnimatedCloseIcon, { ...animationConfig }, "icon") }));
            }
            return (_jsx(MotionBox, { sx: { color: 'fg.onEmphasis' }, ...animationConfig, children: _jsx(Check, { fill: "currentColor" }) }, "check-icon"));
        }
        if (isCurrentStep) {
            if (isError)
                return _jsx(AnimatedCloseIcon, { ...animationConfig }, "icon");
            if (isLoading)
                return _jsx(Spinner, { size: `small` });
        }
        if (Icon)
            return (_jsx(MotionBox, { sx: {
                    backgroundColor: isCompletedStep
                        ? 'success.emphasis'
                        : isError
                            ? 'danger.emphasis'
                            : '',
                    color: isCompletedStep ? 'success.fg' : 'fg.default',
                }, ...animationConfig, children: _jsx(Icon, {}) }, "step-icon"));
        return (_jsx(MotionBox, { ref: internalRef, sx: labelStyles, ...animationConfig, children: (index || 0) + 1 }, "label"));
    }, [isCompletedStep, isCurrentStep, isError, isLoading, Icon]);
});
export default StepIcon;
StepIcon.displayName = 'StepIcon';
