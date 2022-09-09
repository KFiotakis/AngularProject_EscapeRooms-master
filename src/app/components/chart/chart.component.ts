/* app.component.ts */
import { Component } from '@angular/core';


 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
	chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		text: "Most played Room"
	  },
	  subtitles: [{
		text: "Times/week"
	  }],
	  data: [{
		type: "pie", //change type to column, line, area, doughnut, etc
		indexLabel: "{name}: {y}%",
		dataPoints: [
			{ name: "Overhead", y: 9.1 },
			{ name: "Problem Solving", y: 3.7 },
			{ name: "Debugging", y: 36.4 },
			{ name: "Writing Code", y: 30.7 },
			{ name: "Firefighting", y: 20.1 }
		]
	  }]
	}
}



