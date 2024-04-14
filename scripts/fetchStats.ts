class Chart {
    constructor(ctx: CanvasRenderingContext2D, param2: {
        data: {
            datasets: { backgroundColor: string; borderColor: string; data: any; borderWidth: number; label: string }[];
            labels: any
        };
        options: {
            legend: { labels: { color: string; fontSize: number; fontWeight: string } };
            plugins: { legend: { labels: { color: string } } };
            scales: {
                x: { ticks: { color: string; font: { size: number; weight: string } } };
                y: { ticks: { color: string; font: { size: number; weight: string } }; beginAtZero: boolean }
            }
        };
        type: string
    }) {

    }

}

document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem("user")) {
        window.location.href = "login.html";
    }

    fetch('./data/statistics.json')
        .then(response => response.json())
        .then(data => {
            let dates = data.map((item: any) => item.date);
            let visitors = data.map((item: any) => item.visitors);

            // Get the canvas element and assert that the context will not be null
            let canvas = document.getElementById('visitorChart') as HTMLCanvasElement;
            let ctx = canvas.getContext('2d')!;

            // Ensure ctx is not null before using it
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
                                        size: 14, // Adjust font size as needed
                                        weight: 'bold' // Make the font bold
                                    },
                                    color: 'white' // Set font color to white
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 14, // Adjust font size as needed
                                        weight: 'bold' // Make the font bold
                                    },
                                    color: 'white' // Set font color to white
                                }
                            }
                        },
                        legend: {
                            labels: {
                                color: 'white', // Set font color to white
                                fontSize: 16, // Adjust font size as needed
                                fontWeight: 'bold' // Make the font bold
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white' // Set legend text color to white
                                }
                            }
                        }
                    }
                });
            } else {
                console.error('2D context not supported or canvas already initialized with a different context');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

