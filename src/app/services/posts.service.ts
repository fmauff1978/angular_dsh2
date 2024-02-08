


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


uploadImage(selectedImg, postData, formStatus, id){


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

loadOneData(id){

  return this.fs.doc(`posts/${id}`).valueChanges();

}

updateData(id, postData){

  this.fs.doc(`posts/${id}`).update(postData).then(()=>{
console.log("Dados atualizados com sucesso")
this.router.navigate(['/posts']);

  })


}


deleteImage(postImgPath, id){


  this.st.storage.refFromURL(postImgPath).delete().then(()=>{

    this.deleteData(id);

    console.log("Doc deletado com sucesso")
  })
}

deleteData (id){

  this.fs.doc(`posts/${id}`).delete().then(()=>{
    console.log("Dados apagados com sucesso!")
  })
}

markFeatured(id, featuredData){

  this.fs.doc(`posts/${id}`).update(featuredData).then(()=>{

    console.log("atualizado featured!")
  })

}
}
