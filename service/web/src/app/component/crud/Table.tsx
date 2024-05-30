import { app, appType } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import { table as tanstackReactTable, tableType as tanstackReactTableType } from '@./package/tanstack-react-table'
import React from 'react'

export const TableColumnAccessorKeyAction = '_ACTION_'

declare module '@tanstack/table-core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends tanstackReactTableType.RowData> {
        type?: 'crud'
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends tanstackReactTableType.RowData, TValue> {
        type?: typeof TableColumnAccessorKeyAction | 'text' | 'email' | 'phone' | 'datetime' | 'boolean' | 'userGroupList'
        width?: string | number
        expander?: boolean
    }
}

const getLocalStorageTableKey = (tableKey: string) => `app-component-crud-table-${tableKey}`

const getLocalStorageTablePaginationKey = (tableKey: string) => `${getLocalStorageTableKey(tableKey)}-pagination`

const getLocalStorageTableSortingKey = (tableKey: string) => `${getLocalStorageTableKey(tableKey)}-sorting`

const getLocalStorageTableColumnFiltersKey = (tableKey: string) => `${getLocalStorageTableKey(tableKey)}-column-filters`

const LayoutTableHeadColumnSort = <TData extends tanstackReactTableType.RowData>({ tableKey, column }: { tableKey: string; column: tanstackReactTableType.Column<TData> }) => {
    const sxIcon = React.useCallback(
        (theme: muiType.Theme) => ({
            marginLeft: `${theme.spacing(2)} !important`,
            cursor: 'pointer',
        }),
        [],
    )

    const onClick = React.useCallback(() => {
        const columnNextSortingOrder = column.getNextSortingOrder()
        window.localStorage.setItem(getLocalStorageTableSortingKey(tableKey), JSON.stringify(columnNextSortingOrder ? [{ id: column.id, desc: columnNextSortingOrder === 'desc' }] : []))
        column.toggleSorting()
    }, [tableKey, column])

    return (
        <>
            {{
                asc: <mui.icon.ArrowCircleDown color={'primary'} sx={sxIcon} onClick={onClick} />,
                desc: <mui.icon.ArrowCircleUp color={'primary'} sx={sxIcon} onClick={onClick} />,
            }[column.getIsSorted() as string] ?? <mui.icon.Sort color={'primary'} sx={sxIcon} onClick={onClick} />}
        </>
    )
}

