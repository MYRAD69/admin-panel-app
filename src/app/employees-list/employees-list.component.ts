import { Router } from '@angular/router';
import { EmployeesAddComponent } from './../employees-add/employees-add.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Worker } from '../interfaces/worker';
import { WorkerListService } from '../services/worker-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EmployeesEditComponent } from '../employees-edit/employees-edit.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements AfterViewInit {
  workers: Worker[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'education', 'department', 'salary'];
  dataSource: MatTableDataSource<Worker> = new MatTableDataSource<Worker>();
  selection: SelectionModel<Worker> = new SelectionModel<Worker>(false);

  constructor(private workerListService: WorkerListService, private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource(this.workers);
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Worker>;

  ngAfterViewInit() {
    this.workerListService.getWorkers().subscribe(list => {
      this.workers = list;
      this.dataSource = new MatTableDataSource(this.workers);
      this.table.renderRows();
    });
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource._updateChangeSubscription(), 1000);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete() {
    const worker = this.selection.selected[0];
    console.log('Delete button clicked');
    Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The employee has been deleted.',
          'success'
        )
        this.selection.clear();
        this.workerListService.deleteWorker(worker.id);
        for (let i = 0; i < this.workers.length; i++) {
          if (this.workers[i].id > worker.id) {
            this.workers[i].id--;
          }
        }
      }
    })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeesAddComponent, {
      width: '500px', // Set the desired width of the dialog
      data: { title: 'Add a worker', name: 'John Doe' }, // Pass any data you want to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(): void {
    const worker = this.selection.selected[0];
    const dialogRef = this.dialog.open(EmployeesEditComponent, {
      width: '500px', // Set the desired width of the dialog
      data: { title: 'Edit a worker', worker: worker }, // Pass any data you want to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submit') {
        this.selection.clear();
        Swal.fire({
          icon: 'success',
          title: 'Nice!',
          text: 'An employee edited successfully!'
        })
      }
      console.log('The dialog was closed');
    });
  }

  onSelect(worker: Worker) {
    console.log('Select button clicked', worker);
    this.selection.toggle(worker);
  }

  isRowSelected(worker: Worker): boolean {
    return this.selection.isSelected(worker);
  }

}
