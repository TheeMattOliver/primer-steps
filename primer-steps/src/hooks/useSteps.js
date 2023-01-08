import * as React from 'react';
export function useSteps({ initialStep }) {
    const [activeStep, setActiveStep] = React.useState(initialStep);
    const nextStep = () => {
        setActiveStep(prev => prev + 1);
    };
    const prevStep = () => {
        setActiveStep(prev => prev - 1);
    };
    const reset = () => {
        setActiveStep(initialStep);
    };
    const setStep = (step) => {
        setActiveStep(step);
    };
    return { nextStep, prevStep, reset, setStep, activeStep };
}
