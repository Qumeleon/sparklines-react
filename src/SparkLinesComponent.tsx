import React, { useCallback, useEffect, useRef, useState } from 'react'

import {SparkLineColumnChart, SparkLineGraph, SparkLines, SparkLineWinLoss} from '@qumeleon/sparklines'
import type { IValues } from "@qumeleon/sparklines";
import type { ISparkLinesProps } from "@qumeleon/sparklines";

type SparkLineTypes = SparkLines | SparkLineColumnChart | SparkLineWinLoss | SparkLineGraph;

export const SparkLinesComponent: React.FC<{
    values: IValues
    settings: ISparkLinesProps
    type?: string
}> = ({ values, settings, type }) => {
    const containerEl = React.createRef<HTMLDivElement>()
    const [usedSettings, setUsedSettings] = useState<ISparkLinesProps>()
    const [usedValues, setUsedValues] = useState<IValues>()
    const sparkLines = useRef<SparkLineTypes | null>(null)

    const getType = useCallback((): SparkLineTypes => {
        switch (type) {
            case 'SparkLineColumnChart':
                return new SparkLineColumnChart({
                    ...settings,
                    width: settings.width ?? 100,
                    height: settings.height ?? 50,
                    color: settings.bars?.fill?.color ?? '#5fadf5'
                }, values)
            case 'SparkLineWinLoss':
                return new SparkLineWinLoss({
                    ...settings,
                    width: settings.width ?? 160,
                    height: settings.height ?? 40,
                    colorWin: settings.bars?.fill?.colorForPositiveValues ?? 'green',
                    colorLoss: settings.bars?.fill?.colorForNegativeValues ?? 'red'
                }, values)
            case 'SparkLineGraph':
                return new SparkLineGraph({
                    ...settings,
                    width: settings.width ?? 180,
                    height: settings.height ?? 60,
                    lineWidth: settings.line?.strokeWidth,
                    markers: {
                        color: settings.line?.dots?.fill?.color ?? 'blue'
                    }
                }, values)
            default:
                return sparkLines.current = new SparkLines()
        }
    }, [settings, type, values])


    const renderSparkLines = useCallback(
        (forceRerender: boolean) => {
            if (!containerEl.current) {
                throw new Error('Unexpected internal error')
            }
            if (!sparkLines.current || forceRerender) {
                if (forceRerender) {
                    containerEl.current.innerHTML = ''
                }
                sparkLines.current = getType()
                if (sparkLines.current instanceof SparkLines) {
                    sparkLines.current.setSettings(settings)
                    sparkLines.current.setValues(values)
                }
                const sparkLinesEl = sparkLines.current.render()
                containerEl.current.appendChild(sparkLinesEl)
            } else {
                // just trigger a rerender of the existing sparkline, it will rerender sparkLinesEl
                if (sparkLines.current instanceof SparkLines) {
                    sparkLines.current.setSettings(settings)
                    sparkLines.current.setValues(values)
                }
            }
        },
        [containerEl, getType, settings, values]
    )

    // only (re)render when settings or values changed
    // note that we use JSON.stringify for comparison because _.isEqual did not work
    // this could be caused by parent component creating and passing new objects somehow
    useEffect(() => {
        const settingsChanged = JSON.stringify(settings) !== JSON.stringify(usedSettings)
        const valuesChanged = JSON.stringify(usedValues) !== JSON.stringify(usedValues)
        if (containerEl.current && (settingsChanged || valuesChanged)) {
            setUsedSettings(settings)
            setUsedValues(values)
            renderSparkLines(settingsChanged)
        }
    }, [containerEl, renderSparkLines, settings, usedSettings, usedValues, values])

    return <div className="spark-lines-container" ref={containerEl} />
}

export default SparkLinesComponent
