import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import EquationVariable from './components/EquationVariable'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryVoronoiContainer } from 'victory';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cubesRed: 1,
      cubesRedChecked: true,
      cubesBlueChecked: false,
      selFactorRed: .25,
      selFactorRedChecked: false,
      selFactorBlueChecked: false,
      towerSelChecked: false,
      cubesBlue: 1,
      selFactorBlue: 1,
      towerSel: 1
    }

  }

  calculateData = () => {
    var dataRed = [];
    var dataBlue = [];
    var label = "Label not filled"

    if (this.state.cubesBlueChecked || this.state.cubesRedChecked) {
      label = (this.state.cubesBlueChecked ? "Blue" : "Red") + " Cubes"
      for (var i = 0; i < 100; i++) {
        var datum;

        if (this.state.cubesBlueChecked)
          datum = this.calculateDifference({ cubesBlue: i })
        else
          datum = this.calculateDifference({ cubesRed: i })

        if (datum > 0)
          dataRed.push({ x: i, y: datum, lbl: "Red wins!\n" + label + ": " + i })
        else if (datum < 0)
          dataBlue.push({ x: i, y: datum, lbl: "Blue wins!\n" + label + ": " + i })
        else
          dataBlue.push({ x: i, y: datum, lbl: "Tie!\n" + label + ": " + i })
      }
    }

    if (this.state.selFactorBlueChecked || this.state.selFactorRedChecked) {
      label = (this.state.selFactorBlueChecked ? "Blue" : "Red") + "  Factor"
      for (var i = 0; i < 1000; i++) {
        var datum;

        if (this.state.selFactorBlueChecked)
          datum = this.calculateDifference({ selFactorBlue: i / 1000 })
        else
          datum = this.calculateDifference({ selFactorRed: i / 1000 })

        if (datum > 0)
          dataRed.push({ x: i, y: datum, lbl: "Red wins!\n" + label + ": " + i / 1000 })
        else if (datum < 0)
          dataBlue.push({ x: i, y: datum, lbl: "Blue wins!\n" + label + ": " + i / 1000 })
        else
          dataBlue.push({ x: i, y: datum, lbl: "Tie!\n" + label + ": " + i })
      }
    }

    if (this.state.towerSelChecked) {
      label = "Cubes of selected in tower"
      for (var i = 0; i < 10; i++) {
        var datum = this.calculateDifference({ towerSel: i })

        if (datum > 0)
          dataRed.push({ x: i, y: datum, lbl: "Red wins!\n" + label + ": " + i })
        else if (datum < 0)
          dataBlue.push({ x: i, y: datum, lbl: "Blue wins!\n" + label + ": " + i })
        else
          dataBlue.push({ x: i, y: datum, lbl: "Tie!\n" + label + ": " + i })
      }
    }

    if (dataRed[0] && dataBlue[0] && dataRed[0].x < dataBlue[0].x) {
      dataRed.push(dataBlue[0]);
    } else if (dataRed[0] && dataBlue[0] && dataBlue[0].x < dataRed[0].x) {
      dataBlue.push(dataRed[0]);
    }

    return [dataRed, dataBlue, label];
  }

  calculateDifference = (data) => {
    data = Object.assign(Object.assign({}, this.state), data);
    return (data.cubesRed + Math.floor(data.selFactorRed * (data.cubesRed * (data.towerSel)))) - (data.cubesBlue + Math.floor(data.selFactorBlue * (data.cubesBlue * (data.towerSel))))
  }

  render() {
    var result = this.calculateDifference();

    var dataRaw = this.calculateData();
    var dataRed = dataRaw[0];
    var dataBlue = dataRaw[1];
    var xAxisLabel = dataRaw[2];

    return (
      <div style={{
        margin: "20px",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        display: "flex"
      }}>

        <h2>Are towers worth it?</h2>
        <h5>A simple calculator to help model an answer to that question</h5>
        <a href="#" onClick={() => this.setState({modalHidden: false})}>[Re show info]</a>
        <br />
        
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-sm-6">
              <div className="row justify-content-md-center">
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesRed}
                    checkCallback={(title, checked) => {
                      this.setState({ cubesRedChecked: true, selFactorRedChecked: false, towerSelChecked: false, cubesBlueChecked: false, selFactorBlueChecked: false })
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
                      this.setState({ cubesRed: this.state.cubesBlue * parseFloat(percentage) })
                    }}
                    label="Red cubes (as % of blue)"
                  />
                  <EquationVariable
                    value={this.state.cubesRed / 105}
                    valueCallback={(title, permin) => {
                      this.setState({ cubesRed: 105 * parseFloat(permin) })
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
                      this.setState({ cubesRedChecked: false, selFactorRedChecked: false, towerSelChecked: false, cubesBlueChecked: true, selFactorBlueChecked: false })
                    }}
                    valueCallback={(title, cubesBlue) => {
                      this.setState({ cubesBlue: parseFloat(cubesBlue) })
                    }}
                    checkable={true}
                    checked={this.state.cubesBlueChecked}
                    min={1}
                    label="Blue cubes"
                  />
                </div>
                <div className="col-sm-6">
                  <EquationVariable
                    value={this.state.cubesBlue / this.state.cubesRed}
                    valueCallback={(title, percentage) => {
                      this.setState({ cubesBlue: this.state.cubesRed * percentage })
                    }}
                    label="Blue cubes (as % of red)"
                  />
                  <EquationVariable
                    value={this.state.cubesBlue / 105}
                    valueCallback={(title, permin) => {
                      this.setState({ cubesBlue: 105 * parseFloat(permin) })
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
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: true, towerSelChecked: false, cubesBlueChecked: false, selFactorBlueChecked: false })
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
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: false, towerSelChecked: false, cubesBlueChecked: false, selFactorBlueChecked: true })
                }}
                valueCallback={(title, selFactorBlue) => {
                  this.setState({ selFactorBlue: parseFloat(selFactorBlue) })
                }}
                checkable={true}
                checked={this.state.selFactorBlueChecked}
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
                  this.setState({ cubesRedChecked: false, selFactorRedChecked: false, towerSelChecked: true, cubesBlueChecked: false, selFactorBlueChecked: false })
                }}
                valueCallback={(title, towerSel) => {
                  this.setState({ towerSel: parseFloat(towerSel) })
                }}
                checkable={true}
                checked={this.state.towerSelChecked}
                label="Tower cubes"
                min={0}
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
              this.state.towerSel - 1 < 0 ?
                <>
                  <br />
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

        <div style={{ boxSizing: "border-box", width: "30%", flex: 1 }}>
          <VictoryChart
            domainPadding={20}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.lbl}`}
              />
            }
          >
            <VictoryAxis
              label={xAxisLabel}
            />
            <VictoryAxis
              dependentAxis
              label="Differential"
            />
            <VictoryLine
              style={{
                data: { stroke: "#c62828" },
                parent: { border: "1px solid #ccc" }
              }}
              data={dataRed}
            />
            <VictoryLine
              style={{
                data: { stroke: "#1565c0" },
                parent: { border: "1px solid #ccc" }
              }}
              data={dataBlue}
            />
          </VictoryChart>
        </div>

        <Modal centered show={!this.state.modalHidden} onHide={() => this.setState({ modalHidden: true })}>
          <Modal.Header closeButton>
            <Modal.Title>Usage Notes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This calculator looks at a theoretical situation where there is a certain amount of one color cube being placed in the towers. This color is considered the "selected" color cube.</p>
            <br />
            <p>The "cubes" field is the number of cubes that the robot can score in a match. The "as % of x" and "as cubes/sec" fields are ways to fill out the "cubes" field in a way that may make more sense for different scenarios. For example, you could fill out the "Red cubes" field with the number of cubes your robot could score, and then if you think an opponent robot that picks out a certain color would be about 20% slower than your bot, you could fill in "0.8" for the "Blue Cubes (as % of red)" field.</p>
            <br />
            <p>The "selection factor" field represents the percentage of cubes that a certain robot picks up that are the color cube in the tower. For example, if the color cube in the tower is purple, and a robot picks up 10 cubes, 5 of which are purple, its selection factor would be 0.5.</p>
            <br />
            <p>The "tower cubes" field represents the number of cubes in the tower for the theoretical selected color.</p>
            <br />
            <p>The check boxes can be used to select which field will be used as the x axis for the graph at the bottom. The graph will represent the equation as a function of that variable, allowing you to see which values would allow red to win and which values would allow blue to win, assuming all of the other set variables.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.setState({ modalHidden: true })} variant="primary">Let's go!</Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default App;
