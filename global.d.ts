declare namespace NodeJS {
    interface Process {
        resourcesPath: string;
    }
}

declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: string;
  
    export default ReactComponent;
  }