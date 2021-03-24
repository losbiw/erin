export interface Group {
    [name: string]: Svg | string
}

export interface JsxGroup{
    [name: string]: (() => JSX.Element)
}

export interface Svg {
    path: string,
    gradient?: Gradient
}

export interface Gradient {
    from: string,
    to: string
}