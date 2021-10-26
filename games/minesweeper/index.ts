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
    private _cache: {
        mines?: number[];
        options?: OptionsContract;
        opened?: number[];
        element?: HTMLElement;
        end: boolean;
        start?: Date;
    } = { end: false };

    /**
      * Initializes a new instance of the Minesweeper class.
      * @param id  The identifier of the element container to fill.
      */
    public constructor(id: string | HTMLElement) {
        this._cache.element = typeof id === "string" ? document.getElementById(id) : id;
        this._cache.element.className = "ali-toys-minesweeper"
    }

    /**
      * Gets all mines by an index array.
      */
    public mines() {
        return this._cache.mines;
    };

    /**
      * Start a new game.
      * @param options  The options.
      */
    public start(options: OptionsContract) {
        this._cache.options = options;
        this._cache.element.innerHTML = "";
        let table = document.createElement("table");
        let tBody = document.createElement("tbody");
        table.appendChild(tBody);
        this._cache.mines = randomNumbers(options.x * options.y, options.count);
        this._cache.opened = [];
        this._cache.end = false;
        this._cache.start = null;
        for (let row = 0; row < options.y; row++) {
            let tRow = document.createElement("tr");
            tBody.appendChild(tRow);
            for (let column = 0; column < options.x; column++) {
                let tCell = this._cell(row, column);
                tRow.appendChild(tCell);
            }
        }

        this._cache.element.appendChild(table);
    }

    /**
      * Checks whether the specific cell is a mine.
      * @param row  The row index.
      * @param column  The column index.
      */
    public isMine(row: number, column: number): boolean {
        if (row < 0 || column < 0 || row >= this._cache.options.y || column >= this._cache.options.x) return null;
        return this._cache.mines.some((value, index, array) => {
            return value === row * this._cache.options.x + column;
        });
    }

    /**
      * Opens a cell.
      * @param row  The row index.
      * @param column  The column index.
      */
    public open(row: number, column: number): boolean {
        if (this._cache.end || row < 0 || column < 0 || row >= this._cache.options.y || column >= this._cache.options.x) return null;
        let tCell = document.getElementById(this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
        let isFirst = !this._cache.start;
        if (isFirst) this._cache.start = new Date();
        if (!tCell.className || !tCell.className.startsWith("ali-state-active-t ")) tCell.className = "ali-state-active-t";
        if (this._cache.opened.some((value, index, array) => {
            return value === row * this._cache.options.x + column;
        })) return this.isMine(row, column);
        this._cache.opened.push(row * this._cache.options.x + column);
        if (this.isMine(row, column)) {
            if (isFirst && new Date().getTime() - this._cache.start.getTime() < 1000) {
                this.start(this._cache.options);
                return this.open(row, column);
            }

            tCell.innerHTML = "X";
            this._fail();
            return false;
        }

        let rows = [row];
        if (row > 0) rows.push(row - 1);
        if (row < this._cache.options.y) rows.push(row + 1);
        let columns = [column];
        if (column > 0) columns.push(column - 1);
        if (column < this._cache.options.x) columns.push(column + 1);
        let num = (this.isMine(row - 1, column - 1) ? 1 : 0)
            + (this.isMine(row - 1, column) ? 1 : 0)
            + (this.isMine(row - 1, column + 1) ? 1 : 0)
            + (this.isMine(row, column - 1) ? 1 : 0)
            + (this.isMine(row, column + 1) ? 1 : 0)
            + (this.isMine(row + 1, column - 1) ? 1 : 0)
            + (this.isMine(row + 1, column) ? 1 : 0)
            + (this.isMine(row + 1, column + 1) ? 1 : 0);
        if (num > 0) {
          tCell.innerHTML = num.toString();
          tCell.className += " ali-x-num-" + (num > 6 ? 6 : num).toString();
        }

        if (this._cache.opened.length >= this._cache.options.x * this._cache.options.y - this._cache.options.count) this._success();
        if (num === 0) {
            this._openRound(row, column);
        }

        return true;
    }

    private _cell(row: number, column: number) {
        let tCell = document.createElement("td");
        tCell.id = this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString();
        tCell.innerHTML = "&nbsp;";
        tCell.addEventListener("click", (ev) => {
            this.open(row, column);
        });
        return tCell;
    }

    private _fail() {
        this._cache.end = true;
        let costing = this._costing();
        this._cache.start = undefined;
        this._cache.mines.forEach((value, index, array) => {
            let column = value % this._cache.options.x;
            let row = Math.floor(value / this._cache.options.x);
            let tCell = document.getElementById(this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
            if (!!tCell) {
                tCell.innerHTML = "X";
                tCell.className = tCell.className === "ali-state-active-t" ? "ali-state-active-t ali-x-num-err" : "ali-x-num-err";
            }
        });
        alert("Game over. Better luck next time!\nCosting " + costing + ".");
    }

    private _success() {
        this._cache.end = true;
        let costing = this._costing();
        this._cache.start = undefined;
        alert("Congratulations!\nCosting " + costing + ".");
    }

    private _costing() {
        if (!this._cache.start) return "unknown";
        let sec = Math.floor((new Date().getTime() - this._cache.start.getTime()) / 1000);
        if (sec < 10) return "0:0" + sec;
        if (sec < 60) return "0:" + sec;
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        if (min < 60) return min + ":" + (sec < 10 ? "0" : "") + sec;
        var h = Math.floor(min / 60);
        if (h > 100) return "too many days";
        min = min % 60;
        return h + ":" + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;;
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
    let mines: number[] = [];
    let mineStart = 0;
    for (let i = 0; i < count; i++) {
        let random = Math.random() * (total - count - mineStart + i) / Math.sqrt(Math.sqrt(total));
        if (random < 1) random = 1;
        mineStart = parseInt(random.toFixed()) + mineStart;
        mines.push(mineStart);
    }

    return mines;
}
