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
export default function MyChart(props) {
    const [{ activeSeriesIndex, activeDatumIndex, activeSeriesIndex2, activeDatumIndex2 }, setState] = React.useState({
        activeSeriesIndex: -1,
        activeDatumIndex: -1,
        activeSeriesIndex2: -1,
        activeDatumIndex2: -1
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
    const getSeriesStyle2 = React.useCallback(
        series2 => ({
            color: `url(#${series2.index % 3})`,
            opacity:
                activeSeriesIndex2 > -1
                    ? series2.index === activeSeriesIndex2
                        ? 1
                        : 0.3
                    : 1
        }),
        [activeSeriesIndex2]
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
    const getDatumStyle2 = React.useCallback(
        datum => ({
            r:
                activeDatumIndex2 === datum.index &&
                    activeSeriesIndex2 === datum.seriesIndex
                    ? 7
                    : activeDatumIndex2 === datum.index
                        ? 5
                        : datum.series.index2 === activeSeriesIndex
                            ? 3
                            : datum.otherHovered2
                                ? 2
                                : 2
        }),
        [activeDatumIndex2, activeSeriesIndex2]
    )
    const onFocus = React.useCallback(
        focused =>
            setState({
                activeSeriesIndex: focused ? focused.series.id : -1,
                activeDatumIndex: focused ? focused.index : -1
            }),
        [setState]
    )
    const onFocus2 = React.useCallback(
        focused2 =>
            setState({
                activeSeriesIndex2: focused2 ? focused2.series.id : -1,
                activeDatumIndex2: focused2 ? focused2.index : -1
            }),
        [setState]
    )
    let items = [
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
    props.data.data.map(i => items[0].data.push([i.day_case, i.new_dead_no]))
    props.data.data.map(i => items[1].data.push([i.day_case, i.new_healed_no]))
    props.data.data.map(i => items[2].data.push([i.day_case, i.new_case_no]))
    props.data.data.map(i => items2[0].data.push([i.day_case, i.total_dead]))
    props.data.data.map(i => items2[1].data.push([i.day_case, i.total_healed]))
    props.data.data.map(i => items2[2].data.push([i.day_case, i.total_case]))
    const data = React.useMemo(
        () => items2
        ,
        []
    )
    const data2 = React.useMemo(
        () => items
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
    const lineChart = (
        <div className="chartRaport"
            style={{
                width: '100%',
                height: '400px'
            }}
        >
            {props.newCase
                ?
                <Chart series={series}
                    data={data2}
                    axes={axes}
                    tooltip
                    getSeriesStyle={getSeriesStyle2}
                    getDatumStyle={getDatumStyle2}
                    onFocus={onFocus2}
                    renderSVG={() => defs}
                />
                :
                <Chart series={series}
                    data={data}
                    axes={axes}
                    tooltip
                    getSeriesStyle={getSeriesStyle}
                    getDatumStyle={getDatumStyle}
                    onFocus={onFocus}
                    renderSVG={() => defs}
                />
            }


        </div>
    )
    return lineChart
}