const LayoutTableHeadColumnFilter = <TData extends tanstackReactTableType.RowData>({ tableKey, table, column }: { tableKey: string; table: tanstackReactTableType.Table<TData>; column: tanstackReactTableType.Column<TData> }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.crud, i18nLanguage), [i18nLanguage])

    const sxContainer = React.useCallback(
        () => ({
            width: '100%',
            minWidth: '200px',
            maxWidth: '200px',
            '& input::-webkit-calendar-picker-indicator': { opacity: 0 },
        }),
        [],
    )
    const sxTextField = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(0),
            '& .MuiOutlinedInput-root': {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                margin: theme.spacing(0),
                padding: theme.spacing(0),
                '& .MuiOutlinedInput-input': {
                    margin: theme.spacing(0),
                    padding: theme.spacing(1, 1, 1, 0),
                },
            },
        }),
        [],
    )
    const sxTextFieldInputPropsStartAdornment = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(0),
            padding: theme.spacing(1),
        }),
        [],
    )

    const columnFilterValue = column.getFilterValue()
    const facetedUniqueValues = Array.from(column.getFacetedUniqueValues().keys())
        .filter((value) => value !== null && value !== undefined)
        .filter((value) => {
            if (typeof value === 'string') {
                return value.trim() !== ''
            }
            return true
        })

    return (
        <mui.component.Box component={'div'} sx={sxContainer}>
            <datalist id={`${column.id}list`}>
                {facetedUniqueValues.map((value) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <mui.component.TextField
                type={'text'}
                autoComplete={'off'}
                variant={'outlined'}
                color={'primary'}
                size={'small'}
                fullWidth={true}
                value={(columnFilterValue ?? '') as string}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const headerColumnsData: { [key: string]: { id: string; index: number; value: string } } = {}
                    let headerColumnsDataCount: number = 0

                    table.getLeafHeaders().forEach((header) => {
                        if (header.column.getCanFilter()) {
                            const headerColumnFilterIndex = header.column.getFilterIndex()
                            if (-1 < headerColumnFilterIndex) {
                                const headerColumnId = header.column.id
                                const headerColumnFilterValue = header.column.getFilterValue()
                                headerColumnsData[headerColumnId] = {
                                    id: headerColumnId,
                                    index: headerColumnFilterIndex,
                                    value: headerColumnFilterValue ? `${headerColumnFilterValue ?? ''}` : '',
                                }
                                ++headerColumnsDataCount
                            }
                        }
                    })

                    const columnId = column.id
                    const columnFilterIndex = column.getFilterIndex()
                    const columnFilterValue = event.target.value

                    if (headerColumnsData[columnId]) {
                        if (columnFilterValue) {
                            headerColumnsData[columnId] = {
                                id: columnId,
                                index: columnFilterIndex,
                                value: columnFilterValue,
                            }
                        } else {
                            delete headerColumnsData[columnId]
                            for (const columnsDataKey in headerColumnsData) {
                                if (columnFilterIndex < headerColumnsData[columnsDataKey].index) {
                                    --headerColumnsData[columnsDataKey].index
                                }
                            }
                        }
                    } else {
                        headerColumnsData[columnId] = {
                            id: columnId,
                            index: headerColumnsDataCount,
                            value: columnFilterValue,
                        }
                    }

                    const headerColumnList: { id: string; value: string }[] = []
                    for (const columnsDataKey in headerColumnsData) {
                        headerColumnList.push({
                            id: headerColumnsData[columnsDataKey].id,
                            value: headerColumnsData[columnsDataKey].value,
                        })
                    }

                    column.setFilterValue(columnFilterValue)
                    window.localStorage.setItem(getLocalStorageTableColumnFiltersKey(tableKey), JSON.stringify(headerColumnList))
                }}
                placeholder={i18n.getText('table.head.column.filter.textfield.placeholder', { value: facetedUniqueValues.length })}
                inputProps={{
                    list: column.id + 'list',
                }}
                InputProps={{
                    startAdornment: (
                        <mui.component.Box component={'div'} sx={sxTextFieldInputPropsStartAdornment}>
                            <mui.icon.Search />
                        </mui.component.Box>
                    ),
                }}
                sx={sxTextField}
            />
        </mui.component.Box>
    )
}

const LayoutTableHead = <TData extends tanstackReactTableType.RowData>({ tableKey, table }: { tableKey: string; table: tanstackReactTableType.Table<TData> }) => {
    const sxTableCell = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(1, 2),
            verticalAlign: 'top',
            borderBottom: 0,
        }),
        [],
    )
    const sxTableCellContent = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        }),
        [],
    )

    return (
        <mui.component.TableHead>
            <mui.component.TableRow>
                {table
                    .getLeafHeaders()
                    .filter((header) => !header.column.columnDef.meta?.expander)
                    .map((header) => {
                        const headerRender = tanstackReactTable.render.flexRender(header.column.columnDef.header, header.getContext())

                        return (
                            <mui.component.TableCell key={header.id} sx={sxTableCell} style={{ width: header.column.columnDef.meta?.width ?? 'auto', minWidth: header.column.columnDef.meta?.width ?? 'auto', maxWidth: header.column.columnDef.meta?.width ?? 'auto' }}>
                                <mui.component.Box component={'div'} sx={sxTableCellContent}>
                                    {header.id === TableColumnAccessorKeyAction ? (
                                        <>{headerRender}</>
                                    ) : (
                                        <>
                                            <app.component.typography.Typography component={'div'} variant={'body1'}>
                                                <b>{headerRender}</b>
                                                {header.column.getCanSort() ? <LayoutTableHeadColumnSort tableKey={tableKey} column={header.column} /> : null}
                                            </app.component.typography.Typography>
                                            {header.column.getCanFilter() ? <LayoutTableHeadColumnFilter tableKey={tableKey} table={table} column={header.column} /> : null}
                                        </>
                                    )}
                                </mui.component.Box>
                            </mui.component.TableCell>
                        )
                    })}
            </mui.component.TableRow>
        </mui.component.TableHead>
    )
}

