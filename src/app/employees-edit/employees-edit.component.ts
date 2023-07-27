import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkerListService } from '../services/worker-list.service';
import { numberValidator } from '../validators/is-number.directive';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesEditComponent>,
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

  ngOnInit(): void {
    this.form.setValue({
      firstName: this.data.worker.firstName,
      lastName: this.data.worker.lastName,
      email: this.data.worker.email,
      dateOfBirth: new Date(this.data.worker.dateOfBirth),
      gender: this.data.worker.gender,
      education: this.data.worker.education,
      department: this.data.worker.department,
      salary: this.data.worker.salary
    });
  }

  // Function to handle form submission
  onSubmit() {
    // Do something with the form data
    console.log(this.form.value);

    console.log(this.form.value.dateOfBirth.toLocaleDateString());

    // Add the new worker to the list
    // this.workerListService.addWorkerString(this.form.value);
    this.workerListService.editWorker(this.form.value, this.form.value.dateOfBirth.toLocaleDateString(), this.data.worker.id);

    // Close the dialog after form submission
    this.dialogRef.close('submit');
  }

  // Function to handle dialog close
  onClose() {
    this.dialogRef.close('cancel');
  }
}
