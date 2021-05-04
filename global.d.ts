declare namespace NodeJS {
    interface Process {
        resourcesPath: string;
    }
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const value: any;
    export default value;
}
