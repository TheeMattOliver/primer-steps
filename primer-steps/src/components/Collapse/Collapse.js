import { jsx as _jsx } from "react/jsx-runtime";
// chakra-ui, MIT https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/transition/src/collapse.tsx
import React from 'react';
import classnames from 'classnames';
import { AnimatePresence, motion, } from 'framer-motion';
import { TransitionEasings, withDelay, mergeWith, } from './collapse-utils';
const isNumeric = (value) => value != null && parseInt(value.toString(), 10) > 0;
const defaultTransitions = {
    exit: {
        height: { duration: 0.2, ease: TransitionEasings.ease },
        opacity: { duration: 0.3, ease: TransitionEasings.ease },
    },
    enter: {
        height: { duration: 0.3, ease: TransitionEasings.ease },
        opacity: { duration: 0.4, ease: TransitionEasings.ease },
    },
};
const variants = {
    exit: ({ animateOpacity, startingHeight, transition, transitionEnd, delay, }) => ({
        ...(animateOpacity && { opacity: isNumeric(startingHeight) ? 1 : 0 }),
        overflow: 'hidden',
        height: startingHeight,
        transitionEnd: transitionEnd?.exit,
        transition: transition?.exit ?? withDelay.exit(defaultTransitions.exit, delay),
    }),
    enter: ({ animateOpacity, endingHeight, transition, transitionEnd, delay, }) => ({
        ...(animateOpacity && { opacity: 1 }),
        height: endingHeight,
        transitionEnd: transitionEnd?.enter,
        transition: transition?.enter ?? withDelay.enter(defaultTransitions.enter, delay),
    }),
};
/**
 *
 * The Collapse component is used to create regions of content that can expand/collapse with a simple animation.
 *
 * It helps to hide content that's not immediately relevant to the user.
 *
 */
const Collapse = React.forwardRef((props, ref) => {
    const { in: isOpen, unmountOnExit, animateOpacity = true, startingHeight = 0, endingHeight = 'auto', style, className, transition, transitionEnd, ...rest } = props;
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setMounted(true);
        });
        return () => clearTimeout(timeout);
    }, []);
    /**
     * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
     *
     * If you specify a starting height, the collapsed element needs to be mounted
     * for the height to take effect.
     */
    if (startingHeight > 0 && unmountOnExit) {
        console.warn(`startingHeight and unmountOnExit are mutually exclusive. You can't use them together`);
    }
    const hasStartingHeight = parseFloat(startingHeight.toString()) > 0;
    const custom = {
        startingHeight,
        endingHeight,
        animateOpacity,
        transition: !mounted ? { enter: { duration: 0 } } : transition,
        transitionEnd: mergeWith(transitionEnd, {
            enter: { overflow: 'initial' },
            exit: unmountOnExit
                ? undefined
                : {
                    display: hasStartingHeight ? 'block' : 'none',
                },
        }),
    };
    const show = unmountOnExit ? isOpen : true;
    const animate = isOpen || unmountOnExit ? 'enter' : 'exit';
    return (_jsx(AnimatePresence, { initial: false, custom: custom, children: show && (_jsx(motion.div, { ref: ref, ...rest, className: classnames('primer-collapse', className), style: {
                overflow: 'hidden',
                display: 'block',
                ...style,
            }, custom: custom, variants: variants, initial: unmountOnExit ? 'exit' : false, animate: animate, exit: "exit" })) }));
});
Collapse.displayName = 'Collapse';
export default Collapse;
