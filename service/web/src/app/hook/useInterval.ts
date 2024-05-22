import React from 'react'

const _getDate = (): ReturnType<typeof Date.now> => Date.now()

export const useInterval = (): { date: ReturnType<typeof Date.now>; start: (timeout?: number) => void; stop: () => void } => {
    const [date, setDate] = React.useState<ReturnType<typeof Date.now>>(_getDate)
    const intervalRef = React.useRef<null | ReturnType<typeof setInterval>>(null)

    const intervalStop = React.useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    const intervalStart = React.useCallback(
        (timeout = 1000) => {
            if (intervalRef.current) {
                intervalStop()
            }
            intervalRef.current = setInterval(() => setDate(() => _getDate()), timeout)
        },
        [intervalStop],
    )

    React.useEffect(() => {
        return () => intervalStop() // Cleanup
    }, [intervalStop])

    return { date: date, start: intervalStart, stop: intervalStop }
}
