import { app, appType } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeUserRequest = {
    id: appType.TypeModelUser['id']
    picture: appType.TypeModelUser['picture']
}
type TypeForm = {
    picture: string
}

const DEFAULT_VALUES: TypeForm = {
    picture: '',
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.profile.picture, i18nLanguage), [i18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)
    const alertActionAddAlert = contextAlert.addAlert

    const contextAccessToken = React.useContext(app.context.accessToken.Context)
    const accessToken = contextAccessToken.getAccessToken()
    const accessTokenActionUpdateAccessToken = contextAccessToken.updateAccessToken

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userId = user?.id ?? ''
    const userActionUpdateUser = contextUser.updateUser
    const userActionSyncUser = contextUser.syncUser

    const queryClient = query.hook.useQueryClient()
    const queryUserGet = query.hook.useQuery({
        queryKey: [`/app/page/account/profile/`, 'query', 'db'],
        queryFn: async (): Promise<null | appType.TypeServiceApiPageAccountProfileResponse> => {
            const response = await app.service.api.page.account.profile_get({ accessToken: accessToken, id: userId })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return response.data?.item ?? null
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.fetch.alert.error') })
                return null
            }
        },
        initialData: null,
    })
    const mutationUserUpdate = query.hook.useMutation({
        mutationKey: [`/app/page/account/profile/picture/`, 'mutation', 'db'],
        mutationFn: async (user: TypeUserRequest): Promise<null | appType.TypeServiceApiPageAccountProfileResponse> => {
            const response = await app.service.api.page.account.profile_picture_update({ accessToken: accessToken, user: user })
            if (response.status === 200) {
                accessTokenActionUpdateAccessToken(response.data.auth.access_token)
                userActionSyncUser(response.data.auth.user)
                queryClient.setQueryData([`/app/page/account/profile/`, 'query', 'db'], response.data.item)
                alertActionAddAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return response.data?.item ?? null
            } else {
                alertActionAddAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                return null
            }
        },
    })

    const formUpdate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [defaultValuesToReset, setDefaultValuesToReset] = React.useState<TypeForm>(DEFAULT_VALUES)
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryUserGet.refetch()
    }, [queryUserGet])

    const handleActionReset = React.useCallback(async () => {
        formUpdate.setValue('picture', defaultValuesToReset.picture)
        await formUpdate.trigger()
    }, [formUpdate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { picture } = data

            mutationUserUpdate.mutate(
                {
                    id: userId,
                    picture: picture,
                },
                {
                    onSuccess: (userUpdated) => {
                        if (user && userUpdated) {
                            userActionUpdateUser({
                                ...user,
                                picture: picture,
                            })
                            setDefaultValuesToReset((oldState) => ({
                                ...oldState,
                                picture: picture,
                            }))
                        }
                    },
                },
            )
        },
        [user, userId, userActionUpdateUser, mutationUserUpdate],
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryUserGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryUserGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const picture = queryUserGet.data?.picture ?? DEFAULT_VALUES.picture
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            picture: picture,
        }))
        formUpdate.setValue('picture', picture)
        await formUpdate.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryUserGet.data, formUpdate])

    React.useEffect(() => {
        switch (effectStep) {
            case EFFECT_STEP.FETCHING:
                effectStepFetching()
                    .then(() => null)
                    .catch(() => null)
                break
            case EFFECT_STEP.FILLING:
                effectStepFilling()
                    .then(() => null)
                    .catch(() => null)
                break
            default:
                break
        }
    }, [effectStep, effectStepFetching, effectStepFilling])

    if (!queryUserGet.isFetching && !queryUserGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
    }

    return (
        <>
            {queryUserGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.spaceBetween.Head>
                <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.box.title.Title level={2}>
                        <mui.icon.Crop />
                        {i18n.getText('title')}
                    </app.layout.main.component.structure.box.title.Title>
                </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                    <app.component.button.Button space={1} disabled={queryUserGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                        {queryUserGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                        {i18n.getText('action.refresh')}
                    </app.component.button.Button>
                </app.layout.main.component.structure.head.spaceBetween.HeadRight>
            </app.layout.main.component.structure.head.spaceBetween.Head>
            {queryUserGet.isFetching ? (
                <>
                    <app.component.loading.ProgressLinear />
                    <app.layout.main.component.structure.body.Body>
                        <app.layout.main.component.structure.box.content.Content>
                            <app.component.loading.Text />
                        </app.layout.main.component.structure.box.content.Content>
                    </app.layout.main.component.structure.body.Body>
                </>
            ) : (
                <>
                    <app.layout.main.component.structure.body.Body alignItems={'center'}>
                        <mui.component.Box component={'form'} width={'100%'} maxWidth={'375px'} my={4} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                            <app.layout.main.component.structure.box.content.Content>
                                <app.component.underConstruction.UnderConstruction />
                            </app.layout.main.component.structure.box.content.Content>
                            {mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                            <app.layout.main.component.structure.box.action.Action>
                                <app.component.button.ButtonSubmit space={1} disabled={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting || formUpdate.formState.isValidating || !formUpdate.formState.isValid} onClick={formUpdate.handleSubmit(handleActionSubmit)}>
                                    {mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.Save />}
                                    {i18n.getText('action.submit')}
                                </app.component.button.ButtonSubmit>
                                <app.component.button.Button space={1} disabled={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionReset}>
                                    {formUpdate.formState.isValidating ? <app.component.loading.ProgressCircular /> : <mui.icon.Restore />}
                                    {i18n.getText('action.reset')}
                                </app.component.button.Button>
                            </app.layout.main.component.structure.box.action.Action>
                        </mui.component.Box>
                    </app.layout.main.component.structure.body.Body>
                </>
            )}
        </>
    )
}

export const Picture = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
