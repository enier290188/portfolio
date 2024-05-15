import { appType } from '@./app'

export type TypeWrapperAlert = appType.ContextAlert

export type TypeContext = {
    getAlertList: () => TypeWrapperAlert[]
    addAlert: (alert: Omit<TypeWrapperAlert, 'id'>) => void
    deleteAlert: (id: TypeWrapperAlert['id']) => void
}
