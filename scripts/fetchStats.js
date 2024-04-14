"use strict";
class Chart {
    constructor(ctx, param2) {
    }
}
document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("user")) {
        window.location.href = "login.html";
    }
    fetch('./data/statistics.json')
        .then(response => response.json())
        .then(data => {
        let dates = data.map((item) => item.date);
        let visitors = data.map((item) => item.visitors);
        let canvas = document.getElementById('visitorChart');
        let ctx = canvas.getContext('2d');
        if (ctx) {
            let visitorChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                            label: 'Visitors',
                            data: visitors,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: 'white'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: 'white'
                            }
                        }
                    },
                    legend: {
                        labels: {
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    }
                }
            });
        }
        else {
            console.error('2D context not supported or canvas already initialized with a different context');
        }
    })
        .catch(error => console.error('Error fetching data:', error));
});
//# sourceMappingURL=fetchStats.js.map