import { Injectable } from '@angular/core';
import { Worker } from '../interfaces/worker';
import { BehaviorSubject, Observable } from 'rxjs';
import { getDatabase, ref, set, onValue, push, get } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class WorkerListService {
  private workers: Worker[] = [];
  private workersArray: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>(this.workers);

  constructor() {
    const database = getDatabase();
    onValue(ref(database, 'employees/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.workers.push({
          id: childSnapshot.val().id,
          firstName: childSnapshot.val().firstName,
          lastName: childSnapshot.val().lastName,
          email: childSnapshot.val().email,
          dateOfBirth: childSnapshot.val().dateOfBirth,
          gender: childSnapshot.val().gender,
          education: childSnapshot.val().education,
          department: childSnapshot.val().department,
          salary: childSnapshot.val().salary
        });
      });
    }, {
      onlyOnce: true
    });
  }

  getWorkers(): Observable<Worker[]> {
    return this.workersArray.asObservable();
  }

  deleteWorker(id: number) {
    const index = this.workers.findIndex(w => w.id === id);
    if (index >= 0) {
      let worker = this.workers[index];
      const database = getDatabase();
      onValue(ref(database, 'employees/'), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().id === worker.id) {
            const workerRef = ref(database, 'employees/' + childSnapshot.key);
            set(workerRef, null);
          }
          else if (childSnapshot.val().id > worker.id) {
            const workerRef = ref(database, 'employees/' + childSnapshot.key);
            console.log(childSnapshot.val().firstName, childSnapshot.val().id - 1);
            set(workerRef, {
              id: childSnapshot.val().id - 1,
              firstName: childSnapshot.val().firstName,
              lastName: childSnapshot.val().lastName,
              email: childSnapshot.val().email,
              dateOfBirth: childSnapshot.val().dateOfBirth,
              gender: childSnapshot.val().gender,
              education: childSnapshot.val().education,
              department: childSnapshot.val().department,
              salary: childSnapshot.val().salary
            });
          }
        });
      }, {
        onlyOnce: true
      });

      this.workers.splice(index, 1);
      this.workersArray.next(this.workers);
    }
  }

  addWorker(worker: Worker, date: string) {
    worker.dateOfBirth = date;
    worker.id = this.workers.length + 1;
    this.workers.push(worker);
    this.workersArray.next(this.workers);

    const database = getDatabase();
    const newWorkerRef = push(ref(database, 'employees/'));
    set(newWorkerRef, {
      id: worker.id,
      firstName: worker.firstName,
      lastName: worker.lastName,
      email: worker.email,
      dateOfBirth: worker.dateOfBirth,
      gender: worker.gender,
      education: worker.education,
      department: worker.department,
      salary: worker.salary
    });
  }

  editWorker(worker: Worker, date: string, id: number) {
    worker.id = id;
    const index = this.workers.findIndex(w => w.id === worker.id);
    worker.dateOfBirth = date;
    const database = getDatabase();
    onValue(ref(database, 'employees/'), (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === this.workers[index].id) {
          const workerRef = ref(database, 'employees/' + childSnapshot.key);
          set(workerRef, {
            id: worker.id,
            firstName: worker.firstName,
            lastName: worker.lastName,
            email: worker.email,
            dateOfBirth: worker.dateOfBirth,
            gender: worker.gender,
            education: worker.education,
            department: worker.department,
            salary: worker.salary
          });
        }
      });
    }, {
      onlyOnce: true
    });

    this.workers[index] = worker;
    this.workersArray.next(this.workers);
  }
}
