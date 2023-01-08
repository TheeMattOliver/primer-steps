import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button as PrimerButton, IconButton as PrimerIconButton, ButtonGroup as PrimerButtonGroup, useTheme, ThemeProvider, BaseStyles, } from '@primer/react';
import { SunIcon, MoonIcon } from '@primer/octicons-react';
import React from 'react';
import { withPerformance } from 'storybook-addon-performance';
import { GlobalStyle } from './story-helpers';
var Sizes;
(function (Sizes) {
    Sizes["sm"] = "sm";
    Sizes["md"] = "md";
    Sizes["lg"] = "lg";
})(Sizes || (Sizes = {}));
const ConfigContext = React.createContext({
    size: Sizes.md,
});
export const useConfigContext = () => React.useContext(ConfigContext);
const ToggleBar = () => {
    const { colorMode, colorScheme, setColorMode, setDayScheme, setNightScheme } = useTheme();
    const { size, setSize } = useConfigContext();
    return (_jsxs(Box, { display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 4, children: [_jsx(PrimerButtonGroup, { sx: { mr: 4 }, children: Object.values(Sizes).map((val) => {
                    return (_jsx(PrimerButton, { size: "small", onClick: () => setSize?.(val), sx: {
                            backgroundColor: size === val ? `accent.subtle` : `canvas.subtle`,
                            ':hover:not([disabled])': {
                                backgroundColor: size === val ? `accent.subtle` : ``,
                            },
                        }, children: val }, val));
                }) }), _jsx(PrimerIconButton, { "aria-label": `Switch to ${colorMode === 'day' ? 'night' : 'day'} mode`, icon: colorMode === 'night' ? SunIcon : MoonIcon, variant: `invisible`, onClick: () => setColorMode(colorMode === 'day' ? 'night' : 'day'), sx: { ml: 2 } })] }));
};
const ConfigProvider = ({ children }) => {
    const [size, setSize] = React.useState(Sizes.md);
    return (_jsx(ConfigContext.Provider, { value: { size, setSize }, children: children }));
};
const withPrimer = (Story, context) => {
    const { colorScheme } = context.globals;
    return (_jsx(ThemeProvider, { colorMode: "day", dayScheme: colorScheme, children: _jsxs(ConfigProvider, { children: [_jsx(GlobalStyle, {}), _jsxs(BaseStyles, { children: [_jsx(ToggleBar, {}), _jsx("div", { id: "html-addon-root", children: Story(context) })] })] }) }));
};
export const decorators = [withPrimer, withPerformance];
