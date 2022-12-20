import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { ConvertApiService } from 'src/app/services/convert-api.service';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.scss'],
})
export class FileUploadComponentComponent implements OnInit {
  private fileToUploadSub: Subject<SafeUrl> = new Subject<SafeUrl>();
  readonly fileUploadFormGroup: FormGroup = new FormGroup({
    localUrl: new FormControl(),
    remoteUrl: new FormControl()
  });

  public fileToUpload$: Observable<SafeUrl> =
    this.fileToUploadSub.asObservable();

  constructor(
    private sanitizer: DomSanitizer,
    private convertApi: ConvertApiService,
    private mockApi: MockApiService
  ) {}

  ngOnInit(): void {}

  onFileChanged(event: any): void {
    // when user select a file to upload
    const file: File = event.target.files[0];

    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = () => {
      this.fileToUploadSub.next(
        this.sanitizer.bypassSecurityTrustUrl(fileReader.result as string)
      );
    };

    fileReader.readAsDataURL(file);
    this.uploadFile(file);
  }

  // upload file to endpoint and update remoteUrl in FormControl to reflect received url
  uploadFile(file: File): void {
    this.convertApi.uploadFile(file).subscribe({
      next: (uploadedFile) => {
        this.fileUploadFormGroup.get('remoteUrl')?.markAsDirty();
        this.fileUploadFormGroup.get('remoteUrl')?.setValue(uploadedFile.Url);
      },
    });
  }

  onUploadSubmit(): void {
    this.mockApi.create(this.fileUploadFormGroup.get('remoteUrl')?.value).subscribe();
  }
}
