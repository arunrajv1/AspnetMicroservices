import React from 'react';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { Navigation24Regular, Power24Regular } from '@fluentui/react-icons';
import { Dropdown, IIconProps, Tooltip } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { loginRequest } from "../../../AuthConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { languageOptions } from '../../../constant/optionsArray';

const languageArray: any = languageOptions;

const SidePanelComponent = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const { instance, accounts, inProgress } = useMsal();
    var accessToken: String;

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

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        })
    }

    const handleLanguageChange = () => {

    }

    return (
        <div>
            <Button icon={<Navigation24Regular />} onClick={openPanel} />
            <Panel
                isLightDismiss
                onDismiss={dismissPanel}
                isOpen={isOpen}
                hasCloseButton={true}
                headerText="Menu"
            >
                <Dropdown
                    id="multiLanguage"
                    label="Language"
                    options={languageArray}
                    defaultSelectedKey={"EN"}
                    selectedKey={languageArray.key}
                    onChange={handleLanguageChange}
                    style={{marginBottom: "10px"}}
                >
                </Dropdown>
                <Button icon={<Power24Regular />} id="btnLogout" type="button" onClick={handleLogout} >Logout </Button>
            </Panel>
        </div>
    )
}

export default SidePanelComponent