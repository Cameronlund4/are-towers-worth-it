import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import EquationVariable from './components/EquationVariable'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cubesRed: 0,
      cubesRedChecked: true,
      selFactorRed: .25,
      selFactorRedChecked: false,
      towerSelChecked: false,
      cubesBlue: 0,
      selFactorBlue: 1,
      towerSel: 1
    }

  }

  render() {
    var result = (this.state.cubesRed + (this.state.selFactorRed * (this.state.cubesRed * (this.state.towerSel - 1)))) - (this.state.cubesBlue + (this.state.selFactorBlue * (this.state.cubesBlue * (this.state.towerSel - 1))));

    return (
      <div style={{
        margin: "20px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}>

        <h2>Are towers worth it?</h2>
        <h5>A simple calculator to help model an answer to that question</h5>

        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-sm-6">
              <EquationVariable
                value={this.state.cubesRed}
                checkCallback={(title, checked) => {
                  this.setState({ cubesRedChecked: true, selFactorRedChecked: false, towerSelChecked: false })
                }}
                valueCallback={(title, cubesRed) => {
                  this.setState({ cubesRed })
                }}
                checkable={true}
                checked={this.state.cubesRedChecked}
                label="Red cubes"
              />
            </div>
            <div className="col-sm-6">
              <EquationVariable
                value={this.state.cubesBlue}
                checkCallback={(title, checked) => {
                  this.setState({ cubesRedChecked: true, selFactorRedChecked: false, towerSelChecked: false })
                }}
                valueCallback={(title, cubesBlue) => {
                  this.setState({ cubesBlue })
                }}
                checkable={true}
                checked={this.state.cubesRedChecked}
                label="Blue cubes"
              />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm-6">
              <EquationVariable
                value={this.state.selFactorRed}
                checkCallback={(title, checked) => {
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: true, towerSelChecked: false })
                }}
                valueCallback={(title, selFactorRed) => {
                  this.setState({ selFactorRed })
                }}
                checkable={true}
                checked={this.state.selFactorRedChecked}
                label="Red selection factor [0-1]"
                min={0}
                max={1}
              />
            </div>
            <div className="col-sm-6">
              <EquationVariable
                value={this.state.selFactorBlue}
                checkCallback={(title, checked) => {
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: true, towerSelChecked: false })
                }}
                valueCallback={(title, selFactorBlue) => {
                  this.setState({ selFactorBlue })
                }}
                checkable={true}
                checked={this.state.selFactorRedChecked}
                label="Blue selection factor [0-1]"
                min={0}
                max={1}
              />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm-6">
              <EquationVariable
                value={this.state.towerSel}
                checkCallback={(title, checked) => {
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: false, towerSelChecked: true })
                }}
                valueCallback={(title, towerSel) => {
                  this.setState({ towerSel })
                }}
                checkable={true}
                checked={this.state.towerSelChecked}
                label="Tower cubes"
              />
            </div>
            <div className="col-sm-6" />
          </div>
        </div>

        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>
          <hr style={{ width: "100%" }} />
          <div style={{ width: "80%" }}>
            [Points scored by red] - [Points scored by blue]
            <br />
            [Red points from cubes + Red points from towers] - [Blue points from cubes + Blue points from towers]
            <br />
            [<b>CubesRed</b> + (<b>SelFactorRed</b> * (<b>CubesRed</b> * (<b>TowerSel</b> - 1)) )] - [<b>CubesBlue</b> + (<b>SelFactorBlue</b> * (<b>CubesBlue</b> * (<b>TowerSel</b> - 1)) )]
            <br />
            [<b>{this.state.cubesRed}</b> + (<b>{this.state.selFactorRed}</b> * (<b>{this.state.cubesRed}</b> * (<b>{this.state.towerSel}</b> - 1)))] - [<b>{this.state.cubesBlue}</b> + (<b>{this.state.selFactorBlue}</b> * (<b>{this.state.cubesBlue}</b> * (<b>{this.state.towerSel}</b> - 1)))]
            <br />
            {result}
            <br /><br />
            <h5>{result > 0 ? "Red wins!" : (result < 0 ? "Blue wins!" : "Tie!")}</h5>
          </div>
          <hr style={{ width: "100%" }} />
        </div>
      </div >
    );
  }
}

export default App;
