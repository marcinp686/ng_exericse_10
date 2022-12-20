import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/fileUpload.model';

@Injectable({
  providedIn: 'root',
})
export class ConvertApiService {
  constructor(private httpClient: HttpClient) {}

  uploadFile(file: File): Observable<FileModel> {
    const formData = new FormData();
    formData.append('filename', file);
    return this.httpClient.post<FileModel>('https://v2.convertapi.com/upload', file);
  }
}
