import React, { useEffect } from 'react'
import "./DynamicYesNo.css"

const DynamicYesNo = (props) => {

    useEffect(() => {
        // Set default value to "No" if not already set
        if (!props.values[props.name]) {
            props.handleChange({ target: { name: props.name, value: "No" } });
        }
    }, [props.name, props.values, props.handleChange]);

    let label = props.label || { left: "Yes", Right: "No" }
    let setValue = props.setValue || { left: "yes", Right: "no" }

    return (
        <div className="form-check w-100 form-switch position-relative m-0 p-0 col-md-12 QuestionYesNoCenter">
            <div className="radioButton2 border">
                <input
                    type="radio"
                    name={props.name}
                    id={`${props.name}1`}
                    value={setValue.left}
                    onChange={props.handleChange}
                    checked={props.values[props.name] === setValue.left}
                    className='NoInput'
                />
                <label
                    htmlFor={`${props.name}1`}
                    className="tableNoLabel"
                >
                    <span style={{fontWeight:500}}>{label.left}</span>
                </label>
                <input
                    type="radio"
                    name={props.name}
                    id={`${props.name}2`}
                    value={setValue.Right}
                    onChange={props.handleChange}
                    checked={props.values[props.name] === setValue.Right}
                    className='YesInput'
                />
                <label
                    htmlFor={`${props.name}2`}
                    className="tableYesLabel"
                >
                    <span style={{fontWeight:500}}>{label.Right}</span>
                </label>
            </div>

        </div>
    )
}

export default DynamicYesNo
