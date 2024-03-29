// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies, components, hooks, and chakra-specific theming logic
import { Box, BoxProps } from '@primer/react';
import * as React from 'react';

import { useStepsContext } from '../../context';
import { dataAttr } from '../../utils';

export interface ConnectorProps extends BoxProps {
  isCompletedStep: boolean;
  isKeepError?: boolean;
  isLastStep?: boolean;
  hasLabel?: boolean;
  index: number;
  size?: 'sm' | 'md' | 'lg';
}

const Connector = React.memo(
  ({
    index,
    isCompletedStep,
    children,
    isLastStep,
    hasLabel,
    isKeepError,
    size = 'md',
  }: ConnectorProps) => {
    const { isVertical, isLabelVertical, widths, stepSizes } =
      useStepsContext();

    // const stepIconContainerStyles = {
    //   display: 'flex',
    //   borderRadius: '50%',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   bg: 'bg.neutral.muted',
    //   borderColor: 'border.muted',
    //   transitionProperty: 'background, border-color',
    //   transitionDuration: 'normal',
    //   _activeStep: {
    //     bg: 'bg.neutral.muted',
    //     borderColor: 'fg.default',
    //     _invalid: {
    //       bg: 'danger.subtle',
    //       borderColor: 'danger.emphasis',
    //     },
    //   },
    //   _highlighted: {
    //     bg: 'bg.neutral.muted',
    //     borderColor: 'border.default',
    //   },
    //   '&[data-clickable]:hover': {
    //     borderColor: 'border.default',
    //   },
    // };

    const stepIconContainerSizes = {
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

    const getMargin = () => {
      if (isVertical) return `calc(${stepIconContainerSizes[size].width} / 2)`;
      if (!hasLabel) return 2;
    };

    const styles = React.useMemo(() => {
      const base = {
        marginBottom: getMargin(),
        marginTop: isVertical ? 2 : isLabelVertical ? `16px` : 0,
        paddingBottom: isVertical ? 4 : 0,
        marginRight: isVertical || isLabelVertical ? 0 : 2,
        height: isVertical ? 'auto' : '2px',
        alignSelf: isVertical ? 'stretch' : 'auto',
        borderTopWidth: isLastStep || isVertical ? 0 : '2px',
        borderInlineStartWidth: isLastStep || !isVertical ? 0 : '2px',
        minHeight: isLastStep || !isVertical ? 'auto' : '1.5rem',
        borderLeftWidth: isLastStep || !isVertical ? 0 : '2px',
        borderLeftStyle: isVertical ? 'solid' : 'revert',
        marginLeft: isVertical ? '18px' : 'revert',
      };

      if (!isVertical) {
        return {
          ...base,
          borderTopStyle: 'solid',
        };
      }
      if (isLabelVertical) {
        return {
          ...base,
          position: 'absolute',
          top: `calc(${stepIconContainerSizes[size].height} / 2  - ${base.height} / 2)`,
          left: `calc(((${widths?.[index]}px + ${stepIconContainerSizes[size].width}) / 2) + 8px)`,
          // use index of next step to determine spacing
          right: `calc((${widths?.[index + 1]}px - ${
            stepIconContainerSizes[size].width
          }) / -2 + 8px)`,
        };
      }
      return base;
    }, [
      widths,
      isLabelVertical,
      isVertical,
      stepIconContainerSizes[size].height,
      stepIconContainerSizes[size].width,
    ]);

    return (
      <Box
        sx={{
          borderColor:
            isCompletedStep && !isKeepError
              ? 'success.fg'
              : isCompletedStep && isKeepError
              ? 'danger.emphasis'
              : 'border.subtle',
          flex: 1,
          display: 'flex',
          transitionProperty: 'border-color',
          transitionDuration: 'normal',
          ...styles,
        }}
        data-highlighted={dataAttr(isCompletedStep)}
      >
        {isVertical && children}
      </Box>
    );
  }
);

export default Connector;
Connector.displayName = 'Connector';
