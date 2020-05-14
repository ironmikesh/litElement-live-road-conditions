import { LitElement } from 'lit-element';
export declare class DataElement extends LitElement {
    static styles: import("lit-element").CSSResult;
    iaData: any[];
    mnData: any[];
    events: any[];
    time: string;
    tod: string;
    spinnerStatus: string;
    initialLoad: boolean;
    timer: any;
    refreshRate: number;
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
    getTheDataAndMakeItUseful(): void;
    /**
     * FUNCTION findTheTime
     * set the time (this.time), adjust for AM/PM (this.tod)
     * and make leading zeros so it doesn't look wierd.
     * I must admit this isn't the prettiest of functions,
     * but it is effective.
     **/
    findTheTime(): void;
    /**
    * FUNCTION: getAllData
    * Calls both API endpoints and sets global variables
    *
    * @return: promise after second rest call is complete
    **/
    getAllData(): Promise<void>;
    /**
    * FUNCTION: refreshData
    * makes afresh the api calls and litElement refreshes the UI for us
    * also handles the 60 second interval timer
    *
    * @param: onInitialLoad: boolean for initial load and timer setup
    **/
    refreshData(onInitialLoad: any): void;
    render(): import("lit-element").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'data-element': DataElement;
    }
}
//# sourceMappingURL=data-element.d.ts.map