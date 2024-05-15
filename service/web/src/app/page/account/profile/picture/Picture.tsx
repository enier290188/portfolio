import { app } from '@./app'
import { awsAmplifyApi, awsAmplifyApiType } from '@./package/aws-amplify-api'
import { awsAmplifyStorage } from '@./package/aws-amplify-storage'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeForm = {
    picture: string
}

const DEFAULT_VALUES: TypeForm = {
    picture: ''
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT'
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.account.profile.picture, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const contextUser = React.useContext(app.context.user.Context)
    const user = contextUser.getUser()
    const userId = user?.id ?? ''
    const userActionUpdate = contextUser.updateUser

    const storageUserPictureFileKey = `${app.setting.storage.APP_USER}${userId}/picture.png`

    const queryClient = query.hook.useQueryClient()
    const queryUserGet = query.hook.useQuery({
        queryKey: [`/app/page/account/profile/${userId}/`, 'query', 'db'],
        queryFn: () => awsAmplifyApi.page.account.profile.user.get({ id: userId }),
        initialData: null
    })
    const queryUserPictureGet = query.hook.useQuery({
        queryKey: [`/app/page/account/profile/${userId}/`, 'query', 'storage', storageUserPictureFileKey],
        queryFn: () => awsAmplifyStorage.storage.get(storageUserPictureFileKey),
        initialData: null
    })
    const mutationUserUpdate = query.hook.useMutation({
        mutationKey: [`/app/page/account/profile/${userId}/`, 'mutation', 'db'],
        mutationFn: (user: awsAmplifyApiType.UpdateUserInput) => awsAmplifyApi.page.account.profile.user.picture.update({ user: user })
    })

    const formUpdate = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [defaultValuesToReset, setDefaultValuesToReset] = React.useState<TypeForm>(DEFAULT_VALUES)
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const handleValidateFieldPicture = React.useCallback(
        (value: TypeForm['picture']) => {
            const messageList: string[] = []
            const sizeMax = 524288 // Bytes = 512 KB
            const sizeCurrent = new Blob([value]).size
            if (value && sizeMax < sizeCurrent) {
                messageList.push(i18n.getText('field.picture.validate.max-size', { currentSize: (sizeCurrent / 1024).toFixed(2), maxSize: (sizeMax / 1024).toFixed(2) }))
            }
            return 0 < messageList.length ? messageList.join('<br/>') : true
        },
        [i18n]
    )

    const handleActionResetFieldPicture = React.useCallback(async () => {
        formUpdate.setValue('picture', defaultValuesToReset.picture)
        await formUpdate.trigger()
    }, [formUpdate, defaultValuesToReset])

    const handleActionDeleteFieldPicture = React.useCallback(async () => {
        formUpdate.setValue('picture', DEFAULT_VALUES.picture)
        await formUpdate.trigger()
    }, [formUpdate])

    const handleActionCropCompleteFieldPicture = React.useCallback(
        async (value: string) => {
            formUpdate.setValue('picture', value)
            await formUpdate.trigger()
        },
        [formUpdate]
    )

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryUserGet.refetch()
        await queryUserPictureGet.refetch()
    }, [queryUserGet, queryUserPictureGet])

    const handleActionReset = React.useCallback(async () => {
        formUpdate.setValue('picture', defaultValuesToReset.picture)
        await formUpdate.trigger()
    }, [formUpdate, defaultValuesToReset])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(
        async (data: TypeForm) => {
            const { picture } = data
            if (picture) {
                await awsAmplifyStorage.storage.put(storageUserPictureFileKey, picture)
            } else {
                await awsAmplifyStorage.storage.remove(storageUserPictureFileKey)
            }
            mutationUserUpdate.mutate(
                {
                    id: userId,
                    picture: picture ? storageUserPictureFileKey : null
                },
                {
                    onSuccess: (userUpdated: awsAmplifyApiType.User | null) => {
                        if (user && userUpdated) {
                            userActionUpdate({
                                ...user,
                                picture: picture
                            })
                            queryClient.setQueryData([`/app/page/account/profile/${userId}/`, 'query', 'db'], userUpdated)
                            queryClient.setQueryData([`/app/page/account/profile/${userId}/`, 'query', 'storage', storageUserPictureFileKey], picture ? picture : null)
                            contextAlert.addAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                            setDefaultValuesToReset((oldState) => ({
                                ...oldState,
                                picture: picture
                            }))
                        } else {
                            contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                        }
                    },
                    onError: () => {
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                    }
                }
            )
        },
        [i18n, contextAlert, user, userId, userActionUpdate, storageUserPictureFileKey, queryClient, mutationUserUpdate]
    )

    const effectStepFetching = React.useCallback(async () => {
        if (!queryUserGet.isFetching && !queryUserPictureGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryUserGet.isFetching, queryUserPictureGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const picture = queryUserPictureGet.data ?? DEFAULT_VALUES.picture
        setDefaultValuesToReset((oldState) => ({
            ...oldState,
            picture: picture
        }))
        formUpdate.setValue('picture', picture)
        await formUpdate.trigger()
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryUserPictureGet.data, formUpdate])

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
            {queryUserGet.isFetching || queryUserPictureGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
            <app.layout.main.component.structure.head.spaceBetween.Head>
                <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.box.title.Title level={2}>
                        <mui.icon.Crop />
                        {i18n.getText('title')}
                    </app.layout.main.component.structure.box.title.Title>
                </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                    <app.component.button.Button space={1} disabled={queryUserGet.isFetching || mutationUserUpdate.isPending || formUpdate.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                        {queryUserGet.isFetching || queryUserPictureGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                        {i18n.getText('action.refresh')}
                    </app.component.button.Button>
                </app.layout.main.component.structure.head.spaceBetween.HeadRight>
            </app.layout.main.component.structure.head.spaceBetween.Head>
            {queryUserGet.isFetching || queryUserPictureGet.isFetching ? (
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
                                <form.component.Controller
                                    name={'picture'}
                                    control={formUpdate.control}
                                    rules={{
                                        validate: {
                                            handleValidateFieldPicture
                                        }
                                    }}
                                    render={({ field }) => (
                                        <app.component.field.image.ImageCrop
                                            id={field.name}
                                            value={field.value}
                                            variant={'circular'}
                                            defaultIcon={
                                                <mui.icon.AccountCircle
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />
                                            }
                                            label={i18n.getText('field.picture.label')}
                                            error={!!formUpdate.formState.errors.picture}
                                            helperText={formUpdate.formState.errors.picture?.message}
                                            required={false}
                                            disabled={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting}
                                            isSubmitting={mutationUserUpdate.isPending || formUpdate.formState.isSubmitting}
                                            space={{
                                                top: 2,
                                                right: 1,
                                                bottom: 1,
                                                left: 1
                                            }}
                                            onActionReset={handleActionResetFieldPicture}
                                            onActionDelete={handleActionDeleteFieldPicture}
                                            onActionCropComplete={handleActionCropCompleteFieldPicture}
                                        />
                                    )}
                                />
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
