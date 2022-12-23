<h1 style="font-weight: bold;">
  primer-steps
</h1>

<span>Steps component designed to work seamlessly with <a href="https://primer.style/" target="_blank">Github Primer</a>.</span>

<span>Heavily inspired by Jean Verster's wonderful <a href="https://jeanverster.github.io/primer-steps-site/" target="_blank">Chakra UI Steps</a>, but with all Chakra dependencies and Chakra-dependent logic removed.</span>

Created with permission.
<br />
<br />

[![MIT License](https://badgen.net/github/license/jeanverster/primer-steps "MIT License")](LICENSE.md)
[![npm - primer-steps](https://img.shields.io/npm/v/primer-steps "primer-steps npm")](https://www.npmjs.com/package/primer-steps)
[![bundle size - primer-steps](https://badgen.net/bundlephobia/min/primer-steps)](https://bundlephobia.com/result?p=primer-steps)
[![bundle size - primer-steps](https://badgen.net/bundlephobia/minzip/primer-steps)](https://bundlephobia.com/result?p=primer-steps)
[![Total Downloads - primer-steps](https://badgen.net/npm/dt/primer-steps?color=blue "primer-steps npm downloads")](https://www.npmjs.com/package/primer-steps)

![screenshot](https://i.imgur.com/B9zbJEa.gif)

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

> NOTE: This v1.4.0 of this component requires @primer/react >= v1.6.7 to work correctly. You can follow the installation instructions <a href="https://primer.com/docs/getting-started" target="_blank">here</a>. If you aren't able to update your chakra version you can still use v1.3.0

In order to get started you will need to extend the default Chakra theme with the provided `StepsStyleConfig` object, like so:

```jsx
import { ChakraProvider, extendTheme } from "@primer/react";
import { StepsStyleConfig as Steps } from "primer-steps";

const theme = extendTheme({
  components: {
    Steps,
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <YourApp />
    </ChakraProvider>
  );
};
```

Once that's done you should be good to go!

### Basic Example

```jsx
import { Step, Steps, useSteps } from "primer-steps";

const content = (
  <Flex py={4}>
    <LoremIpsum p={1} />
  </Flex>
);

const steps = [
  { label: "Step 1", content },
  { label: "Step 2", content },
  { label: "Step 3", content },
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
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
```

### Custom Styles

If you would like to customize the appearance of the Steps component you can do so using the multi part component styling approach as described <a href="https://primer.com/docs/styled-system/component-style#styling-multipart-components" target="_blank">here</a>. The parts available for styling are:

```js
connector;
description;
icon;
iconLabel;
label;
labelContainer;
step;
stepContainer;
stepIconContainer;
steps;
```

The default styles for each part can be found <a href="https://github.com/jeanverster/primer-steps/blob/main/primer-steps/src/theme/index.ts" target="_blank">here</a>. Below is an example of how you might change the stroke width of the icons:

```js
import { StepsStyleConfig } from "primer-steps";

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      icon: {
        ...StepsStyleConfig.baseStyle(props).icon,
        // your custom styles here
        strokeWidth: "1px",
      },
    };
  },
};

const theme = extendTheme({
  components: {
    Steps: CustomSteps,
  },
});
```

## Props

> Note: Both the `Step` and `Steps` component extend the Chakra UI `Box` component so they accept all the default styling props.

### `Steps`

| Prop                   | Type                 | Required | Description                                                                | Default    |
| ---------------------- | -------------------- | -------- | -------------------------------------------------------------------------- | ---------- |
| **`activeStep`**       | number               | yes      | Currently active step                                                      | 0          |
| **`colorScheme`**      | string               | no       | Sets the color accent of the Steps component show                          | green      |
| **`orientation`**      | string               | no       | Sets the orientation of the Steps component                                | horizontal |
| **`responsive`**       | boolean              | no       | Sets whether the component auto switches to vertical orientation on mobile | true       |
| **`checkIcon`**        | React.ComponentType  | no       | Allows you to provide a custom check icon                                  | undefined  |
| **`onClickStep`**      | () => void           | no       | If defined, allows you to click on the step icons                          | undefined  |
| **`labelOrientation`** | string               | no       | Switch between horizontal and vertical label orientation                   | undefined  |
| **`state`**            | 'loading' \| 'error' | no       | Let's you set the state to error or loading                                | undefined  |

### `Step`

| Prop                  | Type                 | Required | Description                                                                                       | Default   |
| --------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------- | --------- |
| **`label`**           | string               | no       | Sets the title of the step                                                                        | ''        |
| **`description`**     | string               | no       | Provides extra info about the step                                                                | ''        |
| **`icon`**            | React.ComponentType  | no       | Custom icon to overwrite the default numerical indicator of the step                              | undefined |
| **`isCompletedStep`** | boolean              | no       | Individually control each step state, defaults to active step                                     | undefined |
| **`isKeepError`**     | boolean              | no       | Individually control if each step should keep showing the error state                             | undefined |
| **`checkIcon`**       | React.ComponentType  | no       | Allows you to provide a custom check icon that will override the one provided to Steps            | undefined |
| **`state`**           | 'loading' \| 'error' | no       | Let's you set the state in a specific Step, if defined it will override the one provided to Steps | undefined |
