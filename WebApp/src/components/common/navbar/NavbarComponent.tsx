import { TabList, TabValue, Tab, SelectTabEvent, SelectTabData, } from "@fluentui/react-components";
import { OverflowItem } from "@fluentui/react-components/unstable";
import { Desktop16Regular, Earth16Regular, DocumentSearch16Regular } from "@fluentui/react-icons";
import React, { useState } from "react";
import NeighbourhoodComponent from "./tabs/NeighbourhoodComponent";
import { loginRequest } from "../../../AuthConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import SidePanelComponent from "../ElementsUI/SidePanelComponent";

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

const NavbarComponent = () => {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('neighbourhood');
  const { instance, accounts, inProgress } = useMsal();
  var accessToken: String;
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
    RequestAccessToken();
  };

  async function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    await instance.acquireTokenSilent(request).then((response) => {
      accessToken = response.accessToken;
      console.log(accessToken);
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        accessToken = response.accessToken;
        console.log(response);
      });
    });
    return accessToken;
  }

  return (
    <div>
      <div className="flex justify-between cardHeader grid-cols-12">
        <div className="grid col-span-2"></div>
        <div className="grid col-span-8">
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
            {/* {tabs.map((tab, index) => {
              <OverflowItem key={index} id={tab.id}>
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
              <Tab id="Neighbourhood" value="neighbourhood" icon={<span><Earth16Regular /></span>}>
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
        <div className="grid col-span-2">
          <SidePanelComponent></SidePanelComponent>
        </div>
      </div>
      <div className="pt-4">
        {selectedValue === 'neighbourhood' && <NeighbourhoodComponent />}
      </div>
    </div>
  );
};

export default NavbarComponent;
