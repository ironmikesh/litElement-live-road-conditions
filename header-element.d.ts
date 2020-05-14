import { LitElement } from 'lit-element';
export declare class HeaderElement extends LitElement {
    static styles: import("lit-element").CSSResult;
    constructor();
    /**
     * FUNCTION getTheDataAndMakeItUseful
     * This is the main function that calls the data getting functions
     * to load this.iaData and this.mnData
     * This function also sets the local refresh time,
     * keeps the useful data in this.events array,
     * strips the unecessary data away in the process,
     * and also handles refresh data spinner icon (which spins during refresh, just for fun...)
     **/
    /**
     * FUNCTION findTheTime
     * set the time (this.time), adjust for AM/PM (this.tod)
     * and make leading zeros so it doesn't look wierd.
     * I must admit this isn't the prettiest of functions,
     * but it is effective.
     **/
    render(): import("lit-element").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'header-element': HeaderElement;
    }
}
//# sourceMappingURL=header-element.d.ts.map