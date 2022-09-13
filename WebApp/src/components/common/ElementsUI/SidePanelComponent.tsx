import React, { useEffect } from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { Navigation24Regular, Power24Regular } from '@fluentui/react-icons';
import { Dropdown } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { loginRequest } from "../../../AuthConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { languageOptions } from '../../../constant/optionsArray';
import i18next from 'i18next';
import cookies from 'js-cookie';

const languageArray: any = languageOptions;
const currentLanguageCode = cookies.get('i18next');

const SidePanelComponent = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const { instance, accounts, inProgress } = useMsal();
    // let currentLanguage = languageArray.find((x: any) => x.key == currentLanguageCode);

    // useEffect(() => {
    //     currentLanguage = languageArray.find((x: any) => x.key == currentLanguageCode);
    //     console.log('current language', currentLanguage);
    // }, [cookies.get('i18next')])

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        })
    }

    const handleLanguageChange = (e: any, option?: any) => {
        console.log('language on change to ', option.text)
        i18next.changeLanguage(option.key);
        dismissPanel();
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
                    defaultSelectedKey={languageArray.key}
                    selectedKey={languageArray.key}
                    onChange={handleLanguageChange}
                    style={{ marginBottom: "10px" }}
                    placeholder="Change Language"
                >
                </Dropdown>
                <Button icon={<Power24Regular />} id="btnLogout" type="button" onClick={handleLogout} >Logout </Button>
            </Panel>
        </div>
    )
}

export default SidePanelComponent