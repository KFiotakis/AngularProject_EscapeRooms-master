/* app.component.ts */
import { Component } from '@angular/core';
import { Book } from '../book/bookModel';
import { BookService } from '../book/book.service';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent {
	books!: Array<Book>;
	dt: any;
	dataDisplay: any;

	show: boolean = false;
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
			type: "column", //change type to column, line, area, doughnut, etc
			indexLabel: "{name}: {y}%",
			dataPoints: [
				{ name: "Wizarding School: Fang of the Serpent", y: 0 },
				{ name: "Blackwing's Cave", y: 0 },
				{ name: "Sherlock's Despair", y: 0 },
				{ name: "The Flying Dutchman", y: 0 },
				{ name: "War on Horizon Alpha", y: 0 },
				{ name: "Butcher's Lair", y: 0 },
				{ name: "Heist Plan", y: 0 },
				{ name: "Patient Zero 2150", y: 0 },
				{ name: "Spy Heroes", y: 0 },
				{ name: "Psychopath's Den", y: 0 }
			]
		}]
	}

	constructor(private bookService: BookService) { }

	size: number = 100
	ngOnInit(): void {

		this.bookService.getBooks().subscribe(
			{
				next: response => {
					this.books = response;
					this.dt = response;
					this.dataDisplay = this.dt.data;
					this.getMostPlayedRoomsData();
				},
				error: e => console.log(e),
				complete: () => {
					console.log(this.books)
					this.show = true;


				}
			}
		)


	}


	getMostPlayedRoomsData() {
		var roomTitles = [...new Set(this.books.map(x => x.Room.Title))];
		for (let i = 0; i < this.chartOptions.data[0].dataPoints.length; i++) {
			for (let j = 0; j < roomTitles.length; j++) {
				if (this.chartOptions.data[0].dataPoints[i].name == roomTitles[j]) {
					var percentage = this.getPercentage(this.books, roomTitles[j]);
					this.chartOptions.data[0].dataPoints[i].y = percentage;
				}
			}

		}

	}

	getPercentage(books: Book[], room: string): number {
		var occurences = books.filter((v) => (v.Room.Title === room)).length;
		var result = ((occurences / books.length) * 100).toFixed(2);
		return Number(result);

	}
}



