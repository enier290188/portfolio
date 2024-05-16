import { app } from '@./app'
import { mui } from '@./package/material-ui'
import { form, formType } from '@./package/react-hook-form'
import { router } from '@./package/react-router'
import { query } from '@./package/tanstack-react-query'
import React from 'react'

type TypeDealRemove = {
    id: string
}
type TypeDeal = {
    id: string
    name: string
    email: string
    phone: string
    createdAt: string
    updatedAt: string
}

type TypeForm = {
    name: string
    email: string
    phone: string
}

const DEFAULT_VALUES: TypeForm = {
    name: '',
    email: '',
    phone: '',
}

enum EFFECT_STEP {
    FETCHING = 'FETCHING',
    FILLING = 'FILLING',
    DEFAULT = 'DEFAULT',
}

const View = () => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const contextI18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.page.workspace.admin.deal.id.remove, contextI18nLanguage), [contextI18nLanguage])

    const contextAlert = React.useContext(app.context.alert.Context)

    const { id } = router.hook.useParams()
    const paramDealId = id ?? ''

    const queryClient = query.hook.useQueryClient()
    const queryDealGet = query.hook.useQuery({
        queryKey: [`/app/page/workspace/admin/deal/${paramDealId}/`, 'query', 'db'],
        queryFn: async () => {
            return {
                id: '1',
                name: DEFAULT_VALUES.name,
                email: DEFAULT_VALUES.email,
                phone: DEFAULT_VALUES.phone,
            }
        },
        initialData: null,
    })
    const mutationDealRemove = query.hook.useMutation({
        mutationKey: [`/app/page/workspace/admin/deal/${paramDealId}/remove/`, 'mutation', 'db'],
        mutationFn: async (deal: TypeDealRemove) => {
            return {
                id: deal.id,
                name: DEFAULT_VALUES.name,
                email: DEFAULT_VALUES.email,
                phone: DEFAULT_VALUES.phone,
                createdAt: '',
                updatedAt: '',
            }
        },
    })

    const formRemove = form.hook.useForm<TypeForm>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })
    const [effectStep, setEffectStep] = React.useState<EFFECT_STEP>(EFFECT_STEP.FETCHING)

    const handleActionRefresh = React.useCallback(async () => {
        setEffectStep(EFFECT_STEP.FETCHING)
        await queryDealGet.refetch()
    }, [queryDealGet])

    const handleActionSubmit: formType.SubmitHandler<TypeForm> = React.useCallback(async () => {
        mutationDealRemove.mutate(
            {
                id: paramDealId,
            },
            {
                onSuccess: (dealRemoved: TypeDeal | null) => {
                    if (dealRemoved) {
                        queryClient.invalidateQueries({ queryKey: [`/app/page/workspace/admin/deal/${paramDealId}/`, 'query', 'db'] })
                        queryClient.setQueryData([`/app/page/workspace/admin/deal/list/`, 'query', 'db'], (dealList: TypeDeal[] | undefined) => (dealList ? dealList.filter((dealFilter: TypeDeal) => dealFilter.id !== paramDealId) : []))
                        contextAlert.addAlert({ type: 'success', message: i18n.getText('action.submit.alert.success') })
                    } else {
                        contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                    }
                },
                onError: () => {
                    contextAlert.addAlert({ type: 'error', message: i18n.getText('action.submit.alert.error') })
                },
            },
        )
    }, [i18n, contextAlert, paramDealId, queryClient, mutationDealRemove])

    const effectStepFetching = React.useCallback(async () => {
        if (!queryDealGet.isFetching) {
            setEffectStep(EFFECT_STEP.FILLING)
        }
    }, [queryDealGet.isFetching])

    const effectStepFilling = React.useCallback(async () => {
        const name = queryDealGet.data?.name ?? DEFAULT_VALUES.name
        const email = queryDealGet.data?.email ?? DEFAULT_VALUES.email
        const phone = queryDealGet.data?.phone ?? DEFAULT_VALUES.phone
        formRemove.setValue('name', name)
        formRemove.setValue('email', email)
        formRemove.setValue('phone', phone)
        setEffectStep(EFFECT_STEP.DEFAULT)
    }, [queryDealGet.data, formRemove])

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

    if (mutationDealRemove.data) {
        return <app.component.navigate.To to={app.setting.route.getNode(app.setting.route.app.workspace.admin.deal).getTo()} />
    }

    if (!queryDealGet.isFetching && !queryDealGet.data) {
        return <app.component.navigate.ToAppErrorNotFound />
    }

    return (
        <app.component.dialog.Dialog>
            <app.layout.main.component.structure.page.Page maxWidth={'sm'}>
                {queryDealGet.isFetching || mutationDealRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.Backdrop /> : null}
                <app.layout.main.component.structure.head.spaceBetween.Head>
                    <app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                        <app.layout.main.component.structure.box.title.Title level={1}>
                            <mui.icon.DeleteForever />
                            {i18n.getText('title')}
                        </app.layout.main.component.structure.box.title.Title>
                    </app.layout.main.component.structure.head.spaceBetween.HeadLeft>
                    <app.layout.main.component.structure.head.spaceBetween.HeadRight>
                        <app.component.button.Button space={1} disabled={queryDealGet.isFetching || mutationDealRemove.isPending || formRemove.formState.isSubmitting} onClick={handleActionRefresh} typographyProps={{ variant: 'body2' }}>
                            {queryDealGet.isFetching ? <app.component.loading.ProgressCircular /> : <mui.icon.Update />}
                            {i18n.getText('action.refresh')}
                        </app.component.button.Button>
                        <app.component.button.ButtonLink to={app.setting.route.getNode(app.setting.route.app.workspace.admin.deal).getTo()} variant={'contained'} space={1} disabled={queryDealGet.isFetching || mutationDealRemove.isPending || formRemove.formState.isSubmitting} typographyProps={{ variant: 'body2' }}>
                            <mui.icon.Close sx={{ m: `0 !important` }} />
                        </app.component.button.ButtonLink>
                    </app.layout.main.component.structure.head.spaceBetween.HeadRight>
                </app.layout.main.component.structure.head.spaceBetween.Head>
                {queryDealGet.isFetching ? (
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
                        <app.component.divider.Divider />
                        <app.layout.main.component.structure.body.Body alignItems={'center'}>
                            <mui.component.Box component={'form'} width={'100%'} maxWidth={'375px'} my={4} noValidate={true} autoComplete={'off'} onSubmit={(event) => event.preventDefault()}>
                                <app.layout.main.component.structure.box.content.Content>
                                    <app.component.alert.Alert
                                        space={{
                                            top: 2,
                                            right: 1,
                                            bottom: 2,
                                            left: 1,
                                        }}
                                        variant={'standard'}
                                        severity={'warning'}
                                    >
                                        {i18n.getText('question.alert')}
                                    </app.component.alert.Alert>
                                </app.layout.main.component.structure.box.content.Content>
                                <app.layout.main.component.structure.box.content.Content>
                                    <form.component.Controller
                                        name={'name'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.Text
                                                type={'text'}
                                                required={false}
                                                InputProps={{
                                                    startAdornment: (
                                                        <mui.component.InputAdornment position={'start'}>
                                                            <mui.icon.Description />
                                                        </mui.component.InputAdornment>
                                                    ),
                                                }}
                                                label={i18n.getText('field.name.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'email'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.TextEmail
                                                required={false}
                                                label={i18n.getText('field.email.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                    <form.component.Controller
                                        name={'phone'}
                                        control={formRemove.control}
                                        render={({ field }) => (
                                            <app.component.field.text.TextPhone
                                                required={false}
                                                label={i18n.getText('field.phone.label')}
                                                error={false}
                                                helperText={''}
                                                disabled={true}
                                                autoFocus={false}
                                                space={{
                                                    top: 2,
                                                    right: 1,
                                                    bottom: 1,
                                                    left: 1,
                                                }}
                                                field={field}
                                            />
                                        )}
                                    />
                                </app.layout.main.component.structure.box.content.Content>
                                {mutationDealRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.ProgressLinear /> : <app.component.divider.Divider />}
                                <app.layout.main.component.structure.box.action.Action>
                                    <app.component.button.ButtonSubmit space={1} color={'warning'} disabled={mutationDealRemove.isPending || formRemove.formState.isSubmitting || formRemove.formState.isValidating || !formRemove.formState.isValid} onClick={formRemove.handleSubmit(handleActionSubmit)}>
                                        {mutationDealRemove.isPending || formRemove.formState.isSubmitting ? <app.component.loading.ProgressCircular /> : <mui.icon.DoneOutline />}
                                        {i18n.getText('action.submit')}
                                    </app.component.button.ButtonSubmit>
                                </app.layout.main.component.structure.box.action.Action>
                            </mui.component.Box>
                        </app.layout.main.component.structure.body.Body>
                    </>
                )}
            </app.layout.main.component.structure.page.Page>
        </app.component.dialog.Dialog>
    )
}

export const Remove = () => {
    return (
        <router.component.Routes>
            <router.component.Route path={``}>
                <router.component.Route index element={<View />} />
                <router.component.Route path={`*`} element={<app.component.navigate.ToAppErrorNotFound />} />
            </router.component.Route>
        </router.component.Routes>
    )
}
