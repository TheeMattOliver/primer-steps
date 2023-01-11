import { Button, Box } from "@primer/react";
import { Step, Steps, useSteps } from "@primer-steps/primer-steps";
import { useState } from "react";
import "./App.css";
const content = <Box py={4}>Yo!</Box>;

const steps = [
  { label: "Step 1", content },
  { label: "Step 2", content },
  { label: "Step 3", content },
];

function App() {
  const [count, setCount] = useState(0);
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Box p={4}>
          <Button mx="auto" size="small" onClick={reset}>
            Reset
          </Button>
        </Box>
      ) : (
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="small"
            variant="invisible"
          >
            Prev
          </Button>
          <Button size="small" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </>
  );
}

export default App;
