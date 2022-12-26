// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies and logic
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

import { Box, Spinner } from '@primer/react';
import { XIcon, CheckIcon } from '@primer/octicons-react';

interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: React.ComponentType<any>;
  index?: number;
  checkIcon?: React.ComponentType<any>;
}

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

const StepIcon = forwardRef(({ ...props }: StepIconProps, ref) => {
  const labelStyles = {
    fontWeight: 'medium',
    textAlign: 'center',
    fontSize: 'sm',
    color: 'fg.onEmphasis',
  };

  const {
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    isKeepError,
    icon: CustomIcon,
    index,
    checkIcon: CustomCheckIcon,
  } = props;

  const Icon = React.useMemo(
    () => (CustomIcon ? CustomIcon : null),
    [CustomIcon]
  );

  const Check = React.useMemo(
    () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
    [CustomCheckIcon]
  );

  return React.useMemo(() => {
    if (isCompletedStep) {
      if (isError && isKeepError) {
        return (
          <Box sx={{ backgroundColor: 'danger.emphasis' }}>
            <AnimatedCloseIcon key="icon" {...animationConfig} />
          </Box>
        );
      }
      return (
        <MotionBox
          key="check-icon"
          sx={{ color: 'fg.onEmphasis' }}
          {...animationConfig}
        >
          <Check fill="currentColor" />
        </MotionBox>
      );
    }
    if (isCurrentStep) {
      if (isError) return <AnimatedCloseIcon key="icon" {...animationConfig} />;
      if (isLoading) return <Spinner size={`small`} />;
    }
    if (Icon)
      return (
        <MotionBox
          key="step-icon"
          sx={{
            backgroundColor: isCompletedStep
              ? 'success.emphasis'
              : isError
              ? 'danger.emphasis'
              : '',
            color: isCompletedStep ? 'success.fg' : 'fg.default',
          }}
          {...animationConfig}
        >
          <Icon />
        </MotionBox>
      );
    return (
      <AnimatedSpan ref={ref} key="label" sx={labelStyles} {...animationConfig}>
        {(index || 0) + 1}
      </AnimatedSpan>
    );
  }, [isCompletedStep, isCurrentStep, isError, isLoading, Icon]);
});
export default StepIcon;