const LayoutTableBody = <TData extends tanstackReactTableType.RowData>({ table }: { table: tanstackReactTableType.Table<TData> }) => {
    const sxTableCell = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(0),
            padding: theme.spacing(1, 2),
            verticalAlign: 'top',
            border: 0,
        }),
        [],
    )
    const sxTableCellForRowDefault = React.useCallback(
        (theme: muiType.Theme) => ({
            ...sxTableCell(theme),
            borderTop: `1px solid ${theme.palette.divider}`,
        }),
        [sxTableCell],
    )
    const sxTableCellForRowDefaultLastRow = React.useCallback(
        (theme: muiType.Theme) => ({
            ...sxTableCellForRowDefault(theme),
            borderBottom: `1px solid ${theme.palette.divider}`,
        }),
        [sxTableCellForRowDefault],
    )
    const sxTableCellForRowExpanded = React.useCallback(
        (theme: muiType.Theme) => ({
            ...sxTableCell(theme),
            padding: theme.spacing(1, 2, 2, 2),
        }),
        [sxTableCell],
    )
    const sxTableCellForRowExpandedTableCellForRowDefault = React.useCallback(
        (theme: muiType.Theme) => ({
            ...sxTableCell(theme),
            border: `1px solid ${theme.palette.divider}`,
        }),
        [sxTableCell],
    )
    const sxTableCellContent = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }),
        [],
    )

    const rowsLength = table.getRowModel().rows.length

    const rowCellsData: {
        [key: string]: {
            id: string
            header: appType.TypeFunctionComponent
            type: string
            width: string | number
            expander: boolean
        }
    } = {}
    table.getLeafHeaders().forEach((cell) => {
        const id = cell.id
        const headerRender = tanstackReactTable.render.flexRender(cell.column.columnDef.header, cell.getContext())
        const header =
            id === TableColumnAccessorKeyAction ? (
                <>renderHeader</>
            ) : (
                <app.component.typography.Typography component={'div'} variant={'body1'}>
                    <b>{headerRender}</b>
                </app.component.typography.Typography>
            )
        const type = id === TableColumnAccessorKeyAction ? TableColumnAccessorKeyAction : cell.column.columnDef.meta?.type ?? 'text'
        const width = cell.column.columnDef.meta?.width ?? 'auto'
        const expander = id === TableColumnAccessorKeyAction ? false : cell.column.columnDef.meta?.expander ?? false

        rowCellsData[id] = {
            id: id,
            header: header,
            type: type,
            width: width,
            expander: expander,
        }
    })

    return (
        <mui.component.TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => {
                const cellList = row.getVisibleCells().map((cell) => {
                    const cellData = rowCellsData[cell.column.id]
                    const id = cellData.id
                    const type = cellData.type
                    let value
                    if (type === TableColumnAccessorKeyAction) {
                        value = tanstackReactTable.render.flexRender(cell.column.columnDef.cell, cell.getContext())
                    } else {
                        switch (type) {
                            case 'text': {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {0 < cellValue.length ? cellValue : '-'}
                                    </app.component.typography.Typography>
                                )
                                break
                            }
                            case 'email': {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {0 < cellValue.length ? cellValue : '-'}
                                    </app.component.typography.Typography>
                                )
                                break
                            }
                            case 'phone': {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {0 < cellValue.length ? cellValue : '-'}
                                    </app.component.typography.Typography>
                                )
                                break
                            }
                            case 'datetime': {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {0 < cellValue.length ? new Date(cellValue).toLocaleString() : '-'}
                                    </app.component.typography.Typography>
                                )
                                break
                            }
                            case 'boolean': {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {cellValue === 'true' ? <mui.icon.RadioButtonChecked /> : cellValue === 'false' ? <mui.icon.RadioButtonUnchecked /> : '-'}
                                    </app.component.typography.Typography>
                                )
                                break
                            }
                            case 'userGroupList': {
                                const cellValueList = cell.getValue()
                                value = <app.component.typography.Typography component={'div'} variant={'body1'}>{`-`}</app.component.typography.Typography>

                                if (cellValueList instanceof Array) {
                                    value = (
                                        <mui.component.Box component={'div'}>
                                            {cellValueList.includes(app.setting.user.value.GROUP_ROOT) ? (
                                                <app.component.typography.Typography component={'div'} variant={'body1'}>
                                                    {app.setting.user.value.GROUP_ROOT}
                                                </app.component.typography.Typography>
                                            ) : null}
                                            {cellValueList.includes(app.setting.user.value.GROUP_ADMIN) ? (
                                                <app.component.typography.Typography component={'div'} variant={'body1'}>
                                                    {app.setting.user.value.GROUP_ADMIN}
                                                </app.component.typography.Typography>
                                            ) : null}
                                            {cellValueList.includes(app.setting.user.value.GROUP_SALE) ? (
                                                <app.component.typography.Typography component={'div'} variant={'body1'}>
                                                    {app.setting.user.value.GROUP_SALE}
                                                </app.component.typography.Typography>
                                            ) : null}
                                            {cellValueList.includes(app.setting.user.value.GROUP_PROJECT) ? (
                                                <app.component.typography.Typography component={'div'} variant={'body1'}>
                                                    {app.setting.user.value.GROUP_PROJECT}
                                                </app.component.typography.Typography>
                                            ) : null}
                                            {!(cellValueList.includes(app.setting.user.value.GROUP_ROOT) || cellValueList.includes(app.setting.user.value.GROUP_ADMIN) || cellValueList.includes(app.setting.user.value.GROUP_SALE) || cellValueList.includes(app.setting.user.value.GROUP_PROJECT)) ? value : null}
                                        </mui.component.Box>
                                    )
                                }
                                break
                            }
                            default: {
                                const cellValue = String(cell.getValue()).trim()
                                value = (
                                    <app.component.typography.Typography component={'div'} variant={'body1'}>
                                        {0 < cellValue.length ? cellValue : '-'}
                                    </app.component.typography.Typography>
                                )
                            }
                        }
                    }

                    return {
                        id: id,
                        value: value,
                    }
                })

                return (
                    <React.Fragment key={row.id}>
                        <mui.component.TableRow>
                            {cellList.map((cell) => {
                                const cellData = rowCellsData[cell.id]

                                return !cellData?.expander ? (
                                    <mui.component.TableCell key={cell.id} sx={rowIndex === rowsLength - 1 ? (row.getIsExpanded() ? sxTableCellForRowDefault : sxTableCellForRowDefaultLastRow) : sxTableCellForRowDefault}>
                                        <mui.component.Box component={'div'} sx={sxTableCellContent}>
                                            {cell.value}
                                        </mui.component.Box>
                                    </mui.component.TableCell>
                                ) : null
                            })}
                        </mui.component.TableRow>
                        {row.getIsExpanded() ? (
                            <mui.component.TableRow>
                                <mui.component.TableCell sx={sxTableCellForRowExpanded} />
                                <mui.component.TableCell colSpan={row.getVisibleCells().length - 1} sx={sxTableCellForRowExpanded}>
                                    <mui.component.Box component={'div'} sx={sxTableCellContent}>
                                        <mui.component.Table size={'small'}>
                                            <mui.component.TableBody>
                                                {cellList.map((cell) => {
                                                    const cellData = rowCellsData[cell.id]

                                                    return cellData?.expander ? (
                                                        <mui.component.TableRow key={cell.id}>
                                                            <mui.component.TableCell sx={sxTableCellForRowExpandedTableCellForRowDefault} style={{ width: cellData?.width ?? 'auto', minWidth: cellData?.width ?? 'auto', maxWidth: cellData?.width ?? 'auto' }}>
                                                                <mui.component.Box component={'div'} sx={sxTableCellContent}>
                                                                    {cellData?.header}
                                                                </mui.component.Box>
                                                            </mui.component.TableCell>
                                                            <mui.component.TableCell sx={sxTableCellForRowExpandedTableCellForRowDefault}>
                                                                <mui.component.Box component={'div'} sx={sxTableCellContent}>
                                                                    {cell.value}
                                                                </mui.component.Box>
                                                            </mui.component.TableCell>
                                                        </mui.component.TableRow>
                                                    ) : null
                                                })}
                                            </mui.component.TableBody>
                                        </mui.component.Table>
                                    </mui.component.Box>
                                </mui.component.TableCell>
                            </mui.component.TableRow>
                        ) : null}
                    </React.Fragment>
                )
            })}
        </mui.component.TableBody>
    )
}

