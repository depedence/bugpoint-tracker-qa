interface HTMLElement {
    addEventListener(type: 'dragstart', listener: (this: HTMLElement, ev: DragEvent) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: 'dragover', listener: (this: HTMLElement, ev: DragEvent) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: 'drop', listener: (this: HTMLElement, ev: DragEvent) => any, options?: boolean | AddEventListenerOptions): void;
}
