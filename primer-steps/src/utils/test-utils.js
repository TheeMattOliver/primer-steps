import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from '@primer/react';
import { render as rtlRender, } from '@testing-library/react';
// UI-less passthrough fallback to prevent using conditional logic in render
function ChildrenPassthrough({ children }) {
    return children;
}
/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const render = (ui, { wrapper: Wrapper = ChildrenPassthrough, ...options } = {}) => {
    return rtlRender(_jsx(ThemeProvider, { children: _jsx(Wrapper, { children: ui }) }), options);
};
export { rtlRender };
