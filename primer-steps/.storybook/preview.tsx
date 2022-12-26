import {
  Box,
  Button as PrimerButton,
  IconButton as PrimerIconButton,
  ButtonGroup as PrimerButtonGroup,
  useColorSchemeVar,
  useTheme,
  ThemeProvider,
  themeGet,
  theme,
  BaseStyles,
} from '@primer/react';
import { SunIcon, MoonIcon } from '@primer/octicons-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { withPerformance } from 'storybook-addon-performance';

import { GlobalStyle } from './story-helpers';

type PrimerStoryContext = Record<string, unknown> & {
  globals: { colorScheme: string };
  parameters: Record<string, unknown>;
};

enum Sizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

type ConfigContextType = {
  size: Sizes;
  setSize: Dispatch<SetStateAction<Sizes>>;
};

const ConfigContext = React.createContext<Partial<ConfigContextType>>({
  size: Sizes.md,
});

export const useConfigContext = () => React.useContext(ConfigContext);

const ToggleBar = () => {
  const { colorMode, colorScheme, setColorMode, setDayScheme, setNightScheme } =
    useTheme();
  const { size, setSize } = useConfigContext();

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mb={4}>
      <PrimerButtonGroup sx={{ mr: 4 }}>
        {Object.values(Sizes).map((val) => {
          return (
            <PrimerButton
              size="small"
              key={val}
              onClick={() => setSize?.(val)}
              sx={{
                backgroundColor:
                  size === val ? `accent.subtle` : `canvas.subtle`,
                ':hover:not([disabled])': {
                  backgroundColor: size === val ? `accent.subtle` : ``,
                },
              }}
            >
              {val}
            </PrimerButton>
          );
        })}
      </PrimerButtonGroup>

      <PrimerIconButton
        aria-label={`Switch to ${colorMode === 'day' ? 'night' : 'day'} mode`}
        icon={colorMode === 'night' ? SunIcon : MoonIcon}
        variant={`invisible`}
        onClick={() => setColorMode(colorMode === 'day' ? 'night' : 'day')}
        sx={{ ml: 2 }}
      />
    </Box>
  );
};

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = React.useState<Sizes>(Sizes.md);
  return (
    <ConfigContext.Provider value={{ size, setSize }}>
      {children}
    </ConfigContext.Provider>
  );
};

const withPrimer = (
  Story: React.FC<React.PropsWithChildren<PrimerStoryContext>>,
  context: PrimerStoryContext
) => {
  const { colorScheme } = context.globals;

  return (
    <ThemeProvider colorMode="day" dayScheme={colorScheme}>
      <ConfigProvider>
        <GlobalStyle />
        <BaseStyles>
          <ToggleBar />
          <div id="html-addon-root">{Story(context)}</div>
        </BaseStyles>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export const decorators = [withPrimer, withPerformance];
