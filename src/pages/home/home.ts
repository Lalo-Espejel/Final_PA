import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    url:string;
    data:string;


    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
 
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public events: Events) {
 
    }
 
    ionViewDidLoad() {
 	this.loadDatos(); 
    }
  loadDatos(){
    var luz = [];
    var tiempo=[];
    var cont=0;
    this.http.get('http://localhost:3000/api/datos')
    .map(res=> res.json())
    .subscribe(data=>{
    	this.data = data;
       	console.log(this.data);
	for (let item of this.data){
		luz.push(JSON.stringify(this.data[cont].luz));
		tiempo.push((JSON.stringify(this.data[cont].timestamp)).replace(/2017|11|30|-|T|Z|"/g,''));
		cont++;
	}
	this.loadGraficas(luz, tiempo);
    },err =>{
      console.log(err);
    });
  }

  loadGraficas(luz, tiempo){
	var cero=0;
	var uno=0;
	var dos=0;
	var tres=0;
	var cuatro=0;
	var cinco=0;
	var seis=0;
	var siete=0;
	var ocho=0;
	var nueve=0;
	var diez=0;

	for (var i=0; i<luz.length; i++){
		console.log('este es el value'+luz[i]);
		if(luz[i]==='0.0')
			cero++;
		if(luz[i]==='0.1')
			uno++;
		if(luz[i]==='0.2')
			dos++;
		if(luz[i]==='0.3')
			tres++;
		if(luz[i]==='0.4')
			cuatro++;
		if(luz[i]==='0.5')
			cinco++;
		if(luz[i]==='0.6')
			seis++;
		if(luz[i]==='0.7')
			siete++;
		if(luz[i]==='0.8')
			ocho++;
		if(luz[i]==='0.9')
			nueve++;
		if(luz[i]==='1.0')
			diez++;
		console.log('este es el value'+tiempo[i]);	
	}
	console.log("cero"+cero+"uno"+ uno + "dos" +dos+"tres"+tres+"cuatro"+cuatro+"cinco"+cinco+"seis"+seis+"siete"+siete+"ocho"+ocho+"nueve"+nueve+"diez"+diez);
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                datasets: [{
                    label: '# de incidencias',
                    data: [cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
			type: 'linear',
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                datasets: [{
                    label: '# de incidencias',
                    data: [cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
			'rgba(43, 156, 33, 0.29)',
			'rgba(33, 150, 156, 0.4)',
			'rgba(156, 33, 33, 0.43)',
			'rgba(156, 141, 33, 0.44)',
			'rgba(33, 35, 156, 0.44)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
			"#2b9c21",
			"#21969c",
			"#9c2121",
			"#9c8d21",
			"#21239c"
                    ]
                }]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: tiempo,
                datasets: [
                    {
                        label: "Variacion en el tiempo",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: luz,
                        spanGaps: false,
                    }
                ]
            }
 
        });

  }
 
 
}

