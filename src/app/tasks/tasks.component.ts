import { Component, OnInit } from "@angular/core";
import { DoList } from "../doList";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { TasksService } from "../tasks.service";
// import { NgxSpinnerService } from "ngx-spinner";
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  taskform: any;
  editTaskForm: any;
  Dummyid: Number = 2;
  listOfTasks: DoList[];
  updateArray: any;
  updateId: Number;

  constructor(private TasksServ: TasksService) {
    this.editTaskForm = new FormGroup({
      content: new FormControl("", Validators.required),
      modifiedBy: new FormControl("", Validators.required),
      modifiedDate: new FormControl(""),
      accountId: new FormControl("", Validators.required),
      id: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    // this.Spinner.show();
    this.getAllTasksLists();
    this.buildForm();
    // this.Spinner.hide();
  }

  buildForm() {
    this.taskform = new FormGroup({
      title: new FormControl("Title"),
      content: new FormControl("", Validators.required),
      active: new FormControl(false),
      createdBy: new FormControl("Naveen"),
      modifiedBy: new FormControl("Naveen"),
      createdDate: new FormControl(""),
      modifiedDate: new FormControl(""),
      accountId: new FormControl("2"),
    });
  }

  getAllTasksLists() {
    //this.Spinner.show();
    this.TasksServ.getAllAccounts(this.Dummyid)
      .then((tasklists) => {
        this.listOfTasks = tasklists;
        // console.log(this.listOfTasks);
      })
      .catch((res) => {
        return "Unable to get the tasks :" + res;
      });
  }

  clickBtn() {
    this.taskform.patchValue({ createdDate: new Date() });
    this.taskform.patchValue({ modifiedDate: new Date() });
    console.log(this.taskform.value);
    this.TasksServ.createTask(this.taskform.value)
      .then((res) => {
        this.getAllTasksLists();
      })
      .catch((err) => {
        console.log(err);
      });
    this.taskform.reset();
    this.taskform.patchValue(
      { title: "Title" },
      { createdBy: "Naveen" },
      { modifiedBy: "Naveen" },
      { accountId: 2 }
    );
  }

  editTask(id: any) {
    this.updateArray = id.modifiedDate;
    $("#editTask").modal("show");
    this.updateId = id.id;
    this.taskform.patchValue({ title: id.title });
    this.taskform.patchValue({ content: id.content });
    this.taskform.patchValue({ active: id.active });
    this.taskform.patchValue({ createdBy: id.createdBy });
    this.taskform.patchValue({ modifiedBy: id.modifiedBy });
    this.taskform.patchValue({ createdDate: id.createdDate });
    this.taskform.patchValue({ modifiedDate: new Date() });
    this.taskform.patchValue({ accountId: id.accountId });
    // modifiedDate: new FormControl(''),
  }

  deleteTask(id: any) {
    this.TasksServ.deleteTask(id)
      .then((res) => {
        this.getAllTasksLists();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  actiavteAndDeactivate(data: any) {
    this.TasksServ.updateTask(data, data.id)
      .then((res) => {
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateTaskForm() {
    this.TasksServ.updateTask(this.taskform.value, this.updateId)
      .then((res) => {
        this.getAllTasksLists();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
