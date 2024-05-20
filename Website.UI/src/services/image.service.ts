import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourImage } from 'src/app/models/TourImage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url ="TourImage"
  constructor(private http:HttpClient) { }
  public createTourImage(id?:number, img?: FormData ) :Observable<FormData[]> {
    return this.http.post<FormData[]>(`${environment.apiUrl}/${this.url}/${id}`,img)
   }
   public getTourImage(id?:number):Observable<TourImage[]>{
    return this.http.get<TourImage[]>(`${environment.apiUrl}/${this.url}/${id}`)
   }
   public deleteTourImage(id?:number){
    return this.http.delete(`${environment.apiUrl}/${this.url}/${id}`)
   }
   public deleteAllTourImage(id?:number){
    return this.http.delete(`${environment.apiUrl}/${this.url}/deleteAllImage/${id}`)
   }

   
}
