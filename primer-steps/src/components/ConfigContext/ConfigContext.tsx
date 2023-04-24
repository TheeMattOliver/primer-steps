import React, { Dispatch, SetStateAction, useState } from 'react';

export enum Sizes {
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

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = React.useState<Sizes>(Sizes.md);
  return (
    <ConfigContext.Provider value={{ size, setSize }}>
      {children}
    </ConfigContext.Provider>
  );
};
