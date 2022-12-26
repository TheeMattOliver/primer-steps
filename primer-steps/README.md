<h1 style="font-weight: bold;">
  primer-steps
</h1>

<span>Steps component designed to work seamlessly with Github <a href="https://primer.style/" target="_blank">Primer React</a>.</span>

<span>Inspired by Jean Verster's <a href="https://jeanverster.github.io/chakra-ui-steps-site/" target="_blank">Chakra UI Steps</a>. All Chakra dependencies, Chakra components, and Chakra-dependent logic removed.</span>
<br />
<br />

<!-- [![MIT License](https://badgen.net/github/license/theemattoliver/primer-steps/primer-steps 'MIT License')](LICENSE.md)
[![npm - primer-steps](https://img.shields.io/npm/v/primer-steps 'primer-steps npm')](https://www.npmjs.com/package/primer-steps)
[![bundle size - primer-steps](https://badgen.net/bundlephobia/min/primer-steps)](https://bundlephobia.com/result?p=primer-steps)
[![bundle size - primer-steps](https://badgen.net/bundlephobia/minzip/primer-steps)](https://bundlephobia.com/result?p=primer-steps)
[![Total Downloads - primer-steps](https://badgen.net/npm/dt/primer-steps?color=blue 'primer-steps npm downloads')](https://www.npmjs.com/package/primer-steps) -->

<p align="center">
  <img src="https://media.giphy.com/media/ud039lZ0ITbpenJxXo/giphy.gif" alt="animated gif of steps component" />
</p>

## Features

- Multiple orientations
- Easily render step content
- Custom icons
- Size variants

## Installation

Yarn:

```bash
yarn add primer-steps
```

NPM:

```bash
npm i primer-steps
```

## Usage

In order to get started you will need to use the Primer React `ThemeProvider` component, like so:

```jsx
import { ThemeProvider } from '@primer/react';

export const App = () => {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
};
```

Then you can start using Primer Steps.

### Basic Example

```jsx
import { Step, Steps, useSteps } from 'primer-steps';
import { Box } from '@primer/react';
const content = (
  <Box py={4}>
    <LoremIpsum p={1} />
  </Box>
);

const steps = [
  { label: 'Step 1', content },
  { label: 'Step 2', content },
  { label: 'Step 3', content },
];

export const StepsExample = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" width="100%">
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
```

## Props

> Note: Both the `Step` and `Steps` component extend the Primer `Box` component so they accept all the default styling props.

### `Steps`

| Prop                   | Type                | Required | Description                                                                | Default    |
| ---------------------- | ------------------- | -------- | -------------------------------------------------------------------------- | ---------- |
| **`activeStep`**       | number              | yes      | Currently active step                                                      | 0          |
| **`colorScheme`**      | string              | no       | Sets the color accent of the Steps component show                          | green      |
| **`orientation`**      | string              | no       | Sets the orientation of the Steps component                                | horizontal |
| **`responsive`**       | boolean             | no       | Sets whether the component auto switches to vertical orientation on mobile | true       |
| **`checkIcon`**        | React.ComponentType | no       | Allows you to provide a custom check icon                                  | undefined  |
| **`onClickStep`**      | () => void          | no       | If defined, allows you to click on the step icons                          | undefined  |
| **`labelOrientation`** | string              | no       | Switch between horizontal and vertical label orientation                   | undefined  |

### `Step`

| Prop                  | Type                | Required | Description                                                          | Default   |
| --------------------- | ------------------- | -------- | -------------------------------------------------------------------- | --------- |
| **`label`**           | string              | no       | Sets the title of the step                                           | ''        |
| **`description`**     | string              | no       | Provides extra info about the step                                   | ''        |
| **`icon`**            | React.ComponentType | no       | Custom icon to overwrite the default numerical indicator of the step | undefined |
| **`isCompletedStep`** | boolean             | no       | Individually control each step state, defaults to active step        | undefined |
