import { themeType } from '../setting/theme'

export const useComponentSpace = (space: themeType.TypeComponentSpace): number[] => {
    let spaceTop = 0
    let spaceRight = 0
    let spaceBottom = 0
    let spaceLeft = 0
    if (typeof space === 'number' || typeof space === 'object') {
        if (typeof space === 'number') {
            spaceTop = space
            spaceRight = space
            spaceBottom = space
            spaceLeft = space
        } else {
            if ('topBottom' in space && 'rightLeft' in space) {
                spaceTop = space.topBottom
                spaceRight = space.rightLeft
                spaceBottom = space.topBottom
                spaceLeft = space.rightLeft
            } else {
                if ('top' in space && 'right' in space && 'bottom' in space && 'left' in space) {
                    spaceTop = space.top
                    spaceRight = space.right
                    spaceBottom = space.bottom
                    spaceLeft = space.left
                }
            }
        }
    }

    return [spaceTop, spaceRight, spaceBottom, spaceLeft]
}
