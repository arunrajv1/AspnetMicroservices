import { TabList, TabValue, Tab, SelectTabEvent, SelectTabData, makeStyles } from "@fluentui/react-components";
import { OverflowItem } from "@fluentui/react-components/unstable";
import { Desktop16Regular, Earth16Regular, DocumentSearch16Regular } from "@fluentui/react-icons";
import React, { useState } from "react";
import { iconStylePrimary } from "../../../constant/fluentUIStyles";
import LandingPageComponent from "../LandingPageComponent";
import NeighbourhoodComponent from "./tabs/NeighbourhoodComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const tabs = [{
  id: 'desktop',
  name: 'DESKTOP',
  icon: <Desktop16Regular />
}, {
  id: 'neighbourhood',
  name: 'NEIGHBOURHOOD',
  icon: <Earth16Regular />
}, {
  id: 'findcase',
  name: 'FIND CASE',
  icon: <DocumentSearch16Regular />
}];

const iconStyle = makeStyles(iconStylePrimary)

const NavbarComponent = () => {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('neighbourhood');
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div>
      <div className="flex justify-center cardHeader">

        <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
          {/* {tabs.map(tab => {
            <OverflowItem key={tab.id} id={tab.id}>
              <Tab id={tab.id} value={tab.id} icon={<span>{tab.icon}</span>}>
                {tab.name}
              </Tab>
            </OverflowItem>;
          })} */}
          <OverflowItem id="desktop">
            <Tab id="Desktop" value="desktop" icon={<span><Desktop16Regular /></span>}>
              DESKTOP
            </Tab>
          </OverflowItem>
          <OverflowItem id="neighbourhood">
            <Tab id="Neighbourhood" value="neighbourhood" icon={<span><Earth16Regular/></span>}>
              NEIGHBOURHOOD
            </Tab>
          </OverflowItem>
          <OverflowItem id="findcase">
            <Tab id="FindCase" value="findcase" icon={<span><DocumentSearch16Regular /></span>}>
              FIND CASE
            </Tab>
          </OverflowItem>
        </TabList>
      </div>
      <div className="pt-4">
        {selectedValue === 'neighbourhood' && <NeighbourhoodComponent />}
      </div>
    </div>
  );
};

export default NavbarComponent;
