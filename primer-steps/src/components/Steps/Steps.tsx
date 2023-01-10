// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies and logic

import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Box, BoxProps } from '@primer/react';
import { useMediaQuery } from '../../hooks';
import { StepsProvider } from '../../context/index';
import { useConfigContext } from '../../../.storybook/preview';

export interface StepsProps extends BoxProps {
  /**
   * Currently active step
   */
  activeStep: number;
  /**
   * Whether the Steps component is oriented horizontally or verticallly
   */
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: React.ComponentType<any>;
  onClickStep?: (step: number) => void;
  labelOrientation?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
  stepCount?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 *
 * Steps lists are <ol> components that communicate progress and indicate where a user is in a process.
 *
 * Primer Steps is a customisable Stepper component designed to work seamlessly with Github Primer.
 */
const Steps = forwardRef(
  ({ ...props }: StepsProps, ref: React.Ref<HTMLOListElement>) => {
    const {
      className,
      activeStep = 0,
      children,
      orientation: orientationProp,
      state,
      responsive,
      checkIcon,
      onClickStep,
      labelOrientation,
      ...rest
    } = props;

    const childArr = React.Children.toArray(children);
    const [stepCount, setStepCount] = React.useState(childArr.length);

    const { size } = useConfigContext();

    const renderHorizontalContent = () => {
      if (activeStep <= childArr.length) {
        return React.Children.map(childArr[activeStep], (node) => {
          if (!React.isValidElement(node)) return;
          return React.Children.map(
            node.props.children,
            (childNode) => childNode
          );
        });
      }
      return null;
    };

    const clickable = !!onClickStep;
    const [isMobile] = useMediaQuery('(max-width: 43em)');
    const orientation = isMobile && responsive ? 'vertical' : orientationProp;

    return (
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <StepsProvider
          value={{
            activeStep,
            orientation,
            state,
            responsive,
            checkIcon,
            onClickStep,
            labelOrientation,
            clickable,
            stepCount,
            className,
          }}
        >
          <OrderedList
            as="ol"
            // @ts-ignore
            ref={ref}
            className={classnames('primer-steps', className)}
            orientation={orientation}
            stepCount={stepCount}
            {...rest}
          >
            {React.Children.map(children, (child, i) => {
              const isCompletedStep =
                (React.isValidElement(child) && child.props.isCompletedStep) ??
                i < activeStep;
              const isLastStep = i === stepCount - 1;
              const isCurrentStep = i === activeStep;

              const stepProps = {
                index: i,
                isCompletedStep,
                isCurrentStep,
                isLastStep,
                size,
              };

              if (React.isValidElement(child)) {
                return React.cloneElement(child, stepProps);
              }

              return null;
            })}
          </OrderedList>
          {orientation === 'horizontal' && renderHorizontalContent()}
        </StepsProvider>
      </Box>
    );
  }
);

const OrderedList = styled(Box)<StepsProps>`
  justify-content: ${(p) => (p.stepCount === 1 ? 'flex-end' : 'space-between')};
  flex-direction: ${(p) => (p.orientation === 'vertical' ? 'column' : 'row')};
  text-align: center;
  width: 100%;
  display: flex;
  flex: 1;
`;

Steps.defaultProps = {
  activeStep: 0,
  orientation: 'horizontal',
  responsive: true,
};
export default Steps;
Steps.displayName = 'Steps';
