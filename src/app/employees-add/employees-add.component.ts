import { WorkerListService } from './../services/worker-list.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { numberValidator } from '../validators/is-number.directive';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private workerListService: WorkerListService
  ) {
    // Create the form with initial data
    this.form = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.Lastname, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      dateOfBirth: [data.dateOfBirth, Validators.required],
      gender: [data.gender, Validators.required],
      education: [data.education, Validators.required],
      department: [data.department, Validators.required],
      salary: [data.salary, [Validators.required, numberValidator()]],
    });
  }
  // Function to handle form submission
  onSubmit() {
    // Do something with the form data
    console.log(this.form.value);

    console.log(this.form.value.dateOfBirth.toLocaleDateString());

    // Add the new worker to the list
    // this.workerListService.addWorkerString(this.form.value);
    this.workerListService.addWorker(this.form.value, this.form.value.dateOfBirth.toLocaleDateString());

    // Close the dialog after form submission
    this.dialogRef.close();

    Swal.fire({
      icon: 'success',
      title: 'Nice!',
      text: 'An employee added successfully!'
    })
  }

  // Function to handle dialog close
  onClose() {
    this.dialogRef.close();
  }
}
