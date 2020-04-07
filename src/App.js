import React from 'react';
import { BrowserRouter as Rooter, Switch, NavLink, Route } from 'react-router-dom'
import Judete from './Judete'
import JudeteTabel from './JudeteTabel'
import Moment from 'react-moment';
// import MyChartGender from './RaportGender';
class App extends React.Component {
  // Color themes
  // E12B38 
  // DE8152
  // DBA985
  // 768881
  // 4C8D7B
  constructor() {
    super();
    this.state = {
      data: [],
      dataRaport: [],
      loaded: false,
      loadedRaport: false,
      loadedRaportGender: false,
      dataGender: [],
      updated: '',
      filter: false,
      citySelected: '',
      updateTime: 300000,
      newCase: false
    }
    this.setFilterRaport = this.setFilterRaport.bind(this)
  }
  async getRaport() {
    await fetch('https://covid19.geo-spatial.org/api/dashboard/getDailyCaseReport')
      .then(resp => resp.json())
      .then(data => this.setState({ dataRaport: data.data, loadedRaport: true }))
      .catch(e => {
        alert(e)
      });
  }
  // async getRaportGender() {
  //   await fetch('https://covid19.geo-spatial.org/api/dashboard/getPercentageByGendert')
  //     .then(resp => resp.json())
  //     .then(data => this.setState({ loadedRaportGender: data.data, loadedRaportGender: true }))
  // }
  async  getCountry() {
    await fetch('https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty')
      .then(response => response.json())
      .then(data => {
        const d = new Date();
        this.setState({
          data: data,
          loaded: true,
          updated: d.getTime(),
        })
      })
      .catch(e => alert(e))
  }
  async componentDidMount() {
    this.getRaport();
    this.getCountry();
    // this.getRaportGender();
    try {
      setInterval(async () => {
        this.getCountry();
        this.getRaport();
      }, this.state.updateTime)
    } catch (e) {
      alert(e)
    }
  }
  setFilter = (e) => {
    if (e.target.value === 'ALL') {
      this.setState({
        citySelected: e.target.value,
        filter: false
      })
    } else {
      this.setState({
        citySelected: e.target.value,
        filter: true
      })
    }
  }
  setFilterRaport(e) {
    this.setState({
      newCase: JSON.parse(e.target.value)
    })
  }
  renderCountry = () => {
    if (this.state.data !== undefined) {
      if (this.state.filter) {
        return this.state.data.data.data.filter(filter => filter.county === this.state.citySelected.toUpperCase()).map(i => {
          return (
            <div className="grid">
              <div className="col">
                {i.county}
              </div>
              <div className="col">
                {i.total_county}
              </div>
              <div className="col d">
                {i.total_dead}
              </div>
              <div className="col h">
                {i.total_healed}
              </div>
            </div>
          )
        })
      } else {
        return this.state.data.data.data.map(i => {
          return (
            <div className="grid" key={Math.random()}>
              <div className="col">
                {i.county}
              </div>
              <div className="col">
                {i.total_county}
              </div>
              <div className="col d">
                {i.total_dead}
              </div>
              <div className="col h">
                {i.total_healed}
              </div>
            </div>
          )
        })
      }
    }
  }
  render() {
    return (
      <Rooter>
        <div className="App" >
          <div className="header">
            <div className="container">
              <h1>CovidRO</h1>
              <p>Rapoarte si statistici despre Covid19</p>
            </div>
            <nav>
              <div className="container">
                <ul>
                  <NavLink activeClassName="selected" exact to={'/judete'}>
                    <li>Raport judete</li>
                  </NavLink  >
                  <NavLink activeClassName="selected" exact to={'/'}>
                    <li>Raport grafic</li>
                  </NavLink >
                </ul>
              </div>
            </nav>
          </div>
          <Switch>
            <Route path='/' exact component={() => <Judete onFilter={this.setFilterRaport} data={this.state} />} />
            <Route path='/judete' component={() => <JudeteTabel onFilter={this.setFilter} render={this.renderCountry} onFilter={this.setFilter} data={this.state} />} />
          </Switch>
          <div className="filter">
            <div className="container" align="center">
              <p> Actualizare automata la 5m
              <br />Ultima actualizare: {this.state.loaded ? <Moment format="HH:mm:ss / DD-MM-YYYY ">{this.state.updated}</Moment> : ''}</p>
              <p className="credits"> App by T.Valentin, Credits: Coronavirus COVID-19 România <br />Sugestii trutzzi@yahoo.ro</p>
            </div>
          </div>
        </div >
      </Rooter >
    );
  }
}
export default App;
