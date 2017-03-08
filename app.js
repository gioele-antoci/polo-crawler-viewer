const debug = true;
if (!debug) {
    var config = {
        apiKey: "AIzaSyAHVP-IXf_dMMjAPJipmiN0M4dZVmUUeVk",
        authDomain: "polo-crawler-f920e.firebaseapp.com",
        databaseURL: "https://polo-crawler-f920e.firebaseio.com/"
    };
    firebase.initializeApp(config);
}
const render = (obj) => {
    window.obj = obj;
    let elements = [];
    elements = elements.concat(Object.keys(obj).map(key => obj[key].elements));
    const objs = {};
    elements.forEach(x => {
        Object.keys(x || {}).forEach(key => {
            objs[key] ? objs[key] += x[key] : objs[key] = x[key];
        });
    });
    const htmlElements = Object.keys(objs)
        .filter(key => objs[key] > elements.length) //filter out rare  elements 
        .map(key => {
        return [key, Math.ceil(objs[key] / elements.length)];
    })
        .sort((a, b) => b[1] - a[1]);
    document.getElementsByClassName("chart-label")[0].textContent = `This chart represents the average count of HTML elements per website. ${elements.length} websites were crawled.`;
    const myBarChart = new Chart(document.getElementsByClassName("chart-1-canvas")[0], {
        type: 'bar',
        data: {
            labels: htmlElements.map(x => x[0]),
            datasets: [{
                    backgroundColor: "#2196F3",
                    data: htmlElements.map(x => x[1])
                }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        gridLines: false,
                        ticks: {
                            autoSkip: false
                        }
                    }
                ],
                yAxes: [
                    {
                        type: "logarithmic",
                        ticks: {
                            callback: (el) => {
                                return el;
                            }
                        }
                    }
                ]
            },
            legend: {
                display: false,
            }
        }
    });
};
if (!debug) {
    firebase.database().ref("polo/site").once('value').then((data) => {
        const obj = data.val();
        render(obj);
    });
}
else {
    fetch("data.json").then(resp => resp.json().then(json => render(json.polo.site)));
}
//# sourceMappingURL=app.js.map