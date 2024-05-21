export type TypeWrapperValue = string

export type TypeContext = {
    getValue: () => TypeWrapperValue
    updateValue: (value: TypeWrapperValue) => void
    removeValue: () => void
}
