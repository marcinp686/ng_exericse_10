import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/fileUpload.model';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

// Uploaded file details sent to POST https://636ce2d8ab4814f2b2712854.mockapi.io/files

  constructor(private httpClient: HttpClient) { }

  create(fileUrl: string) : Observable<FileModel> {
    let body = { url: fileUrl};

    return this.httpClient.post<FileModel>('https://636ce2d8ab4814f2b2712854.mockapi.io/files', body);
  }

}