const LayoutTableContainer = <TData extends tanstackReactTableType.RowData>({ tableKey, table }: { tableKey: string; table: tanstackReactTableType.Table<TData> }) => {
    return (
        <mui.component.TableContainer component={'div'} sx={{ m: 0, p: 1 }}>
            <mui.component.Table size={'small'}>
                <LayoutTableHead tableKey={tableKey} table={table} />
                <LayoutTableBody table={table} />
            </mui.component.Table>
        </mui.component.TableContainer>
    )
}

const LayoutTablePagination = <TData extends tanstackReactTableType.RowData>({ tableKey, table, tablePaginationPageSizeOptions }: { tableKey: string; table: tanstackReactTableType.Table<TData>; tablePaginationPageSizeOptions: number[] }) => {
    const contextI18n = React.useContext(app.context.i18n.Context)
    const i18nLanguage = contextI18n.getLanguage()
    const i18n = React.useMemo(() => app.setting.i18n.getNode(app.setting.i18n.app.component.crud, i18nLanguage), [i18nLanguage])

    const sxContainer = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }),
        [],
    )
    const sxContent = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }),
        [],
    )
    const sxContentBox = React.useCallback(
        () => ({
            m: 0,
            px: 3,
            py: 1,
        }),
        [],
    )
    const sxContentBoxSelectField = React.useCallback(
        (theme: muiType.Theme) => ({
            m: 0,
            ml: 2,
            p: 0,
            '& .MuiSelect-select': {
                width: theme.spacing(16),
                m: 0,
                p: `${theme.spacing(0, 0, 0, 2)} !important`,
            },
        }),
        [],
    )
    const sxContentBoxTextField = React.useCallback(
        (theme: muiType.Theme) => ({
            mx: 2,
            my: 0,
            p: 0,
            '& .MuiOutlinedInput-root': {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: theme.spacing(16),
                m: 0,
                p: 0,
                '& .MuiOutlinedInput-input': {
                    m: 0,
                    p: 0,
                    pl: 2,
                },
            },
        }),
        [],
    )
    const sxContentBoxPagination = React.useCallback(
        (theme: muiType.Theme) => ({
            '& button': {
                border: `1px solid ${theme.palette.primary.light} !important`,
                color: `${theme.palette.primary.main} !important`,
            },
            '& button:hover': {
                border: `1px solid ${theme.palette.primary.dark} !important`,
                color: `${theme.palette.primary.main} !important`,
            },
            '& button.Mui-selected': {
                border: `1px solid ${theme.palette.primary.main} !important`,
                backgroundColor: `${theme.palette.primary.main} !important`,
                color: `${theme.palette.common.white} !important`,
            },
        }),
        [],
    )

    const tableRowsTotal = table.getPrePaginationRowModel().rows.length
    const tableRowsPageCount = table.getPageCount()

    const tablePagination = table.getState().pagination
    const tablePaginationPageIndex = tablePagination.pageIndex
    const tablePaginationPageSize = tablePagination.pageSize

    return 0 < tableRowsTotal ? (
        <mui.component.Box component={'div'} sx={sxContainer}>
            <mui.component.Box component={'div'} sx={sxContent}>
                <mui.component.Box component={'div'} sx={sxContentBox}>
                    <app.component.typography.Typography component={'div'} variant={'body2'} space={0}>
                        {i18n.getText('table.pagination.total-rows', { value: tableRowsTotal })}
                    </app.component.typography.Typography>
                </mui.component.Box>
                <mui.component.Box component={'div'} sx={sxContentBox}>
                    <app.component.typography.Typography component={'div'} variant={'body2'} space={0}>
                        {i18n.getText('table.pagination.rows-per-page')}
                        <mui.component.Select
                            variant={'outlined'}
                            color={'primary'}
                            size={'small'}
                            autoWidth={true}
                            value={tablePaginationPageSize}
                            sx={sxContentBoxSelectField}
                            onChange={(event: muiType.SelectChangeEvent<number>) => {
                                try {
                                    const pageSize = Number(event.target.value)
                                    window.localStorage.setItem(getLocalStorageTablePaginationKey(tableKey), JSON.stringify({ pageIndex: tablePaginationPageIndex, pageSize: pageSize }))
                                    table.setPageSize(pageSize)
                                } catch (e) {
                                    /* empty */
                                }
                            }}
                        >
                            {tablePaginationPageSizeOptions.map((pageSize) => (
                                <mui.component.MenuItem key={pageSize} value={pageSize}>
                                    {pageSize}
                                </mui.component.MenuItem>
                            ))}
                        </mui.component.Select>
                    </app.component.typography.Typography>
                </mui.component.Box>
            </mui.component.Box>
            {1 < tableRowsPageCount ? (
                <mui.component.Box component={'div'} sx={sxContent}>
                    <mui.component.Box component={'div'} sx={sxContentBox}>
                        <app.component.typography.Typography component={'div'} variant={'body2'} space={0}>
                            {i18n.getText('table.pagination.page')}
                            <mui.component.TextField
                                type={'number'}
                                autoComplete={'off'}
                                variant={'outlined'}
                                color={'primary'}
                                size={'small'}
                                fullWidth={false}
                                value={tablePaginationPageIndex + 1}
                                sx={sxContentBoxTextField}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    try {
                                        const pageIndex = event.target.value ? Number(event.target.value) - 1 : 0
                                        if (0 <= pageIndex && pageIndex < tableRowsPageCount) {
                                            window.localStorage.setItem(getLocalStorageTablePaginationKey(tableKey), JSON.stringify({ pageIndex: pageIndex, pageSize: tablePaginationPageSize }))
                                            table.setPageIndex(pageIndex)
                                        }
                                    } catch (e) {
                                        /* empty */
                                    }
                                }}
                            />
                            {i18n.getText('table.pagination.of', { value: tableRowsPageCount })}
                        </app.component.typography.Typography>
                    </mui.component.Box>
                    <mui.component.Box component={'div'} sx={sxContentBox}>
                        <mui.component.Pagination
                            variant={'outlined'}
                            color={'primary'}
                            shape={'circular'}
                            size={'small'}
                            showFirstButton={false}
                            showLastButton={false}
                            hidePrevButton={true}
                            hideNextButton={true}
                            boundaryCount={5}
                            siblingCount={5}
                            count={tableRowsPageCount}
                            page={tablePaginationPageIndex + 1}
                            sx={sxContentBoxPagination}
                            onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                                try {
                                    const pageIndex = page - 1
                                    if (0 <= pageIndex && pageIndex < tableRowsPageCount) {
                                        window.localStorage.setItem(getLocalStorageTablePaginationKey(tableKey), JSON.stringify({ pageIndex: pageIndex, pageSize: tablePaginationPageSize }))
                                        table.setPageIndex(pageIndex)
                                    }
                                } catch (e) {
                                    /* empty */
                                }
                            }}
                        />
                    </mui.component.Box>
                </mui.component.Box>
            ) : null}
        </mui.component.Box>
    ) : null
}

