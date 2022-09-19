import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { IPanelProps, Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { Dismiss24Regular, Navigation24Regular, Power24Regular } from '@fluentui/react-icons';
import { Dropdown, IRenderFunction, Persona, PersonaSize } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { loginRequest } from "../../../AuthConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { languageOptions } from '../../../constant/optionsArray';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const languageArray: any = languageOptions;
const currentLanguageCode = cookies.get('i18next');
languageArray.filter((x: any) => x.key === currentLanguageCode).map((k: any) => k.disabled = true);
let userArray: any;

const SidePanelComponent = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const { instance, accounts, inProgress } = useMsal();
    const [userName, setUserName] = useState("");
    const { t } = useTranslation();
    // let currentLanguage = languageArray.find((x: any) => x.key == currentLanguageCode);

    useEffect(() => {
        userArray = accounts[0].idTokenClaims;
        setUserName(userArray.family_name + ', ' + userArray.given_name);
        //console.log('use mal account: ', userArray);
    })

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        })
    }

    const handleLanguageChange = (e: any, option?: any) => {
        console.log('language on change to ', option.text)
        i18next.changeLanguage(option.key);
        languageArray.filter((x: any) => x.key === option.key).map((k: any) => k.disabled = true);
        languageArray.filter((x: any) => x.key !== option.key).map((k: any) => k.disabled = false);
        dismissPanel();
    }

    const handleHeaderContent: IRenderFunction<IPanelProps> = useCallback(

        () => (
            <div className='grid justify-start p-0' >
                <Persona isOutOfOffice={true} text={userName} size={PersonaSize.size32} /><Dismiss24Regular />
            </div>
        ), [],

    );

    const handleHeaderContent2: any = () => {
        <div className='grid justify-start p-0' >
            <Persona isOutOfOffice={true} text={userName} size={PersonaSize.size32} />
        </div>
    }

    return (
        <div>
            <Button icon={<Navigation24Regular />} onClick={openPanel} />
            <Panel
                isLightDismiss
                onDismiss={dismissPanel}
                isOpen={isOpen}
                hasCloseButton={true}
            //headerTextProps={handleHeaderContent2}
            //style={{maxWidth: "400px"}}
            //onRenderNavigationContent={handleHeaderContent}
            >
                <Persona isOutOfOffice={true} text={userName} size={PersonaSize.size32} />
                <br></br>
                <Dropdown
                    id="multiLanguage"
                    //label="Preffered Language"
                    options={languageArray}
                    defaultSelectedKey={languageArray.key}
                    selectedKey={languageArray.key}
                    onChange={handleLanguageChange}
                    style={{ marginBottom: "10px" }}
                    placeholder={t("side_panel.sel_Language")}
                >
                </Dropdown>
                <Button icon={<Power24Regular />} id="btnLogout" type="button" onClick={handleLogout} >{t("side_panel.btn_Logout")} </Button>
            </Panel>
        </div>
    )
}

export default SidePanelComponent