import React from 'react';

import {
  Box,
  BoxProps,
  Button as PrimerButton,
  Text as PrimerText,
  Heading as PrimerHeading,
} from '@primer/react';

import { useStepsContext } from '../src/context/';

import { Meta, Story } from '@storybook/react';
import { motion, MotionProps } from 'framer-motion';

import { CheckCircle, Clipboard, DollarSign, User } from 'feather-icons-react';

import { useConfigContext } from '../.storybook/preview';
import { Step, Steps, useSteps } from '../src';

export default {
  title: 'Steps',
} as Meta;

type ResetPromptProps = Omit<BoxProps, keyof MotionProps> & {
  onReset: () => void;
};

const MotionBox = motion<BoxProps>(Box);

const ResetPrompt = ({ onReset, ...rest }: ResetPromptProps): JSX.Element => {
  return (
    <MotionBox
      px={4}
      py={4}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <PrimerHeading sx={{ fontSize: 3 }}>All steps completed!</PrimerHeading>
      <PrimerButton sx={{ mt: 6 }} size={`small`} onClick={onReset}>
        Reset
      </PrimerButton>
    </MotionBox>
  );
};

type StepButtonsProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
};

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => {
  return (
    <Box display="flex" width="100%" justifyContent="flex-end">
      <PrimerButton
        mr={4}
        variant="invisible"
        size="small"
        onClick={prevStep}
        disabled={prevDisabled}
      >
        Prev
      </PrimerButton>

      <PrimerButton isDisabled={nextDisabled} size="small" onClick={nextStep}>
        {isLast ? 'Finish' : 'Next'}
      </PrimerButton>
    </Box>
  );
};

type ContentProps = BoxProps & {
  index: number;
};

const Content = ({ index, ...rest }: ContentProps) => {
  return (
    <Box
      p={6}
      bg={`canvas.subtle`}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: 2,
      }}
      {...rest}
    >
      <PrimerText>Step {index + 1}</PrimerText>
    </Box>
  );
};

const steps = [
  { label: 'Step 1' },
  { label: 'Step 2 Label' },
  { label: 'Step 3' },
];
const descriptionSteps = [
  { label: 'Step 1', description: 'Step 1 Description' },
  { label: 'Step 2 Label', description: 'Step 2 Description' },
  { label: 'Step 3', description: 'Step 3 Description' },
];

//👇 We create a “template” of how args map to rendering
// const Template: Story<any> = (args) => <Button {...args} />

export const Horizontal = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const Vertical = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} orientation="vertical" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const WithDescription = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} activeStep={activeStep}>
        {descriptionSteps.map(({ label, description }, index) => (
          <Step label={label} key={label} description={description}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

type StateValue = 'loading' | 'error' | undefined;

export const WithStates = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [stepState, setStepState] = React.useState<StateValue>('loading');
  const handleLoadingChange = () => {
    setStepState('loading');
  };
  const handleErrorChange = () => {
    setStepState('error');
  };
  const { size } = useStepsContext();

  return (
    <>
      <Box
        as="div"
        mb={8}
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Box
          as="fieldset"
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 1,
            display: 'flex',
            gap: '8px',
          }}
        >
          <legend>State</legend>
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
            }}
          >
            <input
              type="radio"
              id="loading"
              name="loadingState"
              value={stepState}
              onChange={handleLoadingChange}
              defaultChecked
            />
            <label htmlFor="loading">Loading</label>

            <input
              type="radio"
              id="error"
              name="loadingState"
              value={stepState}
              onChange={handleErrorChange}
            />
            <label htmlFor="error">Error</label>
          </Box>
        </Box>
      </Box>
      <Steps size={size} state={stepState} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

const statesSteps: StateValue[] = ['loading', 'error', undefined];

export const WithPerStepState = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { size } = useStepsContext();

  return (
    <>
      <Steps size={size} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label} state={statesSteps[index]}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const WithKeepErrorState = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { size } = useStepsContext();

  return (
    <>
      <Steps size={size} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label} state="error" isKeepError>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

const iconSteps = [
  { label: 'Login', icon: User },
  { label: 'Verification', icon: Clipboard },
  { label: 'Pay', icon: DollarSign },
];

export const CustomStepIcons = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const { size } = useStepsContext();

  return (
    <>
      <Steps size={size} activeStep={activeStep}>
        {iconSteps.map(({ label, icon }, index) => (
          <Step label={label} key={label} icon={icon}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const CustomCheckIcon = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} checkIcon={CheckCircle} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const CustomPerStepCheckIcon = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} checkIcon={CheckCircle} activeStep={activeStep}>
        {iconSteps.map(({ label, icon }, index) => (
          <Step label={label} key={label} checkIcon={icon}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const ClickableSteps: Story = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  console.log('size: ', size);
  return (
    <>
      <Steps
        size={size}
        checkIcon={CheckCircle}
        activeStep={activeStep}
        onClickStep={(step) => setStep(step)}
      >
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const VerticalLabels: Story = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} labelOrientation="vertical" activeStep={activeStep}>
        {descriptionSteps.map(({ label, description }, index) => (
          <Step label={label} key={label} description={description}>
            <Content my={6} index={index} />
          </Step>
        ))}
        <Step label="Step 4">
          <Content my={6} index={3} />
        </Step>
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const Uncollapsed = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const { size } = useStepsContext();
  return (
    <>
      <Steps size={size} orientation="vertical" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label} uncollapsed>
            <Content index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};
