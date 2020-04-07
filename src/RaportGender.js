import React from 'react'
import { Chart } from 'react-charts'
const defs = (
    <defs>
        <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#E12B38" />
            <stop offset="100%" stopColor="#E12B38" />
        </linearGradient>
        <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#15ffbe" />
            <stop offset="100%" stopColor="#15ffbe" />
        </linearGradient>
        <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#DE8152" />
            <stop offset="100%" stopColor="#DE8152" />
        </linearGradient>
    </defs>
)
export default function MyChartGender(props) {
    const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1
    })
    const getSeriesStyle = React.useCallback(
        series => ({
            color: `url(#${series.index % 3})`,
            opacity:
                activeSeriesIndex > -1
                    ? series.index === activeSeriesIndex
                        ? 1
                        : 0.3
                    : 1
        }),
        [activeSeriesIndex]
    )
    const getDatumStyle = React.useCallback(
        datum => ({
            r:
                activeDatumIndex === datum.index &&
                    activeSeriesIndex === datum.seriesIndex
                    ? 7
                    : activeDatumIndex === datum.index
                        ? 5
                        : datum.series.index === activeSeriesIndex
                            ? 3
                            : datum.otherHovered
                                ? 2
                                : 2
        }),
        [activeDatumIndex, activeSeriesIndex]
    )
    const onFocus = React.useCallback(
        focused =>
            setState({
                activeSeriesIndex: focused ? focused.series.id : -1,
                activeDatumIndex: focused ? focused.index : -1
            }),
        [setState]
    )
    let items2 = [
        {
            label: 'Decedati',
            data: []
        },
        {
            label: 'Isanatositi',
            data: []
        },
        {
            label: 'Infectati',
            data: []
        },
    ]
    console.log(props.data.data)
    props.data.data.map(i => items2[0].data.push([i.day_case, i.total_dead]))
    props.data.data.map(i => items2[1].data.push([i.day_case, i.total_healed]))
    props.data.data.map(i => items2[2].data.push([i.day_case, i.total_case]))
    const data = React.useMemo(
        () => items2
        ,
        []
    )
    const series = React.useMemo(
        () => ({
            showPoints: true
        }),
    )
    const axes = React.useMemo(
        () => [
            { primary: true, position: 'bottom', type: 'ordinal' },
            { type: 'linear', position: 'left' }],
        []
    )
    console.log(items2)
    const lineChart = (
        // A react-chart hyper-responsively and continuusly fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '100%',
                height: '400px'
            }}
        >
            <Chart series={series}
                data={data}
                axes={axes}
                tooltip
                getSeriesStyle={getSeriesStyle}
                getDatumStyle={getDatumStyle}
                onFocus={onFocus}
                renderSVG={() => defs}
            />
        </div>
    )
    return lineChart
}