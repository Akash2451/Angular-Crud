
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
api:any;
columns: any;
  constructor(private rest:RestService) {
    this.columns = [
      { header: ' Id', field: 'user_id' },
      { header: ' username', field: 'username' },
      { header: 'loginid', field: 'loginid' },
      { header: 'usertypename', field: 'usertypename' },
      { header: 'password', field: 'password' },
      { header: 'mpin', field: 'mpin' },
      { header: 'activestatus_type', field: 'activestatus_type' },
      { header: 'activestatustypename', field: 'activestatustypename' },
      { header: 'activeremark', field: 'activeremark' },
      { header: 'emailaddress', field: 'emailaddress' },
      { header: 'mobileno', field: 'mobileno' },
      { header: 'alternatemobileno', field: 'alternatemobileno' },
      { header: 'passwordattemptcount', field: 'passwordattemptcount' },
      { header: 'accounttemporarylockcount', field: 'accounttemporarylockcount' },
      { header: 'passwordlock_type', field: 'passwordlock_type' },
      { header: 'passwordmodifydatetime', field: 'passwordmodifydatetime' },
      { header: 'accountlockdatetime', field: 'accountlockdatetime' },
      { header: 'createby_id', field: 'createby_id' },
      { header: 'createmachineid', field: 'createmachineid' },
      { header: 'updateby_id', field: 'updateby_id' },
      { header: 'updatemachineid', field: 'updatemachineid' },
      { header: 'createdatetime', field: 'createdatetime' },
      { header: 'updatedatetime', field: 'updatedatetime' },
    ]; 
   }

  ngOnInit(): void {
    this.rest.getdata().subscribe(res=>{
      this.api = res;
    })

}
}