import { app } from '@./app'
import { awsAmplifyApi, awsAmplifyApiType } from '@./package/aws-amplify-api'
import { mui } from '@./package/material-ui'
import { router } from '@./package/react-router'
import React from 'react'

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.admin.setting.application, contextI18nLanguage), [contextI18nLanguage])

    const countMax = 1000
    const [count, setCount] = React.useState(1)

    const leadCreate = React.useCallback(async () => {
        const name = `Lead ${count}`
        const email = `lead${count}@gmail.com`
        const leadList: awsAmplifyApiType.Lead[] = await awsAmplifyApi.page.workspace.admin.setting.application.lead.list({ variables: { filter: { and: [{ name: { eq: name } }, { email: { eq: email } }] } } })
        if (0 === leadList.length) {
            const leadModel = await awsAmplifyApi.page.workspace.admin.setting.application.lead.create({ lead: { name: name, email: email } })
            if (leadModel) {
                console.log(`+++ Success Creating +++`)
                console.log(`Lead: ${name}`)
            }
        }
    }, [count])

    const dealCreate = React.useCallback(async () => {
        const name = `Deal ${count}`
        const email = `deal${count}@gmail.com`
        const dealList: awsAmplifyApiType.Deal[] = await awsAmplifyApi.page.workspace.admin.setting.application.deal.list({ variables: { filter: { and: [{ name: { eq: name } }, { email: { eq: email } }] } } })
        if (0 === dealList.length) {
            const dealModel = await awsAmplifyApi.page.workspace.admin.setting.application.deal.create({ deal: { name: name, email: email } })
            if (dealModel) {
                console.log(`+++ Success Creating +++`)
                console.log(`Deal: ${name}`)
            }
        }
    }, [count])

    const cloudSync = React.useCallback(async () => {
        await leadCreate()
        await dealCreate()
    }, [leadCreate, dealCreate])

    React.useEffect(() => {
        if (count <= countMax) {
            cloudSync().then(() => setCount((count) => ++count))
        }
    }, [countMax, count, cloudSync])

    return (
        <>
            <app.layout.main.component.structure.head.spaceBetween.Head>
                <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.box.title.Title level={1}>
                        <mui.icon.CloudSync />
                        {i18n.getText('title')}
                    </app.layout.main.component.structure.box.title.Title>
                </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
            </app.layout.main.component.structure.head.spaceBetween.Head>
            <app.component.divider.Divider />
            <app.layout.main.component.structure.body.Body alignItems={'center'}>
                <mui.component.Box component={'div'} width={'100%'} maxWidth={'375px'} my={4}>
                    <app.layout.main.component.structure.box.content.Content>
                        <app.component.alert.Alert
                            space={{
                                top: 2,
                                right: 1,
                                bottom: 2,
                                left: 1
                            }}
                            variant={'standard'}
                            severity={'info'}
                        >
                            {i18n.getText('info.alert')}
                        </app.component.alert.Alert>
                    </app.layout.main.component.structure.box.content.Content>
                    <app.layout.main.component.structure.box.content.Content alignItems={'center'}>
                        <app.component.typography.Typography component={'p'} variant={'body1'}>
                            {count} - {countMax}
                        </app.component.typography.Typography>
                    </app.layout.main.component.structure.box.content.Content>
                </mui.component.Box>
            </app.layout.main.component.structure.body.Body>
        </>
    )
}

export const Application = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
