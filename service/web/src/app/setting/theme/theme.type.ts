export type ComponentSpace =
    | 0
    | 1
    | 2
    | {
          topBottom: 0 | 1 | 2
          rightLeft: 0 | 1 | 2
      }
    | {
          top: 0 | 1 | 2
          right: 0 | 1 | 2
          bottom: 0 | 1 | 2
          left: 0 | 1 | 2
      }
