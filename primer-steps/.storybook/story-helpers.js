import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, ThemeProvider, theme, themeGet, BaseStyles } from '@primer/react';
import { createGlobalStyle } from 'styled-components';
// set global theme styles for each story
export const GlobalStyle = createGlobalStyle `
  body {
    background-color: ${themeGet('colors.canvas.default')};
    color: ${themeGet('colors.fg.default')};
  }
`;
// only remove padding for multi-theme view grid
const GlobalStyleMultiTheme = createGlobalStyle `
  body {
    padding: 0 !important;
  }
`;
export const withPrimerThemeProvider = (Story, context) => {
    // used for testing ThemeProvider.stories.tsx
    if (context.parameters.disableThemeDecorator)
        return Story(context);
    const { colorScheme } = context.globals;
    if (colorScheme === 'all') {
        return (_jsxs(Box, { sx: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
                height: '100vh',
            }, children: [_jsx(GlobalStyleMultiTheme, {}), Object.keys(theme.colorSchemes).map((scheme) => (_jsx(ThemeProvider, { colorMode: "day", dayScheme: scheme, children: _jsx(BaseStyles, { children: _jsx(Box, { sx: {
                                padding: '1rem',
                                height: '100%',
                                backgroundColor: 'canvas.default',
                                color: 'fg.default',
                            }, children: _jsx("div", { id: `html-addon-root-${scheme}`, children: Story(context) }) }) }) }, scheme)))] }));
    }
    return (_jsxs(ThemeProvider, { colorMode: "day", dayScheme: colorScheme, children: [_jsx(GlobalStyle, {}), _jsx(BaseStyles, { children: _jsx("div", { id: "html-addon-root", children: Story(context) }) })] }));
};
export const toolbarTypes = {
    colorScheme: {
        name: 'Color scheme',
        description: 'Switch color scheme',
        defaultValue: 'light',
        toolbar: {
            icon: 'photo',
            items: [...Object.keys(theme.colorSchemes), 'all'],
            title: 'Color scheme',
        },
    },
};
