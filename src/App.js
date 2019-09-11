import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import EquationVariable from './components/EquationVariable'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cubesRed: 1,
      cubesRedChecked: true,
      selFactorRed: .25,
      selFactorRedChecked: false,
      towerSelChecked: false,
      cubesBlue: 1,
      selFactorBlue: 1,
      towerSel: 1
    }

  }

  render() {
    var towerSel = this.state.towerSel;
    var selFactorRed = this.state.selFactorRed
    var selFactorBlue = this.state.selFactorBlue
    if (towerSel < 0) {
      towerSel = 0;
      selFactorRed = 0;
      selFactorBlue = 0;
    }
      
    var result = (this.state.cubesRed + Math.floor(selFactorRed * (this.state.cubesRed * (towerSel)))) - (this.state.cubesBlue + Math.floor(selFactorBlue * (this.state.cubesBlue * (towerSel))));
    console.log((this.state.cubesRed + (selFactorRed * (this.state.cubesRed * (towerSel)))))
    console.log((this.state.cubesBlue + (selFactorBlue * (this.state.cubesBlue * (towerSel)))))
    console.log(this.state.cubesBlue);
    console.log((selFactorBlue * (this.state.cubesBlue * (towerSel))))

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
              <div className="row justify-content-md-center">
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesRed}
                    checkCallback={(title, checked) => {
                      this.setState({ cubesRedChecked: true, selFactorRedChecked: false, towerSelChecked: false })
                    }}
                    valueCallback={(title, cubesRed) => {
                      this.setState({ cubesRed: parseFloat(cubesRed) })
                    }}
                    checkable={true}
                    checked={this.state.cubesRedChecked}
                    min={1}
                    label="Red cubes"
                  />
                </div>
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesRed / this.state.cubesBlue}
                    valueCallback={(title, percentage) => {
                      this.setState({ cubesRed: this.state.cubesBlue * parseFloat(percentage)})
                    }}
                    label="Red cubes (as % of blue)"
                  />
                  <EquationVariable
                    value={this.state.cubesRed / 105}
                    valueCallback={(title, permin) => {
                      this.setState({ cubesRed: 105 * parseFloat(permin)})
                    }}
                    label="Red cubes (as cubes/sec)"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
            <div className="row justify-content-md-center">
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesBlue}
                    checkCallback={(title, checked) => {
                      this.setState({ cubesRedChecked: true, selFactorRedChecked: false, towerSelChecked: false })
                    }}
                    valueCallback={(title, cubesBlue) => {
                      this.setState({ cubesBlue: parseFloat(cubesBlue) })
                    }}
                    checkable={true}
                    checked={this.state.cubesRedChecked}
                    min={1}
                    label="Blue cubes"
                  />
                </div>
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesBlue / this.state.cubesRed}
                    valueCallback={(title, percentage) => {
                      this.setState({ cubesBlue: this.state.cubesRed * percentage})
                    }}
                    label="Blue cubes (as % of red)"
                  />
                  <EquationVariable
                    value={this.state.cubesBlue / 105}
                    valueCallback={(title, permin) => {
                      this.setState({ cubesBlue: 105 * parseFloat(permin)})
                    }}
                    label="Blue cubes (as cubes/sec)"
                  />
                </div>
              </div>
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
                  this.setState({ selFactorRed: parseFloat(selFactorRed) })
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
                  this.setState({ selFactorBlue: parseFloat(selFactorBlue) })
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
                  this.setState({ towerSel: parseFloat(towerSel) })
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
            [<b>CubesRed</b> + floor(<b>SelFactorRed</b> * (<b>CubesRed</b> * <b>TowerCubes</b>) )] - [<b>CubesBlue</b> + floor(<b>SelFactorBlue</b> * (<b>CubesBlue</b> * <b>TowerCubes</b>) )]
            <br />
            [<b>{this.state.cubesRed}</b> + (<b>{this.state.selFactorRed}</b> * (<b>{this.state.cubesRed}</b> * (<b>{this.state.towerSel}</b> - 1)))] - [<b>{this.state.cubesBlue}</b> + (<b>{this.state.selFactorBlue}</b> * (<b>{this.state.cubesBlue}</b> * (<b>{this.state.towerSel}</b> - 1)))]
            {
              this.state.towerSel-1 < 0 ?
              <>
                <br/>
                *Ignoring points from towers as tower cubes is 0
              </>
              :
              <></>
            }
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
