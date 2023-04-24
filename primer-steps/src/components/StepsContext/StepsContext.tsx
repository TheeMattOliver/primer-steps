import React, { Dispatch, SetStateAction, useState } from 'react';
import { StepsProps } from '..';

export type StepSize = 'sm' | 'md' | 'lg';

interface StepsContextValue extends StepsProps {
  stepContainerWidths?: number[];
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  isLabelVertical?: boolean;
  widths?: number[];
  setWidths?: React.Dispatch<React.SetStateAction<number[]>>;
  stepCount?: number;
  stepSizes?: StepSize[];
  setStepSizes?: Dispatch<SetStateAction<StepSize[]>>;
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
});

export const useStepsContext = () => React.useContext(StepsContext);

export const StepsProvider: React.FC<{ value: StepsContextValue }> = ({
  value,
  children,
}) => {
  const [widths, setWidths] = React.useState<number[]>([]);
  const [stepSizes, setStepSizes] = React.useState<StepSize[]>([
    'sm',
    'md',
    'lg',
  ]);

  const isError = value.state === 'error';
  const isLoading = value.state === 'loading';

  const isVertical = value.orientation === 'vertical';
  const isLabelVertical =
    value.orientation !== 'vertical' && value.labelOrientation === 'vertical';

  return (
    <StepsContext.Provider
      value={{
        ...value,
        widths,
        setWidths,
        stepSizes,
        setStepSizes,
        isError,
        isLoading,
        isVertical,
        isLabelVertical,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
