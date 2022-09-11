import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
const Slider = () => {
    const STEP = 1;
    const MIN = 10;
    const MAX = 500;
    const [values, setValues] = useState([MIN, 100]);

    return (
        <div className="nav-slider">
            <span>Prix entre :</span>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={values => setValues(values)}
                renderTrack={({ props, children }) => (

                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            width: "50%"
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values,
                                    colors: ["#ccc", "#2CB1BA", "#ccc"],
                                    min: MIN,
                                    max: MAX
                                }),
                                alignSelf: "center"
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged, index }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "16px",
                            width: "16px",
                            borderRadius: "8px",
                            outline: "none",
                            border: isDragged ? null : "1px solid white",
                            backgroundColor: "#2cb1ba",

                        }}
                    >
                        <div style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "-8px",
                            fontSize: "12px",
                            backgroundColor: "#2cb1ba",
                            color: "white",
                            padding: "4px",
                        }} id="output">
                            {values[index] + "€"}
                        </div>
                    </div>
                )
                }
            />
        </div>
    );
};

export default Slider