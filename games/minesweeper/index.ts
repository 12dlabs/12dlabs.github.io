/*  --------------------
 *  Minesweeper - Alibaba
 *  (c) Kingcean Tuan, 2015.
 *
 *  File  index.ts
 *  Description  Minesweeper game.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/**
  * The options to load.
  */
interface OptionsContract {

    /**
      * Rows count.
      */
    x: number;

    /**
      * Columns count.
      */
    y: number;

    /**
      * Mines count.
      */
    count: number;
}

/**
  * The minesweeper instance.
  */
class Minesweeper {
    private _mines: number[];
    private _options: OptionsContract;
    private _opened: number[];
    private _element: HTMLElement;
    private _end = false;

    /**
      * Initializes a new instance of the Minesweeper class.
      * @param id  The identifier of the element container to fill.
      */
    public constructor(id: string | HTMLElement) {
        this._element = typeof id === "string" ? document.getElementById(id) : id;
        this._element.className = "ali-toys-minesweeper"
    }

    /**
      * Gets all mines by an index array.
      */
    public mines() {
        return this._mines;
    };

    /**
      * Start a new game.
      * @param options  The options.
      */
    public start(options: OptionsContract) {
        this._options = options;
        this._element.innerHTML = "";
        var table = document.createElement("table");
        var tBody = document.createElement("tbody");
        table.appendChild(tBody);
        this._mines = randomNumbers(options.x * options.y, options.count);
        this._opened = [];
        this._end = false;
        for (var row = 0; row < options.x; row++) {
            var tRow = document.createElement("tr");
            tBody.appendChild(tRow);
            for (var column = 0; column < options.y; column++) {
                var tCell = this._cell(row, column);
                tRow.appendChild(tCell);
            }
        }

        this._element.appendChild(table);
    }

    /**
      * Checks whether the specific cell is a mine.
      * @param row  The row index.
      * @param column  The column index.
      */
    public isMine(row: number, column: number): boolean {
        if (row < 0 || column < 0 || row >= this._options.x || column >= this._options.y) return null;
        return this._mines.some((value, index, array) => {
            return value === row * this._options.y + column;
        });
    }

    /**
      * Opens a cell.
      * @param row  The row index.
      * @param column  The column index.
      */
    public open(row: number, column: number): boolean {
        if (this._end || row < 0 || column < 0 || row >= this._options.x || column >= this._options.y) return null;
        var tCell = document.getElementById(this._element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
        tCell.className = "ali-state-active-t";
        if (this._opened.some((value, index, array) => {
            return value === row * this._options.y + column;
        })) return this.isMine(row, column);
        this._opened.push(row * this._options.y + column);
        if (this.isMine(row, column)) {
            tCell.innerHTML = "X";
            this._fail();
            return false;
        }

        var rows = [row];
        if (row > 0) rows.push(row - 1);
        if (row < this._options.x) rows.push(row + 1);
        var columns = [column];
        if (column > 0) columns.push(column - 1);
        if (column < this._options.y) columns.push(column + 1);
        var num = (this.isMine(row - 1, column - 1) ? 1 : 0)
            + (this.isMine(row - 1, column) ? 1 : 0)
            + (this.isMine(row - 1, column + 1) ? 1 : 0)
            + (this.isMine(row, column - 1) ? 1 : 0)
            + (this.isMine(row, column + 1) ? 1 : 0)
            + (this.isMine(row + 1, column - 1) ? 1 : 0)
            + (this.isMine(row + 1, column) ? 1 : 0)
            + (this.isMine(row + 1, column + 1) ? 1 : 0);
        if (num > 0) tCell.innerHTML = num.toString();
        if (this._opened.length >= this._options.x * this._options.y - this._options.count) this._success();
        if (num === 0) {
            this._openRound(row, column);
        }

        return true;
    }

    private _cell(row: number, column: number) {
        var tCell = document.createElement("td");
        tCell.id = this._element.id + "_table_b_r" + row.toString() + "_c" + column.toString();
        tCell.innerHTML = "&nbsp;";
        tCell.addEventListener("click", (ev) => {
            this.open(row, column);
        });
        return tCell;
    }

    private _fail() {
        this._end = true;
        this._mines.forEach((value, index, array) => {
            var total = this._options.x * this._options.y;
            var column = value % this._options.y;
            var row = (value - column) / this._options.y;
            var tCell = document.getElementById(this._element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
            if (!!tCell) tCell.innerHTML = "X";
        });
        alert("Game over. Better luck next time!");
    }

    private _success() {
        this._end = true;
        alert("Congratulations!");
    }

    private _openRound(row: number, column: number) {
        this.open(row - 1, column - 1);
        this.open(row - 1, column);
        this.open(row - 1, column + 1);
        this.open(row, column - 1);
        this.open(row, column + 1);
        this.open(row + 1, column - 1);
        this.open(row + 1, column);
        this.open(row + 1, column + 1);
    }

}

/**
  * Generates an array of random number by given scope.
  * @param total  The maxinum number.
  * @param count  The count of random numbers.
  */
function randomNumbers(total: number, count: number): number[] {
    var mines = [];
    var mineStart = 0;
    for (var i = 0; i < count; i++) {
        var random = Math.random() * (total - count - mineStart + i) / Math.sqrt(Math.sqrt(total));
        if (random < 1) random = 1;
        mineStart = parseInt(random.toFixed()) + mineStart;
        mines.push(mineStart);
    }

    return mines;
}
