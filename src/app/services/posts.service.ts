


import { environment } from './../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadString, getDownloadURL } from '@angular/fire/storage';
import {  Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



@Injectable({
  providedIn: 'root'
})


export class PostService {

  constructor(private st: AngularFireStorage, private fs: AngularFirestore, private router: Router) { }


uploadImage(selectedImg, postData){


  const filePath =`postIMG/${Date.now()}`
  console.log(filePath)

  this.st.upload(filePath, selectedImg).then(()=>{

    console.log("imagem gravada com sucesso")

    this.st.ref(filePath).getDownloadURL().subscribe(URL=>{
      console.log(URL);
      postData.postImgPath = URL;
      console.log(postData);
      this.saveData(postData)

    })
  })
}

saveData(postData){
  this.fs.collection('posts').add(postData).then(docRef =>{
this.router.navigate(['/posts'])

})

}
}
