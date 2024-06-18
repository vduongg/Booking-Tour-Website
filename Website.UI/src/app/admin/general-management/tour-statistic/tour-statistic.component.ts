import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Tour } from 'src/app/models/Tour';
import { OrderService } from 'src/services/order.service';
import { StatisticService } from 'src/services/statistic.service';
import { TourService } from 'src/services/tour.service';


@Component({
  selector: 'app-tour-statistic',
  templateUrl: './tour-statistic.component.html',
  styleUrls: ['./tour-statistic.component.css']
})
export class TourStatisticComponent implements OnInit {

  listOrder:Order[] = []
  listTour : Tour[] = []
  revenue = 0
  totalItem = 0;
  public chartLabels:number[] = [];
  public chartData:number[] = [];
  public chartType = 'bar';
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  isStatistic = false;
  revenueYear = new Map<number,number>()
  year = ""
  constructor(private orderService:OrderService, private tourService: TourService, private statisticService:StatisticService) { }

  ngOnInit(): void {
    this.orderService.getListOrder().subscribe( (result:Order[]) =>{
      this.listOrder = result
      for(let i = 0 ; i < this.listOrder.length ; i++){
        if(this.listOrder[i].status != "Thanh toán thất bại") {
            if(this.listOrder[i].status == "Hoàn tiền" ){
                this.revenue +=  Number(this.listOrder[i].totalPrice) - (Number(this.listOrder[i].totalPrice)*Number(this.listOrder[i].refund))/100
            }
            else {
              this.revenue += Number(this.listOrder[i].totalPrice)
            }
        }
      }
    })
    this.tourService.getTour().subscribe((result: Tour[]) => (this.listTour = result , this.totalItem = result.length))
    
  }
  selectYear(e: string){
    this.isStatistic = false;
    this.chartLabels = []
    this.chartData = []
    this.statisticService.getRevenueMonth(Number(e)).subscribe( result =>{
      for(let i = 1 ; i <= 12 ; i++){
          this.revenueYear.set(i,0)
      }
      for(let i = 0; i< result.length; i++) {
        this.revenueYear.set(result[i].month,result[i].totalRevenue)
        this.isStatistic = true;
      }
      for(let i = 1 ; i <= 12 ; i++) {
          this.chartLabels.push(i)
          this.chartData.push(Number(this.revenueYear.get(i)))
      }

  })
  }

}
