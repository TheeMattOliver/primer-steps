// this project was heavily inspired by https://github.com/jeanverster/chakra-ui-steps, MIT https://github.com/jeanverster/chakra-ui-steps/blob/main/chakra-ui-steps/LICENSE
// it removes all chakra-ui dependencies and logic
import { Box } from '@primer/react';
import React from 'react';
// import { useConfigContext } from '../../../.storybook/preview';
import { useStepsContext } from '../../context/index';
import { useConfigContext } from '../../components';

export interface StepLabelProps {
  isCurrentStep?: boolean;
  opacity: number;
  label?: string | React.ReactNode;
  description?: string;
}

const StepLabel = ({
  isCurrentStep,
  opacity,
  label,
  description,
}: StepLabelProps) => {
  const { isLabelVertical } = useStepsContext();

  const shouldRender = !!label || !!description;

  const { size } = useConfigContext();

  return shouldRender ? (
    <Box
      as="div"
      aria-current={isCurrentStep ? 'step' : undefined}
      sx={{
        textAlign: isLabelVertical ? 'center' : 'left',
        alignItems: isLabelVertical ? 'center' : 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {!!label && (
        <Box
          as="span"
          sx={{
            mx: isLabelVertical ? 0 : 2,
            mt: isLabelVertical ? 1 : 0,
            opacity,
            color: 'fg.default',
            fontWeight: 'medium',
            textAlign: 'center',
            fontSize:
              size === 'sm' ? 1 : size === 'md' ? 2 : size === 'lg' ? 3 : 2,
          }}
        >
          {label}
        </Box>
      )}
      {!!description && (
        <Box
          as="span"
          sx={{
            mx: isLabelVertical ? 0 : 2,
            mt: isLabelVertical ? 2 : 0,
            opacity,
            color: 'fg.muted',
            marginTop: '-2px',
            textAlign: 'center',
            fontSize:
              size === 'sm' ? 0 : size === 'md' ? 1 : size === 'lg' ? 2 : 2,
          }}
        >
          {description}
        </Box>
      )}
    </Box>
  ) : null;
};

export default StepLabel;
StepLabel.displayName = 'StepLabel';
