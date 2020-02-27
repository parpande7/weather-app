import React from 'react';
import Home from './Home';
import {Route} from 'react-router-dom';
import Settings from './Settings'

function App(props)
{
    console.log("App.js");
    return(
        <div>
         {/* <Navbar/> */}

       <div className="container my-4">
           <Route path="/"exact component={Home}/>
           <Route path = "/settings"  exact component = {Settings}/>
     </div>
        </div>
    );
}
export default App; 
 163  src/components/Details.js 
@@ -0,0 +1,163 @@
import React, {Component} from 'react';
import DetailsService from '../services/DetailsService';
// import Settings from './Settings';
import {Link} from 'react-router-dom'
const DETAILS_FETCHING = 'DETAILS_FETCHING';
const DETAILS_FETCHED = 'DETAILS_FETCHED';
const DETAILS_FETCH_FAILED = 'DETAILS_FETCH_FAILED';

class Details extends Component {

    state = {
        details : null,
        errors : null,
        

    };

    render() {       
        console.log("Details.js");

        const {status,error,details} = this.state;

        let el = null;

        switch(status){

            case DETAILS_FETCHING:
                el = (

                    <h1>
                        Details Fetching takes place
                    </h1>

                )
                break;

            case DETAILS_FETCHED:
                el = (



                    <div align = 'center'>

                        <p>{details.city.name}</p>
                        <p>{Math.floor(details.list[0].main.temp - 273)}&#8451;</p>    
                        <p>{details.list[0].wind.speed} m/s</p>
                        <p>{details.list[0].main.sea_level} hpa</p>
                        <div align = 'right'>


                        <Link className="nav-link" to="/settings">
                        <button type = "submit">Change Location</button>
                        </Link>
                        </div>

                        <div>

                        <div align = 'center'>

                            <h2>Predictions</h2>
                        </div>



                    {
                        details.list.filter(lis=> (lis.dt_txt === day1)||(lis.dt_txt === day2)||(lis.dt_txt === day3)||(lis.dt_txt === day4)||(lis.dt_txt === day5)).map (one =>

                        <div align = 'center'>



                            <br/>
                            {/* <p>{one.weather[0].icon}</p> */}
                            <img src = {`http://openweathermap.org/img/wn/${one.weather[0].icon}@2x.png`} />    

                            <p>{one.dt_txt}</p>
                           <p> {Math.round(one.main.temp - 273) }&#8451; </p>

                            <p>{one.wind.speed} m/s</p>

                            <p>{one.main.sea_level} hpa</p>
                            <br/><br/>

                        </div>
                        )

                        }
                            </div>
                        </div>

                )
                break;

            case DETAILS_FETCH_FAILED:
                el = (

                    <h1>
                        Details Fetching Failed
                    </h1>

                )
                break;

        }

        return(
            <div> 
                Hi Current Situation is 

                {el}

            </div>

        );
    }

    componentDidMount(){

        console.log("ComponentDidMount")

        this.setState(
            {
                status: DETAILS_FETCHING
            }
        );

        DetailsService.getDetails()
        .then((details) =>
        {   


            this.setState({
                details:details,
                status: DETAILS_FETCHED,
                
                })
        })
        .catch((error) =>

        {
            this.setState({
                error:error,
                details : null,
                status: DETAILS_FETCH_FAILED
            })

        })


    }


}

export default Details; 
 12  src/components/Home.js 
@@ -0,0 +1,12 @@
import React from 'react';
import Details from './Details';
function Home(props) {
    console.log("Home.js");
    return (
      <div>
        <Details />
      </div>  
    );
}

export default Home; 
 133  src/components/Settings.js 
@@ -0,0 +1,133 @@
import React, { Component } from 'react';
import '../App.css'

var plc = [];
class Settings extends Component {

    state =  {

        location : [],
        // place: {

        //     location : [],
        // }

    }    

    addPlaceRef = React.createRef();


        addLoca = ()=>{
            // console.log("asd ",this.props.state);
            // const places = {

            //     location : [],

            // }
            var noError = false;
            console.log(this.addPlaceRef.current.value.length > 2);
            if(this.addPlaceRef.current.value.length > 2){

                // places.location.push(this.addPlaceRef.current.value);
                // console.log(places.location);
                var mp = (this.addPlaceRef.current.value).toLowerCase();
                this.setState({
                    location : [
                        {name : mp}
                    ]
                })    
                noError = true;
            }

            if(noError){
                this.storeData(mp);

            }



        }


        storeData = (a) =>{
            console.log(a);
            localStorage.setItem(a,a);        


        }  

        render() {

            const {location} = this.state;
            let loca = location.length > 0 && location.map((item ) => {
                return (
                    <option  value={item.name}>{item.name}</option>
                )
            });


        return(

            <div align = "center">
                <form>

                <br/><br/><br/><br/><br/><br/>
                <div className = "one">


                Saved Location     <select id = "savedLocation">

                        {loca }
                    {/* <option value = ""></option>
                    <option value = "Delhi">Delhi</option>
                    <option value = "Hyderabad">Hyderabad</option>
                    <option value = "Mumbai">Mumbai</option>
                    <option value = "Agra">Agra</option> */}
                {/* localStorage.map(op => */}

                {/* <option value = {op.key}>{op.key}</option> */}

                {/* ) */}
              )  


                </select>

                <input type = "button"  value = "DELETE" />

                  </div>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className = "two">

                Add a new Location 
                <input type = "text" name = "place"id = "place"ref={this.addPlaceRef}  />

                <input type = "button" onClick = {this.addLoca} value = "ADD" />

                </div>        
                <br/><br/><br/>
            <div className = "three">

                Set Default Locaation 
                <select id = 'defaultLocation'>
                <option value = ""></option>
                    <option value = "Delhi">Delhi</option>
                    <option value = "Hyderabad">Hyderabad</option>
                    <option value = "Mumbai">Mumbai</option>
                    <option value = "Agra">Agra</option>
                </select>

                <input type = "button"  value = "SET" />
            </div>
                </form>
            </div>



        );


    }
}

export default Settings;
 8  src/index.js 
@@ -0,0 +1,8 @@
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
<BrowserRouter><App/></BrowserRouter>,document.getElementById('root')); 
 35  src/services/DetailsService.js 
@@ -0,0 +1,35 @@
import axios from 'axios';

export default class DetailsService {

    static baseURL = "https://api.openweathermap.org/data/2.5/forecast";

    // sample = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}"

    static getDetails(){

        // return axios.get("http://api.openweathermap.org/data/2.5/forecast?q=delhi,india&appid=f1cd6616ccdcfa3800aae838eaf73796")
        return axios.get(`${this.baseURL}/?q=delhi,india&appid=f1cd6616ccdcfa3800aae838eaf73796`)

        .then(function(response){

            console.log(response.data);
            console.log(response.data.list[0].weather[0].icon);

            // console.log(response.data.list[0].main.temp);

            return response.data;
        })
        .catch(function(error){

            console.log(error.message);
            throw error;

        })
    }





}