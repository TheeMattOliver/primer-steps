// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies and logic
import { Box } from '@primer/react';
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
  uncollapsed?: boolean;
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
    uncollapsed = false,
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
    sm: {
      width: '32px',
      height: '32px',
      borderWidth: '2px',
    },
    md: {
      width: '40px',
      height: '40px',
      borderWidth: '2px',
    },
    lg: {
      width: '48px',
      height: '48px',
      borderWidth: '2px',
    },
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
    [
      stepIconContainerStyles[size!].height,
      stepIconContainerStyles[size!].width,
    ]
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
          {/* step container */}
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
                  : isCompletedStep
                  ? 'fg.onEmphasis'
                  : 'revert',
              bg:
                isCompletedStep && !isKeepError
                  ? 'success.emphasis'
                  : isCurrentStep && isError
                  ? 'danger.emphasis'
                  : isCurrentStep && isKeepError
                  ? 'danger.emphasis'
                  : isCurrentStep && isKeepError
                  ? 'danger.emphasis'
                  : isCompletedStep && isKeepError
                  ? 'danger.emphasis'
                  : 'neutral.muted',
              borderColor:
                isCurrentStep && isError
                  ? 'danger.emphasis'
                  : isCurrentStep && isKeepError
                  ? 'danger.emphasis'
                  : isCurrentStep
                  ? 'success.fg'
                  : isCompletedStep && !isKeepError
                  ? 'success.emphasis'
                  : isCompletedStep && !isKeepError
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
          isKeepError={isKeepError || false}
          hasLabel={!!label || !!description}
          isCompletedStep={isCompletedStep || false}
          {...props}
        >
          {!uncollapsed ? (
            <Collapse
              style={{ width: '100%', marginLeft: '16px' }}
              in={isCurrentStep}
            >
              {(isCurrentStep || isCompletedStep) && (
                <>
                  {React.Children.map(children, (child, idx) => {
                    if (!child) {
                      return null;
                    }
                    return (
                      <div key={idx}>
                        {ref
                          ? React.cloneElement(child as JSX.Element, { ref })
                          : child}
                      </div>
                    );
                  })}
                </>
              )}
            </Collapse>
          ) : (
            <Collapse in style={{ width: '100%', marginLeft: '16px' }}>
              {React.Children.map(children, (child, idx) => {
                if (!child) {
                  return null;
                }
                return (
                  <div key={idx}>
                    {ref
                      ? React.cloneElement(child as JSX.Element, { ref })
                      : child}
                  </div>
                );
              })}
            </Collapse>
          )}
        </Connector>
      </Box>
    </>
  );
});
export default Step;
Step.displayName = 'Step';
