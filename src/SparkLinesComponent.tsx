import React, { useCallback, useEffect, useRef, useState } from 'react'

import { SparkLines } from '@qumeleon/sparklines'
import type { IValues } from "@qumeleon/sparklines";
import type { ISparkLinesProps } from "@qumeleon/sparklines";

export const SparkLinesComponent: React.FC<{
    values: IValues
    settings: ISparkLinesProps
}> = ({ values, settings }) => {
    const containerEl = React.createRef<HTMLDivElement>()
    const [usedSettings, setUsedSettings] = useState<ISparkLinesProps>()
    const [usedValues, setUsedValues] = useState<IValues>()
    const sparkLines = useRef<SparkLines>(null)

    const renderSparkLines = useCallback(
        (forceRerender: boolean) => {
            if (!containerEl.current) {
                throw new Error('Unexpected internal error')
            }
            if (!sparkLines.current || forceRerender) {
                if (forceRerender) {
                    containerEl.current.innerHTML = ''
                }
                sparkLines.current = new SparkLines()
                sparkLines.current.setSettings(settings)
                sparkLines.current.setValues(values)
                const sparkLinesEl = sparkLines.current.render()
                containerEl.current.appendChild(sparkLinesEl)
            } else {
                // just trigger a rerender of the existing sparkline, it will rerender sparkLinesEl
                sparkLines.current.setSettings(settings)
                sparkLines.current.setValues(values)
            }
        },
        [containerEl, settings, values]
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
