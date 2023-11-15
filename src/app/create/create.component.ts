import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  private selectedCategory: string | undefined; 
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private firestore: Firestore, 
    private auth: AngularFireAuth,
    private router: Router,
    private authservice: AuthService,
    private firestorage: AngularFireStorage) 
    {
      this.selectedCategory = "övrigt";
  }


  async onSubmit (form: any) {

    interface FormData {
      title: string;
      timestamp: any; 
      category: string;
      text: string;
      price: number;
      imageURLs: string[]; 
    }

    let formData = {
      title: form.title,
      timestamp: Timestamp.now(),
      category: this.selectedCategory,
      text: form.text,
      price: form.price,
      imageURLs: []
    } as any;
    
    let uploadTasks: Promise<any>[] = [];
    for (const key in this.selectedFiles) {
      if (this.selectedFiles.hasOwnProperty(key)) {
        const file = this.selectedFiles[key];
        const filePath = `/images/${file.name}`;
        const fileRef = this.firestorage.ref(filePath);
        const task = this.firestorage.upload(filePath, file);

        console.log("File uploaded!");

        const uploadTask = task.then(async event => {
          const url = await event.ref.getDownloadURL();
          const encodedURL = encodeURIComponent(url);
          (formData.imageURLs as string[]).push(encodedURL);
        });

        uploadTasks.push(uploadTask);
      }
    }

    // Wait for all uploadTasks to complete before proceeding
    await Promise.all(uploadTasks);

    const collectionInstance = collection(this.firestore, "posts");
    await addDoc(collectionInstance, formData);

    alert("Föremål tillagt!");
  }

  onFileSelected(event: any, key: string): void {
    this.selectedFiles[key] = event.target.files[0];
  }

  selectClass(c: string, elem: any) {
    const elements = document.querySelectorAll(".category")

    elements.forEach((e) => {
      e.classList.remove("selected")
    })

    elem.classList.add("selected")
    this.selectedCategory = c;
    console.log(this.selectedCategory);
  }
}