export const Table = <TData extends tanstackReactTableType.RowData & { id: string }>({ tableKey, columns, data, options }: { tableKey: string; columns: tanstackReactTableType.ColumnDef<TData>[]; data: TData[]; options?: { pagination?: { pageIndex: number; pageSize: number; pageSizeOptions: number[] }; sorting?: { id: string; desc: boolean } } }) => {
    const PAGINATION_PAGE_INDEX = 0
    const PAGINATION_PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25]
    const PAGINATION_PAGE_SIZE = PAGINATION_PAGE_SIZE_OPTIONS[1]

    const initialPaginationState: tanstackReactTableType.PaginationState = { pageIndex: PAGINATION_PAGE_INDEX, pageSize: PAGINATION_PAGE_SIZE }
    const initialExpandedState: tanstackReactTableType.ExpandedState = {}
    const initialSortingState: tanstackReactTableType.SortingState = []
    const initialColumnFiltersState: tanstackReactTableType.ColumnFiltersState = []
    if (0 < columns.length && 'accessorKey' in columns[0]) {
        if (columns[0].accessorKey === TableColumnAccessorKeyAction) {
            if (1 < columns.length && 'accessorKey' in columns[1]) {
                initialSortingState.push({ id: columns[1].accessorKey as string, desc: columns[1]?.sortDescFirst ?? false })
                let index = 2
                while (index < columns.length) {
                    columns[index].sortDescFirst = columns[index]?.sortDescFirst ?? false
                    index++
                }
            }
        } else {
            initialSortingState.push({ id: columns[0].accessorKey as string, desc: columns[1]?.sortDescFirst ?? false })
            let index = 1
            while (index < columns.length) {
                columns[index].sortDescFirst = columns[index]?.sortDescFirst ?? false
                index++
            }
        }
    }
    if (options) {
        if (options?.pagination) {
            initialPaginationState.pageIndex = options.pagination.pageIndex
            if (options.pagination.pageSizeOptions.includes(options.pagination.pageSize)) {
                initialPaginationState.pageSize = options.pagination.pageSize
            } else {
                if (0 < options.pagination.pageSizeOptions.length) {
                    initialPaginationState.pageSize = options.pagination.pageSizeOptions[0]
                } else {
                    options.pagination.pageSizeOptions = PAGINATION_PAGE_SIZE_OPTIONS
                    initialPaginationState.pageSize = PAGINATION_PAGE_SIZE
                }
            }
        }
        if (options?.sorting) {
            initialSortingState[0] = { id: options.sorting.id, desc: options.sorting.desc }
        }
    }

    const [pagination, setPagination] = React.useState<tanstackReactTableType.PaginationState>(initialPaginationState)
    const [expanded, setExpanded] = React.useState<tanstackReactTableType.ExpandedState>(initialExpandedState)
    const [sorting, setSorting] = React.useState<tanstackReactTableType.SortingState>(initialSortingState)
    const [columnFilters, setColumnFilters] = React.useState<tanstackReactTableType.ColumnFiltersState>(initialColumnFiltersState)

    const table = tanstackReactTable.hook.useReactTable({
        columns: columns,
        data: data,
        state: {
            pagination,
            expanded,
            sorting,
            columnFilters,
        },
        // Event
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        // Pipeline
        getCoreRowModel: tanstackReactTable.fn.getCoreRowModel(),
        getPaginationRowModel: tanstackReactTable.fn.getPaginationRowModel(),
        getExpandedRowModel: tanstackReactTable.fn.getExpandedRowModel(),
        getSortedRowModel: tanstackReactTable.fn.getSortedRowModel(),
        getFilteredRowModel: tanstackReactTable.fn.getFilteredRowModel(),
        getFacetedRowModel: tanstackReactTable.fn.getFacetedRowModel(),
        getFacetedUniqueValues: tanstackReactTable.fn.getFacetedUniqueValues(),
        // Get
        getRowId: (originalRow: TData) => originalRow.id,
        getRowCanExpand: () => true,
        // Debug
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
        debugRows: false,
    })

    const tablePaginationPageSizeOptions = options?.pagination?.pageSizeOptions ?? PAGINATION_PAGE_SIZE_OPTIONS

    React.useLayoutEffect(() => {
        // LocalStorage Keys
        const localStorageTablePaginationKey = getLocalStorageTablePaginationKey(tableKey)
        const localStorageTableSortingKey = getLocalStorageTableSortingKey(tableKey)
        const localStorageTableColumnFiltersKey = getLocalStorageTableColumnFiltersKey(tableKey)

        // Pagination
        let localStorageTablePagination: tanstackReactTableType.PaginationState
        try {
            localStorageTablePagination = JSON.parse(window.localStorage.getItem(localStorageTablePaginationKey) ?? '')
            if (!(localStorageTablePagination && typeof localStorageTablePagination === 'object' && Object.hasOwn(localStorageTablePagination, 'pageIndex') && typeof localStorageTablePagination.pageIndex === 'number' && Object.hasOwn(localStorageTablePagination, 'pageSize') && typeof localStorageTablePagination.pageSize === 'number')) {
                throw Error('')
            }
        } catch (e) {
            localStorageTablePagination = { pageIndex: PAGINATION_PAGE_INDEX, pageSize: PAGINATION_PAGE_SIZE }
            window.localStorage.setItem(localStorageTablePaginationKey, JSON.stringify(localStorageTablePagination))
        }

        // Sorting
        let localStorageTableSorting: tanstackReactTableType.SortingState
        try {
            localStorageTableSorting = JSON.parse(window.localStorage.getItem(localStorageTableSortingKey) ?? '')
            if (!(localStorageTableSorting && typeof localStorageTableSorting === 'object' && Object.hasOwn(localStorageTableSorting, 'length'))) {
                throw Error('')
            } else {
                for (const localStorageTableSortingOf of localStorageTableSorting) {
                    if (!('id' in localStorageTableSortingOf)) {
                        throw Error('')
                    }
                    if (!('desc' in localStorageTableSortingOf && (localStorageTableSortingOf.desc === true || localStorageTableSortingOf.desc === false))) {
                        throw Error('')
                    }
                }
            }
        } catch (e) {
            localStorageTableSorting = []
            window.localStorage.setItem(localStorageTableSortingKey, JSON.stringify(localStorageTableSorting))
        }

        // ColumnFilters
        let localStorageTableColumnFilters: tanstackReactTableType.ColumnFiltersState
        try {
            localStorageTableColumnFilters = JSON.parse(window.localStorage.getItem(localStorageTableColumnFiltersKey) ?? '')
            if (!(localStorageTableColumnFilters && typeof localStorageTableColumnFilters === 'object' && Object.hasOwn(localStorageTableColumnFilters, 'length'))) {
                throw Error('')
            } else {
                for (const localStorageTableColumnFiltersOf of localStorageTableColumnFilters) {
                    if (!('id' in localStorageTableColumnFiltersOf)) {
                        throw Error('')
                    }
                    if (!('value' in localStorageTableColumnFiltersOf)) {
                        throw Error('')
                    }
                }
            }
        } catch (e) {
            localStorageTableColumnFilters = []
            window.localStorage.setItem(localStorageTableColumnFiltersKey, JSON.stringify(localStorageTableColumnFilters))
        }

        // Init
        const tableState = table.getState()

        const tablePagination = tableState.pagination
        const tablePaginationPageCount = table.getPageCount()
        if (localStorageTablePagination.pageIndex < 0) {
            localStorageTablePagination.pageIndex = 0
            window.localStorage.setItem(localStorageTablePaginationKey, JSON.stringify({ pageIndex: localStorageTablePagination.pageIndex, pageSize: localStorageTablePagination.pageSize }))
            table.setPageIndex(localStorageTablePagination.pageIndex)
        } else {
            if (tablePaginationPageCount !== 0 && tablePaginationPageCount <= localStorageTablePagination.pageIndex) {
                localStorageTablePagination.pageIndex = 0 < tablePaginationPageCount ? tablePaginationPageCount - 1 : 0
                window.localStorage.setItem(localStorageTablePaginationKey, JSON.stringify({ pageIndex: localStorageTablePagination.pageIndex, pageSize: localStorageTablePagination.pageSize }))
                table.setPageIndex(localStorageTablePagination.pageIndex)
            } else {
                if (localStorageTablePagination.pageIndex !== tablePagination.pageIndex) {
                    table.setPageIndex(localStorageTablePagination.pageIndex)
                }
            }
        }
        if (localStorageTablePagination.pageSize !== tablePagination.pageSize) {
            table.setPageSize(localStorageTablePagination.pageSize)
        }

        const tableSorting = tableState.sorting
        if (0 < localStorageTableSorting.length) {
            const header = table.getLeafHeaders().find((headerFind) => localStorageTableSorting[0].id === headerFind.id)
            if (header) {
                if (0 < tableSorting.length && (tableSorting[0].id !== localStorageTableSorting[0].id || tableSorting[0].desc !== localStorageTableSorting[0].desc)) {
                    header.column.toggleSorting(localStorageTableSorting[0].desc)
                }
            } else {
                window.localStorage.setItem(localStorageTableSortingKey, JSON.stringify([]))
            }
        } else {
            if (0 < tableSorting.length) {
                const header = table.getLeafHeaders().find((headerFind) => tableSorting[0].id === headerFind.id)
                if (header) {
                    header.column.clearSorting()
                }
            }
        }

        const tableColumnFilters = tableState.columnFilters
        if (0 < localStorageTableColumnFilters.length) {
            for (const localStorageTableColumnFiltersFor of localStorageTableColumnFilters) {
                const header = table.getLeafHeaders().find((headerFind) => localStorageTableColumnFiltersFor.id === headerFind.id)
                if (header && header.column.getCanFilter() && header.column.getFilterValue() !== localStorageTableColumnFiltersFor.value) {
                    header.column.setFilterValue(localStorageTableColumnFiltersFor.value)
                }
            }
        } else {
            if (0 < tableColumnFilters.length) {
                table.getLeafHeaders().forEach((header) => (header.column.getCanFilter() && -1 < header.column.getFilterIndex() ? header.column.setFilterValue('') : null))
            }
        }
    })

    return (
        <mui.component.Box component={'div'} sx={{ m: 0, p: 0 }}>
            <LayoutTableContainer tableKey={tableKey} table={table} />
            <LayoutTablePagination tableKey={tableKey} table={table} tablePaginationPageSizeOptions={tablePaginationPageSizeOptions} />
        </mui.component.Box>
    )
}
