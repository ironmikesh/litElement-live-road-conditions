import { LitElement, html, css, property, customElement } from 'lit-element';


@customElement('data-element')
export class DataElement extends LitElement {

  static styles = css`
    .divTable {
      display: table;
      width: 100%;
    }
    .divTableRow {
      display: table-row;
      height: 50px;
      min-height: 50px;
    }
    .divTableRow:nth-of-type(odd) {
        background-color: #E8E8E8;
    }
    .divTableHeading {
      background-color: #C8C8C8;
      display: table-header-group;
      font-weight: bold;
      font-size: 1.25em;
    }
    .divTableCell {
      border: 0px;
      display: table-cell;
      vertical-align: middle;
    }
    .divTableBody {
      display: table-row-group;
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
      width: 15px;
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

  //bind properties of global variables
  @property({type: Array})
      iaData = [];
      mnData = [];
      events = [];
  @property({type: String})
      time = "";
      tod = "";
      spinnerStatus = "";
  @property({type: Boolean})
      initialLoad = true;
  @property({attribute: false})
      timer;
  @property({type: Number})
      refreshRate = 60000; //in milliseconds: 
      //EDIT THIS if you'd like FOR TESTING PURPOSES - 10000 is good (10 seconds)
      //reset to 60000 when ready to go one minute
  
  //Use constructor to fire the initial loading of data (true is passed for initialLoad)
  //TODO: even though this is probably cleaner code, research how to do this in the @property binding area
  constructor() {
      super();
      this.refreshData(true);
  } 

  /**
   * FUNCTION getTheDataAndMakeItUseful
   * This is the main function that calls the data getting functions
   * to load this.iaData and this.mnData
   * This function also sets the local refresh time,
   * keeps the useful data in this.events array,
   * strips the unecessary data away in the process,
   * and also handles refresh data spinner icon (which spins during refresh, just for fun...)
   **/

  getTheDataAndMakeItUseful() {
    this.spinnerStatus = "spinning";
    //first, get the data (this.iaData, this.mnData)
    this.getAllData().then(() => {

      //then set the time for the Last Updated...
      this.findTheTime();

      //Make the data useful...Showing TWO ways to do it: 
      // writing logic (helper function pickOverDataSet)
      // and using a built in filter() function (which kinda feels like cheating)
      // SET this.events to TEMPARRAY or TEMPARRAY2 at the end to test either method

      //pick over our data so we only have what we want
      let tempArray = [];
      this.pickOverDataSet(this.iaData, tempArray);
      this.pickOverDataSet(this.mnData, tempArray);

      //OR we could do it like this using the filter method:
      let underscoreArray1 = this.iaData.filter(obj => 
        obj.geometry.type.toLowerCase() == 'point');

      let underscoreArray2 = this.mnData.filter(obj =>
        obj.geometry.type.toLowerCase() == 'point');
      
      let tempArray2 = underscoreArray1.concat(underscoreArray2);
      
      console.log('filtered: ' + tempArray2.length + ' unfiltered: ' + tempArray.length + ' <--should be the same');

      
      //Finally - set our stripped data array to global events variable
      this.events = tempArray;  //you may change this to tempArray2 if you'd like to test
                                //the filter() method instead
      this.spinnerStatus = "";
    });
  }

  /**
   * Void Function pickOverDataSet
   * Helper function to give us only what we want to display
   * (see requirements)
   * 
   * @param dataSet: large array of json objects returned from api call
   * @param temporaryArray: an array to hold the picked over objects
   */
  pickOverDataSet(dataSet, temporaryArray) {
    for(let i = 0; i <dataSet.length; i++) {

      if (dataSet[i].geometry.type.toLowerCase() == 'point') {

        //create one stripped down object 
        const tempObj = {
          key: dataSet[i].key,
          geometry: {
            type: dataSet[i].geometry.type //should be point!
          },
          representation: {
            color: dataSet[i].representation.color
          },
          priority: dataSet[i].priority,
          tooltip: dataSet[i].tooltip.replace(/(<([^>]+)>)/ig, "")  //strip html from description
        };

        temporaryArray.push(tempObj);
      } 
    }
  }

  /**
   * FUNCTION findTheTime
   * set the time (this.time), adjust for AM/PM (this.tod)
   * and make leading zeros so it doesn't look wierd.
   * I must admit this isn't the prettiest of functions, 
   * but it is effective.
   **/
  findTheTime() {
    //get the time right now
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    //set up display strings for later (ES6 doesn't like type changes in variables)
    let displayHours = "";
    let displayMinutes = "";
    let displaySeconds = "";

    //set AM and PM (this.tod), adjust for 24 hour clock time
    if (hours == 12) {
      this.tod = "PM";
    } else if (hours > 12) {
      hours = hours - 12;
      this.tod = "PM";
    } else if (hours == 0) {
      hours = 12;
      this.tod = "AM";
    } else {
      this.tod = "AM";
    }

    //convert times to string and add leading zeros if necessary
    displayHours = String(hours);
    displayMinutes = String(minutes);
    displaySeconds = String(seconds);

    if (hours < 10) {
      displayHours = "0" + String(hours);
    }
    if (minutes < 10) {
      displayMinutes = "0" + String(minutes);
    }
    if (seconds < 10) {
      displaySeconds = "0" + String(seconds);
    }
    //set the time!
    this.time = displayHours + ':' + displayMinutes + ':' + displaySeconds;
  }

  /**
  * FUNCTION: getAllData
  * Calls both API endpoints and sets global variables
  * 
  * @return: promise after second rest call is complete
  **/
  async getAllData() {
    await fetch(`https://iatg.carsprogram.org:443/events_v1/api/eventMapFeatures?eventClassifications=iowaAppRoadwork&minPriority=5&maxPriority=7`)
      .then(response => response.json())
      .then(async data => {
        this.iaData = data;
        return fetch(`https://mntg.carsprogram.org:443/events_v1/api/eventMapFeatures?eventClassifications=roadReports&minPriority=5&maxPriority=7`)
            .then(response2 => response2.json())
            .then(async data2 => {
                this.mnData = data2;
            });
      });
  };

  /**
  * FUNCTION: refreshData
  * makes afresh the api calls and litElement refreshes the UI for us
  * also handles the 60 second interval timer
  *
  * @param: onInitialLoad: boolean for initial load and timer setup
  **/
  refreshData(onInitialLoad) {
      if (onInitialLoad == true) {
          console.log('INITIAL LOAD');
          this.getTheDataAndMakeItUseful();
          this.timer = setInterval(this.getTheDataAndMakeItUseful.bind(this), this.refreshRate);
      } else {
          clearInterval(this.timer);
          this.getTheDataAndMakeItUseful();
          this.timer = setInterval(this.getTheDataAndMakeItUseful.bind(this), this.refreshRate);
      }
  };

  

  render() {
      return html`
        <link rel="stylesheet" href="../src/css-global.css">
        <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/all.css">

        <div class="header">
          <div class="header-title bold centered">
            <span class="span-title">High Priority Events: Minnesota & Iowa</span>
            <span class="counter">(${this.events.length})</span>
             
          </div>

          <div class="header-subtitle regular centered">
            <span class="span-subtitle">Last Updated: ${this.time} ${this.tod}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a class="regular bold" href="#" @click="${this.refreshData}">refresh data</a>
            <i class="offset fas fa-sync-alt ${this.spinnerStatus}"></i>
          </div>
        </div>

        <div class="divTable">
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="divTableCell divTableHeading"></div>
              <div class="divTableCell divTableHeading noto col-id">ID</div>
              <div class="divTableCell divTableHeading noto col-description">Description</div>
              <div class="divTableCell divTableHeading noto col-priority">Priority</div>
            </div>
            ${this.events.map(item => html`
            <div class="divTableRow">
              <div class="divTableCell col-color" style="background-color:${item.representation.color};"></div>
              <div class="divTableCell noto bold col-id">${item.key}</div>
              <div class="divTableCell noto col-description">${item.tooltip}</div>
              <div class="divTableCell noto bold col-priority centered">${item.priority}</div>
            </div>
            `)}
          </div>
        </div>
      `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        'data-element': DataElement;
    }
}