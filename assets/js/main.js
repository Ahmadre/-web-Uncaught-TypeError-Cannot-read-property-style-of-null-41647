document.onkeydown = (e) => {
    e = e || window.event;
    try {
        onKey(e.keyCode);
    } catch (error) {
        if (error.toString().includes('ReferenceError')) {
            return;
        }
        throw error;
    }
};

getLocale = () => {
    return window.navigator.language;
}

launchURL = (url, target) => {
    window.open(url, target);
}

download = (filename, base64) => {
    var a = document.createElement("a");

    a.download = filename + ".pdf";
    a.href = "data:application/pdf;base64," + base64;

    a.dispatchEvent(new MouseEvent(`click`, { bubbles: true, cancelable: true, view: window }));
}

downloadReport = (labels, datasets, date, b64Logo, scoresData, b64respiration, b64oxygen, therapiesData) => {
    Chart.platform.disableCSSInjection = true;

    var canvas = document.getElementById("chartjs-1");
    var context = canvas.getContext("2d");

    var therapies = JSON.parse(therapiesData)

    var scores = JSON.parse(scoresData);

    var chart = new Chart(context, {
        "type": "bar",
        "data": {
            "labels": JSON.parse(labels),
            "datasets": JSON.parse(datasets)
        },
        "options": {
            "bezierCurve": false,
            "animation": {
                onComplete: function () {
                    var ctx = chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "bottom";

                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            for (var key in dataset._meta) {
                                var model = dataset._meta[key].data[i]._model;
                                ctx.fillText(dataset.data[i], model.x, model.y - 5);
                            }
                        }
                    });

                    var data = chart.toBase64Image();
                    var pdf = new jsPDF();

                    // Logo on top
                    pdf.addImage(b64Logo, 'JPEG', 15, 7, 20, 20);

                    // Date of Score
                    pdf.setFontSize(12);
                    pdf.text(170, 23, date);

                    // Upper Line
                    pdf.line(15, 25, 195, 25);

                    // SRI-Chart
                    pdf.addImage(data, 'PNG', 15, 40, 180, 100);

                    // Scores-Description table
                    pdf.autoTable({
                        margin: {
                            top: 150
                        },
                        tableWidth: 90,
                        head: [['Description', 'Score']],
                        body: [
                            ['Respiratory Complaints', scores[0]],
                            ['Physical Functioning', scores[1]],
                            ['Attendant Symptoms and Sleep', scores[2]],
                            ['Social Relationships', scores[3]],
                            ['Anxiety', scores[4]],
                            ['Psychological Well-Being', scores[5]],
                            ['Social Functioning', scores[6]],
                            ['SRI-SS', scores[7]],
                        ]
                    });

                    // Therapies
                    therapies.forEach(therapy => {
                        if (therapy['type'] == 'respiration') {
                            pdf.addImage(b64respiration, 'JPEG', 120, 150, 10, 10);

                            pdf.setFontSize(10);
                            pdf.text(140, 157, 'Respiration therapy' + ': ' + therapy['since']);
                        } else {
                            pdf.addImage(b64oxygen, 'JPEG', 120, 165, 10, 10);

                            pdf.setFontSize(10);
                            pdf.text(140, 172, 'Oxygen therapy' + ': ' + therapy['since']);
                        }
                    });

                    // Bottom Line
                    pdf.line(15, 275, 195, 275);

                    pdf.save('SRI-Report_' + date + '.pdf');
                    Chart.platform.disableCSSInjection = false;
                }
            },
            "scales": {
                "yAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    });
} 