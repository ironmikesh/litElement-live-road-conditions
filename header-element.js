var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, customElement } from 'lit-element';
import { DataElement } from './data-element';
let HeaderElement = class HeaderElement extends LitElement {
    // @property({ type: Array })
    // iaData = [];
    // mnData = [];
    // events = [];
    // @property({ type: String })
    // time = "";
    // tod = "";
    // spinnerStatus = "";
    // @property({ type: Boolean })
    // initialLoad = true;
    // @property({ attribute: false })
    // timer;
    // @property({ type: Number })
    // refreshRate = 10000; //in milliseconds: 
    // //EDIT THIS if you'd like FOR TESTING PURPOSES - 10000 is good (10 seconds)
    // //reset to 60000 when ready to go one minute
    constructor() {
        super();
        console.log('DataElement.iaData', DataElement.iaData);
    } //end Constructor
    /**
     * FUNCTION getTheDataAndMakeItUseful
     * This is the main function that calls the data getting functions
     * to load this.iaData and this.mnData
     * This function also sets the local refresh time,
     * keeps the useful data in this.events array,
     * strips the unecessary data away in the process,
     * and also handles refresh data spinner icon (which spins during refresh, just for fun...)
     **/
    // getTheDataAndMakeItUseful() {
    //     this.spinnerStatus = "spinning";
    //     //first, get the data (this.iaData, this.mnData)
    //     this.getAllData().then(done => {
    //         //then set the time for the Last Updated...
    //         this.findTheTime();
    //         //Make the data useful...
    //         //Now, I could use underscore or javascript object manipulation 
    //         //(underscore: _.pick() would be good), but that almost feels like
    //         //cheating, so I'd rather write some logic...
    //         let tempArray = [];
    //         for (let i = 0; i < this.iaData.length; i++) {
    //             if (this.iaData[i].priority > 4 && this.iaData[i].priority < 8 && this.iaData[i].geometry.type.toLowerCase() == 'point') {
    //                 //create one stripped down object 
    //                 const tempObj = {
    //                     key: this.iaData[i].key,
    //                     geometry: {
    //                         type: this.iaData[i].geometry.type //should be point!
    //                     },
    //                     representation: {
    //                         color: this.iaData[i].representation.color
    //                     },
    //                     priority: this.iaData[i].priority,
    //                     tooltip: this.iaData[i].tooltip.replace(/(<([^>]+)>)/ig, "")  //strip html from description
    //                 };
    //                 tempArray.push(tempObj);
    //             } //end IA if conditional
    //         } //end IA for loop, begin mn loop, keep adding to tempArray
    //         for (let i = 0; i < this.mnData.length; i++) {
    //             if (this.mnData[i].priority > 4 && this.mnData[i].priority < 8 && this.mnData[i].geometry.type.toLowerCase() == 'point') {
    //                 const tempObj = {
    //                     key: this.mnData[i].key,
    //                     geometry: {
    //                         type: this.mnData[i].geometry.type //should be point!
    //                     },
    //                     representation: {
    //                         color: this.mnData[i].representation.color
    //                     },
    //                     priority: this.mnData[i].priority,
    //                     tooltip: this.mnData[i].tooltip.replace(/(<([^>]+)>)/ig, "")  //strip html from description
    //                 };
    //                 tempArray.push(tempObj);
    //             } //end MN if conditional
    //         } //end MN for loop
    //         //Finally - set our stripped data array to global events variable
    //         this.events = tempArray;
    //         this.spinnerStatus = "";
    //     });
    // }
    /**
     * FUNCTION findTheTime
     * set the time (this.time), adjust for AM/PM (this.tod)
     * and make leading zeros so it doesn't look wierd.
     * I must admit this isn't the prettiest of functions,
     * but it is effective.
     **/
    // findTheTime() {
    //     let now = new Date();
    //     let hours = now.getHours();
    //     let minutes = now.getMinutes();
    //     let seconds = now.getSeconds();
    //     let displayHours = "";
    //     let displayMinutes = "";
    //     let displaySeconds = "";
    //     if (hours > 12) {
    //         hours = hours - 12;
    //         this.tod = "PM";
    //     } else if (hours == 0) {
    //         hours = 12;
    //         this.tod = "AM";
    //     } else {
    //         this.tod = "AM";
    //     }
    //     //convert times to string and add leading zeros to all
    //     displayHours = String(hours);
    //     displayMinutes = String(minutes);
    //     displaySeconds = String(seconds);
    //     if (hours < 10) {
    //         displayHours = "0" + String(hours);
    //     }
    //     if (minutes < 10) {
    //         displayMinutes = "0" + String(minutes);
    //     }
    //     if (seconds < 10) {
    //         displaySeconds = "0" + String(seconds);
    //     }
    //     this.time = displayHours + ':' + displayMinutes + ':' + displaySeconds;
    // }
    // // /**
    // // * FUNCTION: getAllData
    // // * Calls both API endpoints and sets global variables
    // // * 
    // // * @return: promise after second rest call is complete
    // // **/
    // // async getAllData() {
    // //     await fetch(`https://iatg.carsprogram.org/events_v1/api/eventMapFeatures`)
    // //         .then(response => response.json())
    // //         .then(async data => {
    // //             this.iaData = data;
    // //             return fetch(`https://mntg.carsprogram.org/events_v1/api/eventMapFeatures`)
    // //                 .then(response2 => response2.json())
    // //                 .then(async data2 => {
    // //                     this.mnData = data2;
    // //                 });
    // //         });
    // // };
    // /**
    // * FUNCTION: refreshData
    // * makes afresh the api calls and litElement refreshes the UI for us
    // * also handles the 60 second interval timer
    // *
    // * @param: onInitialLoad: boolean for initial load and timer setup
    // **/
    // refreshData(onInitialLoad) {
    //     if (onInitialLoad == true) {
    //         console.log('INITIAL LOAD');
    //         this.getTheDataAndMakeItUseful();
    //         this.timer = setInterval(this.getTheDataAndMakeItUseful.bind(this), this.refreshRate);
    //     } else {
    //         clearInterval(this.timer);
    //         this.getTheDataAndMakeItUseful();
    //         this.timer = setInterval(this.getTheDataAndMakeItUseful.bind(this), this.refreshRate);
    //     }
    // };
    render() {
        return html `

          <div class="header">
            <div class="header-title bold centered">
              <span class="span-title">High Priority Events: Minnesota & Iowa</span>
              <span class="counter">(${DataElement.events.length})</span>
            </div>

            <div class="header-subtitle regular centered">
              <span class="span-subtitle">Last Updated: ${DataElement.time} ${DataElement.tod}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a class="regular bold" href="#" @click="${DataElement.refreshData}">refresh data
                <img class="offset ${DataElement.spinnerStatus}" 
                     src="https://image.flaticon.com/icons/png/512/61/61444.png" width="15">
                </img>
              </a>
            </div>
          </div>

          
        `;
    }
};
HeaderElement.styles = css `
          .centered {
            text-align: center;
            vertical-align: middle;
          }
          .noto {
            font-family: 'Noto Sans KR', sans-serif;
          }
          .regular {
            font-size: 1em
          }
          .bold {
            font-weight: bold;
          }
          .col-color {
            width: 10px;
          }
          .col-id {
            width: 18%;
            padding: 3px 10px;
          }
          .col-description {
            padding: 3px 0px;
          }
          .col-priority {
            padding: 0px 10px;
          }
          .header {
            font-family: 'Noto Sans KR', sans-serif;
          }
          .header-title {
            font-size: 1.5em;
            padding: 10px;
          }
          .header-subtitle {
            padding: 5px 10px 15px 10px;
          }
          .span-subtitle {
            font-style: italic;
            font-weight: light;
          }
          .offset {
            margin-bottom: -2px;
          }
          .spinning {
            animation-name: spin;
            animation-duration: 800ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear; 
          }
          @keyframes spin {
              from {
                  transform:rotate(0deg);
              }
              to {
                  transform:rotate(360deg);
              }
          }
        `;
HeaderElement = __decorate([
    customElement('header-element')
], HeaderElement);
export { HeaderElement };
//# sourceMappingURL=header-element.js.map