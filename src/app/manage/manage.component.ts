import { Component } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  dataArray !: Observable<any> | undefined;
  
  constructor(private firestore: Firestore) {

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const collectionPath = "posts";
    const collectionRef = collection(this.firestore, collectionPath);
    const sortedQuery = query(collectionRef, orderBy('timestamp', 'desc'));
    const collectionInstance = collectionData(sortedQuery, {idField: "id"})

    collectionInstance.subscribe(data => {
      
      // console.log(data)
    })
    this.dataArray = collectionInstance;
  }

  decodeURL(url: string) {
    return decodeURIComponent(url);
  }
}
