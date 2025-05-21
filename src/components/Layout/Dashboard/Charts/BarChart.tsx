"use client"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import moment from "moment"
import "moment/locale/pt-br"
import { useEffect, useState } from "react"
import * as drilldown from "highcharts/modules/drilldown"

moment.locale("pt-br")

type Transaction = {
  data: string // ISO 8601
  valor: number
}

interface BarChartProps {
  transactions: Transaction[]
}

interface SeriePrincipal {
  name: string
  y: number
  drilldown: string
}

interface DrilldownSerie {
  id: string
  name: string
  data: Array<{ name: string; y: number }>
}

export function BarChart({ transactions }: BarChartProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      return document.documentElement.classList.contains("dark")
    }

    setIsDark(checkDark())

    const observer = new MutationObserver(() => {
      setIsDark(checkDark())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof drilldown === "function") {
      drilldown(Highcharts)
    } else if (typeof (drilldown as any).default === "function") {
      (drilldown as any).default(Highcharts)
    }
  }, [])

  const agrupadoPorMes = transactions.reduce((acc, transacao) => {
    const mes = moment(transacao.data).format("YYYY-MM")
    if (!acc[mes]) acc[mes] = []
    acc[mes].push(transacao)
    return acc
  }, {} as Record<string, Transaction[]>)

  const meses = Object.keys(agrupadoPorMes)

  const textColor = isDark ? "#FFFFFF" : "#111111"
  const tooltipBackground = isDark ? "#222222" : "#f5f5f5"
  const tooltipText = isDark ? "#FFFFFF" : "#111111"

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      style: {
        fontFamily: "sans-serif",
        color: textColor,
      },
    },
    title: {
      text: "Gastos por período",
      style: { color: textColor },
    },
    xAxis: {
      type: "category",
      labels: {
        style: { color: textColor, textDecoration: "none" },
        useHTML: true,
        formatter: function () {
          return `<span style="color: ${textColor}; text-decoration:none;">${this.value}</span>`
        },
      },
    },
    yAxis: {
      title: { text: null, style: { color: textColor } },
      labels: {
        style: { color: textColor },
        formatter: function () {
          return `R$ ${this.value}`
        },
      },
      gridLineWidth: 1,
      gridLineColor: 'none',
    },
    tooltip: {
      backgroundColor: tooltipBackground,
      style: { color: tooltipText },
      pointFormat: "<b>R$ {point.y:.2f}</b>",
    },
    legend: { enabled: false },
    plotOptions: {
      column: {
        color: "#453EE3",
        borderRadius: 4,
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "R$ {point.y:.2f}",
          style: {
            color: textColor,
            textOutline: "none",
          },
        },
      },
    },
    series: [],
    drilldown: { series: [] },
    lang: {
      months: moment.months(),
      shortMonths: moment.monthsShort(),
      weekdays: moment.weekdays(),
    },
    credits: { enabled: false },
  }

  if (meses.length === 1) {
    const unicoMes = meses[0]
    const dias = agrupadoPorMes[unicoMes].reduce((acc, transacao) => {
      const dia = moment(transacao.data).format("DD")
      acc[dia] = (acc[dia] || 0) + transacao.valor
      return acc
    }, {} as Record<string, number>)

    chartOptions.series = [
      {
        type: "column",
        name: moment(unicoMes).format("MMM [de] YYYY"),
        data: Object.entries(dias).map(([name, y]) => ({ name, y })),
      } as Highcharts.SeriesColumnOptions
    ]
  } else {
    const seriePrincipal: SeriePrincipal[] = []
    const drilldowns: DrilldownSerie[] = []

    for (const mes of meses) {
      const nomeMes = moment(mes).format("MMM")
      const totalDoMes = agrupadoPorMes[mes].reduce((soma, t) => soma + t.valor, 0)

      seriePrincipal.push({
        name: nomeMes,
        y: totalDoMes,
        drilldown: mes,
      })

      const porDia = agrupadoPorMes[mes].reduce((acc, transacao) => {
        const dia = moment(transacao.data).format("DD")
        acc[dia] = (acc[dia] || 0) + transacao.valor
        return acc
      }, {} as Record<string, number>)

      drilldowns.push({
        id: mes,
        name: `Detalhes de ${nomeMes}`,
        data: Object.entries(porDia).map(([name, y]) => ({ name, y })),
      })
    }

    chartOptions.series = [
      {
        type: "column",
        name: "Meses",
        data: seriePrincipal,
      } as Highcharts.SeriesColumnOptions
    ]
    
    chartOptions.drilldown = { 
      series: drilldowns.map(d => ({
        type: "column",
        id: d.id,
        name: d.name,
        data: d.data
      })) as Highcharts.SeriesOptionsType[]
    }
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />
}