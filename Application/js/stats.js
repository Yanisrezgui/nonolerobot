let lineChartData = {
  labels: [],
  data: [],
};

if (localStorage.getItem("statistics") !== null) {
    let stats = JSON.parse(localStorage.getItem("statistics"));
    let maxCherries = Math.max(...stats.cherries);
    let minuteCount = Math.floor(stats.cherries.length / 6);

    let data = stats.cherries.map((cherries) => {
        return cherries;
    });

    for (let minute = 0; minute <= minuteCount; minute++) {
        for (let seconde = 0; seconde < 60; seconde += 10) {
            let time = minute.toString().padStart(1, "0") + ":" + seconde.toString().padStart(2, "0");
            lineChartData.labels.push(time);
        }
    }
    
    const ctx = document.getElementById("myChart");
    let chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: lineChartData.labels,
        datasets: [{
            labels: "cerises récoltées",
            data: data,
            backgroundColor: 'rgba(0, 119, 204, 0.8)',
            hoverOffset: 4
        }],
      },
      options: {
        plugins: {
            title: {
              display: true,
              text: 'Nombre de cerises récoltées',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: maxCherries + 5,
          },
        },
      },
    });

    ctx.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';

    document.getElementById("reset").addEventListener("click", () => {
        if (chart) {
            chart.update();
            localStorage.clear('statistics');
        }
    })
} else {
    document.getElementById("reset").style.display = 'none';
}
