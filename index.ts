declare var firebase;

var config = {
    apiKey: "AIzaSyAHVP-IXf_dMMjAPJipmiN0M4dZVmUUeVk",
    authDomain: "polo-crawler-f920e.firebaseapp.com",
    databaseURL: "https://polo-crawler-f920e.firebaseio.com/"
};
firebase.initializeApp(config);

firebase.database().ref("polo/site").once('value').then(function (data) {
    const obj = data.val();

    let elements = [];
    elements = elements.concat(Object.keys(obj).map(key => obj[key].elements));

    const htmlElements = Object.assign({}, ...elements);

    const tempData = [];

    var myBarChart = new Chart(
        document.getElementsByClassName("chart-1-canvas")[0] as HTMLCanvasElement,
        {
            type: 'horizontalBar',
            data: {
                labels: Object.keys(htmlElements).map(key => key),
                datasets: [{
                    label: "Html Element",
                    data: Object.keys(htmlElements).map(key => htmlElements[key])
                }]
            },
            options: {
                scales: {

                }
            }
        });

});