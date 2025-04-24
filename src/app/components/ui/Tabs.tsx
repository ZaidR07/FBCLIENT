
import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className, onClick }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);

  return (
    <button
      onClick={() => {
        setActiveTab(value);
        onClick?.();
      }}
      className={className}
      data-state={activeTab === value ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
};