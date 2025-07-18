import React from "react";
import {SparkLinesComponent} from "./index";

function App() {
    return (
        <div className="main">
            <section>
                <h1>SparkLines</h1>
                <h2>Demos</h2>
                <article>
                    <h3>Line graph</h3>
                    <div style={{ width: 100, background: "#fff", padding: "5px" }}>
                        <SparkLinesComponent values={[1, 3, 9, -4, 7, 2, 12, 0, 1]} settings={{
                            width: 100,
                            height: 50,
                            line: {
                                fill: {
                                    color: 'gray'// any valid css color name or hex/rgb(a) code
                                }
                            }
                        }}/>
                    </div>
                    <h3>Column chart</h3>
                    <div style={{ width: 100, background: "#fff", padding: "5px" }}>
                        <SparkLinesComponent values={[8, 23, 9, -4, 7, 21, 4, 12]} settings={{
                            width: 100,
                            height: 50,
                            bars: {
                                fill: {
                                    color: '#5fadf5'// any valid css color name or hex/rgb(a) code
                                }
                            }
                        }} type={'SparkLineColumnChart'}/>
                    </div>
                    <h3>Win / loss</h3>
                    <div style={{ width: 100, background: "#fff", padding: "5px" }}>
                        <SparkLinesComponent values={[18, -3, 9, -4, 7, -21, 4, 12]} settings={{
                            width: 160,
                            height: 40,
                            bars: {
                                fill: {
                                    colorForPositiveValues: '#008700',// any valid css color name or hex/rgb(a) code
                                    colorForNegativeValues: '#c00000',
                                }
                            }
                        }} type={'SparkLineWinLoss'}/>
                    </div>
                    <h3>Line graph with markers (dots)</h3>
                    <div style={{ width: 100, background: "#fff", padding: "5px" }}>
                        <SparkLinesComponent values={[1, 3, 9, -4, 7, 2, 12, 0, 1]} settings={{
                            width: 180,
                            height: 60,
                            line: {
                                fill: {
                                    color: '#333'// any valid css color name or hex/rgb(a) code
                                },
                                strokeWidth: 1.67, // optional
                                dots: {
                                    fill: {
                                        color: 'blue', // any valid css color name or hex/rgb(a) code
                                    },
                                    size: 5
                                }
                            }
                        }} type={'SparkLineGraph'}/>
                    </div>
                </article>
                <article>
                    <h2>Documentation</h2>
                    <p>Coming soon, for now see README</p>
                </article>
            </section>
        </div>
    );
}

export default App;
