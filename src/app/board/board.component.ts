import { Component, OnInit } from '@angular/core';
import { BoardService } from "../services/board.service";
import { space } from '../models/space.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public board: BoardService, private snackBar: MatSnackBar) { }
  public gameGoing = false;
  ngOnInit(): void {
    this.initBoard();
    console.log(this.board.board);
  }
  public spaceClick(space: space){
    if(this.gameGoing){
      console.log("RAWR");
      space.clicked = true;
      console.log(space);
      if(space.mine == true){
        console.log("You ded m8");
        let snackbarRef = this.snackBar.open("You have lost", 'Reset');
        this.gameGoing = false;
        snackbarRef.onAction().subscribe(() => {
          this.initBoard();
        });
      }else{
        this.board.click(space);
      }
    }
  }
  public showFlag(space: space){
    if(this.gameGoing){
      console.log(space);
      space.flag = !space.flag;
      return false;
    }
  }
  public stop(){
    return false;
  }
  public showBoard(){
    console.log(this.board.board);
  }
  public initBoard(){
    this.board.initBoard(30,30,150);
    this.gameGoing = true;
  }
}
