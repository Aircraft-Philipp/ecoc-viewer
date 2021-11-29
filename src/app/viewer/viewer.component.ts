import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
    public files: NgxFileDropEntry[] = [];
    json: any = null;
    pdf = '';
    hideUpload = false;
    jsonFail = false;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params.dl) {
                this.http.get(atob(String(params.dl))).subscribe(data => {
                    this.hideUpload = true;
                    this.json = data;
                });
            }
        })

        const ecoc = sessionStorage.getItem('e-coc-viewer');
        if(ecoc != undefined) {
            this.hideUpload = true;
            this.json = JSON.parse(atob(ecoc));
            sessionStorage.removeItem('e-coc-viewer');
        }
    }

    getPartyByNo(partyNo: number) {
        return this.json.EcocData.Data.Parties.find((x: any) => x.PartyNo === partyNo);
    }

    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    const reader = new FileReader();
                    reader.onload = this._handleReaderLoaded.bind(this);
                    reader.readAsDataURL(file);
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    private _handleReaderLoaded(e: any) {
        const reader = e.target;
        console.log(reader.result);
        console.log()
        try {
            this.json = JSON.parse(atob(reader.result.split(',')[1]));
            console.log(this.json);
        } catch {
            try {
                this.json = JSON.parse(atob(reader.result.split(',')[1].split('/')[1]));
                console.log(this.json);
            } catch {
                this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bei der Verabeitung des JSON ist ein Fehler aufgetreten.' });
            }
        }

        if (this.json && this.json.Attachment) {
            this.pdf = 'data:' + this.json.Attachment.FileType + ';' + this.json.Attachment.Encoding + ',' + this.json.Attachment.Data;
            console.log(this.pdf);
        }
    }

    public fileOver(event: any) {
        console.log(event);
    }

    public fileLeave(event: any) {
        console.log(event);
    }

    // getArrayFromObject(obj) {
    //     var arr = [];
    //     for(const [key, value] of Object.entries(obj)) {
    //         arr.push({key, value});
    //     }
    //     return arr;
    // }
}
