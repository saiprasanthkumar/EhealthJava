import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {

  complaintReply = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string , 
    public dialogRef: MatDialogRef<DialogContentExampleDialog>) {}
    
  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  displayedColumns: string[] = ['complaintName', 'complaintInfo' , 'replyInfo'];
  dataSource = [];
  complaintName = '';
  complaintInfo = '';

  constructor(private http: HttpClient,
    public dialog: MatDialog,public userService: UserService) { }

  ngOnInit() {
    this.http.get('/view/complaint').subscribe((data) => this.responseSuccess(data),
    (err) => alert (err.error.message)
    );
  }

  openDialog(complaintNameData) {
    let complaintName = complaintNameData;
    const dialogRef = this.dialog.open(DialogContentExampleDialog ,{
      width: '250px',
      data: {complaintName: complaintNameData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.http.post('/add/complaint' , {
        complaintName: complaintName,
        replyComplaint: result
      }).subscribe((complaint) => this.responseSuccess(complaint),
              (err) => alert (err.error.message)
              );
    });
  }

  responseSuccess(data) {
    this.dataSource  = data;
    this.complaintName = '';
    this.complaintInfo = '';
  }

  createComplaint() {
    this.http.post('/add/complaint' , {
      complaintName: this.complaintName,
      complaintInfo: this.complaintInfo
    }).subscribe((complaint) => this.responseSuccess(complaint),
            (err) => alert (err.error.message)
            );
  }
  replyComplaint(complaintName) {
    this.http.post('/add/complaint' , {
      complaintName: this.complaintName,
      complaintInfo: this.complaintInfo,
      replyComplaint: this.replyComplaint
    }).subscribe((complaint) => this.responseSuccess(complaint),
            (err) => alert (err.error.message)
            );
  }
}
