import React, { ComponentProps } from 'react';
import { Meta } from '@storybook/react';
import {
  Box,
  BoxProps,
  Button as PrimerButton,
  Text as PrimerText,
  Heading as PrimerHeading,
} from '@primer/react';

import { useBoolean } from '../src/hooks';

import { Collapse } from '../src/components';
type CollapseProps = ComponentProps<typeof Collapse>;

export default {
  title: 'Collapse',
} as Meta;

const CollapseExample = (props: CollapseProps) => {
  const [open, { toggle }] = useBoolean();

  return (
    <>
      <button onClick={toggle}>Toggle Collapse</button>
      <Collapse in={open} {...props}>
        <div
          style={{
            background: 'red',
            padding: 30,
            marginTop: 8,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </Collapse>
    </>
  );
};

export const Basic = () => <CollapseExample />;

export const WithStartingHeight = () => <CollapseExample startingHeight={40} />;

export const WithUnmount = () => <CollapseExample unmountOnExit />;

export const WithoutOpacityTransition = () => (
  <CollapseExample animateOpacity={false} />
);

export const WithInitialIn = () => (
  <Collapse>
    <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  </Collapse>
);
