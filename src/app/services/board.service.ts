import { Injectable } from '@angular/core';
import { space } from "../models/space.model";
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public board: space[][] = [];

  constructor() { }
  
  public initBoard( x: number,  y: number,  bombs: number){
    this.board = [];
    let tempBombs = 0;
       for( let xaxis = 0; xaxis < x; xaxis++){
          let tempArray = [];
          for(let yaxis = 0; yaxis < y; yaxis++){
            let tempSpace = new space();
            if(tempBombs !== bombs){
                tempBombs++;
                tempSpace.mine = true;
                tempSpace.surronding = 99;
            }
            tempSpace.x = xaxis;
            tempSpace.y = yaxis;
            tempArray.push(tempSpace);
          }
          this.board.push(tempArray);
        }
        this.shuffleMultiArray();
        this.shuffleMultiArray();
        this.shuffleMultiArray();
        
        this.board.forEach((column, x) => {
          column.forEach((place,y) => {
            this.board[x][y].x = x;
            this.board[x][y].y = y;
          });
        });
  }
  public shuffleMultiArray() {
    for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
            let i1 = Math.floor(Math.random() * (this.board.length));
            let j1 = Math.floor(Math.random() * (this.board.length));

            let temp = this.board[i][j];
            this.board[i][j] = this.board[i1][j1];
            this.board[i1][j1] = temp;
        }
    }
}
  public click(space: space){
    for(let x = -1; x < 2; x++){
        for(let y = -1; y < 2; y++){
          if(this.board[space.x + x]){
            if(this.board[space.x + x][space.y + y]){
              if(x == 0 && y == 0){}
              else{
                if(this.board[space.x + x][space.y + y].mine){
                  space.surronding++;
                }else if(this.board[space.x + x][space.y + y].clicked == false && this.board[space.x + x][space.y + y].surronding == 0 && space.surronding == 0){
                  this.board[space.x + x][space.y + y].clicked = true;
                  this.board[space.x + x][space.y + y].flag = false;
                  
                  this.click(this.board[space.x + x][space.y + y]);
                }
              }
              
            } 
          }
      }
    }
  }
}
