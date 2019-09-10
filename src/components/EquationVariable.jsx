import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class EquationVariable extends Component {
    render() {
        return (
            <div>
                <div style={{
                    textAlign: "left",
                    paddingLeft: "20px"
                }}>
                    {this.props.label}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    {
                        this.props.checkable ?
                            <Form.Check
                                checked={this.props.checked}
                                onChange={(e) => {
                                    if (this.props.checkCallback)
                                        this.props.checkCallback(this.props.label, e.target.checked)
                                }}
                            />
                            :
                            <></>
                    }
                    <Form.Control
                        value={this.props.value}
                        type="number"
                        min={this.props.min}
                        max={this.props.max}
                        onChange={(e) => {
                            if (this.props.valueCallback)
                                this.props.valueCallback(this.props.label, e.target.value)
                        }}
                    />
                </div>
            </div >
        );
    }
}

export default EquationVariable;
