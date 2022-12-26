// import { Collapse } from '@chakra-ui/transition';
//
import { Box, themeGet } from '@primer/react';
import { AnimatePresence } from 'framer-motion';
import React, { forwardRef } from 'react';

import { useStepsContext } from '../../context';
import { dataAttr } from '../../utils';
import { Connector, StepIcon, StepLabel, Collapse } from '..';

export interface StepProps {
  label?: string | React.ReactNode;
  description?: string;
  icon?: React.ComponentType<any>;
  state?: 'loading' | 'error';
  checkIcon?: React.ComponentType<any>;
  isCompletedStep?: boolean;
  isKeepError?: boolean;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

// Private props
interface StepInternalConfig {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
}

interface FullStepProps extends StepProps, StepInternalConfig {}

const Step = forwardRef(({ ...props }: StepProps, ref: React.Ref<any>) => {
  const {
    children,
    description,
    icon,
    state,
    checkIcon,
    index,
    isCompletedStep,
    isCurrentStep,
    isLastStep,
    isKeepError,
    label,
    size,
    ...styleProps
  } = props as FullStepProps;

  const {
    isVertical,
    isError,
    isLoading,
    isLabelVertical,
    checkIcon: defaultCheckIcon,
    onClickStep,
    clickable,
    setWidths,
    stepCount,
  } = useStepsContext();

  const stepContainerStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const stepIconContainerStyles = {
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'bg.muted',
    borderColor: 'bg.muted',
    transitionProperty: 'background, border-color',
    transitionDuration: 'normal',
    _activeStep: {
      bg: 'bg.muted',
      borderColor: 'fg.default',
      _invalid: {
        bg: 'danger.emphasis',
        borderColor: 'danger.emphasis',
      },
    },
    _highlighted: {
      bg: 'bg.success',
      borderColor: 'bg.success',
    },
    '&[data-clickable]:hover': {
      borderColor: 'bg.success',
    },
    width:
      size === 'sm'
        ? '32px'
        : size === 'md'
        ? '40px'
        : size === 'lg'
        ? '48px'
        : '32px',
    height:
      size === 'sm'
        ? '32px'
        : size === 'md'
        ? '40px'
        : size === 'lg'
        ? '48px'
        : '32px',
  };

  const hasVisited = isCurrentStep || isCompletedStep;

  const opacity = hasVisited ? 1 : 0.8;

  const handleClick = (index: number) => {
    if (clickable && onClickStep) {
      onClickStep(index);
    }
  };

  const containerRef: React.RefCallback<HTMLDivElement> = React.useCallback(
    (node) => {
      if (node && setWidths) {
        setWidths((prev) => {
          if (prev.length === stepCount) {
            return [node.offsetWidth || 0];
          }
          return [...prev, node.offsetWidth || 0];
        });
      }
    },
    [stepIconContainerStyles.width, stepIconContainerStyles.height]
  );

  return (
    <>
      <Box
        as="li"
        ref={ref}
        onClick={() => handleClick(index)}
        aria-disabled={!hasVisited}
        sx={{
          opacity,
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: isVertical || isLabelVertical ? 'flex-start' : 'center',
          flex: isLastStep && !isVertical ? '0 0 auto' : '1 0 auto',
          justifyContent: isLastStep && !isVertical ? 'flex-end' : 'flex-start',
          '&:hover': {
            cursor: clickable ? 'pointer' : 'default',
          },
          display: 'flex',
          position: 'relative',
        }}
        {...styleProps}
      >
        <Box
          as="div"
          ref={containerRef}
          sx={{
            flexDirection: isLabelVertical ? 'column' : 'row',
            ...stepContainerStyles,
          }}
        >
          <Box
            as="div"
            sx={{
              display: 'flex',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'solid',
              borderWidth: '1px',
              color:
                isCurrentStep && isError
                  ? 'fg.onEmphasis'
                  : isCurrentStep && isKeepError
                  ? 'fg.onEmphasis'
                  : 'revert',
              bg: isCompletedStep
                ? 'success.emphasis'
                : isCurrentStep && isError
                ? 'danger.emphasis'
                : isCurrentStep && isKeepError
                ? 'danger.emphasis'
                : isCurrentStep && isKeepError
                ? 'danger.emphasis'
                : 'neutral.muted',
              borderColor:
                isCurrentStep && isError
                  ? 'danger.emphasis'
                  : isCurrentStep && isKeepError
                  ? 'danger.emphasis'
                  : isCurrentStep
                  ? 'success.fg'
                  : isCompletedStep
                  ? 'success.emphasis'
                  : 'border.muted',
              transitionProperty: 'background, border-color',
              transitionDuration: 'normal',
              _activeStep: {
                bg: 'bg.muted',
                borderColor: 'fg.default',
                _invalid: {
                  bg: 'danger.emphasis',
                  borderColor: 'danger.emphasis',
                },
              },
              _highlighted: {
                bg: 'bg.success',
                borderColor: 'bg.success',
              },
              '&[data-clickable]:hover': {
                borderColor: 'bg.success',
              },
              width:
                size === 'sm'
                  ? '32px'
                  : size === 'md'
                  ? '40px'
                  : size === 'lg'
                  ? '48px'
                  : '32px',
              height:
                size === 'sm'
                  ? '32px'
                  : size === 'md'
                  ? '40px'
                  : size === 'lg'
                  ? '48px'
                  : '32px',
            }}
            aria-current={
              (hasVisited && isKeepError) || isCurrentStep ? 'step' : undefined
            }
            data-invalid={dataAttr(
              ((hasVisited && isKeepError) || isCurrentStep) &&
                (isError || state === 'error')
            )}
            data-highlighted={dataAttr(isCompletedStep)}
            data-clickable={dataAttr(clickable)}
          >
            <AnimatePresence exitBeforeEnter>
              <StepIcon
                {...{
                  index,
                  isError: isError || state === 'error',
                  isLoading: isLoading || state === 'loading',
                  isCurrentStep,
                  isCompletedStep,
                  isKeepError,
                }}
                icon={icon}
                checkIcon={checkIcon ?? defaultCheckIcon}
              />
            </AnimatePresence>
          </Box>
          <StepLabel
            label={label}
            description={description}
            {...{ isCurrentStep, opacity }}
          />
        </Box>
        <Connector
          index={index}
          isLastStep={isLastStep}
          hasLabel={!!label || !!description}
          isCompletedStep={isCompletedStep || false}
        >
          <Collapse style={{ width: '100%' }} in={isCurrentStep}>
            {(isCurrentStep || isCompletedStep) && children}
          </Collapse>
        </Connector>
      </Box>
    </>
  );
});
export default Step;
