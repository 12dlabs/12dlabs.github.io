/*  --------------------
 *  Minesweeper - Alibaba
 *  (c) Kingcean Tuan, 2015.
 *
 *  File  index.ts
 *  Description  Minesweeper game.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/**
  * The minesweeper instance.
  */
var Minesweeper = /** @class */ (function () {
    /**
      * Initializes a new instance of the Minesweeper class.
      * @param id  The identifier of the element container to fill.
      */
    function Minesweeper(id) {
        this._cache = { end: false };
        this._cache.element = typeof id === "string" ? document.getElementById(id) : id;
        this._cache.element.className = "ali-toys-minesweeper";
    }
    /**
      * Gets all mines by an index array.
      */
    Minesweeper.prototype.mines = function () {
        return this._cache.mines;
    };
    ;
    /**
      * Start a new game.
      * @param options  The options.
      */
    Minesweeper.prototype.start = function (options) {
        this._cache.options = options;
        this._cache.element.innerHTML = "";
        var table = document.createElement("table");
        var tBody = document.createElement("tbody");
        table.appendChild(tBody);
        this._cache.mines = randomNumbers(options.x * options.y, options.count);
        this._cache.opened = [];
        this._cache.end = false;
        this._cache.start = null;
        for (var row = 0; row < options.y; row++) {
            var tRow = document.createElement("tr");
            tBody.appendChild(tRow);
            for (var column = 0; column < options.x; column++) {
                var tCell = this._cell(row, column);
                tRow.appendChild(tCell);
            }
        }
        this._cache.element.appendChild(table);
    };
    /**
      * Checks whether the specific cell is a mine.
      * @param row  The row index.
      * @param column  The column index.
      */
    Minesweeper.prototype.isMine = function (row, column) {
        var _this = this;
        if (row < 0 || column < 0 || row >= this._cache.options.x || column >= this._cache.options.y)
            return null;
        return this._cache.mines.some(function (value, index, array) {
            return value === row * _this._cache.options.y + column;
        });
    };
    /**
      * Opens a cell.
      * @param row  The row index.
      * @param column  The column index.
      */
    Minesweeper.prototype.open = function (row, column) {
        var _this = this;
        if (this._cache.end || row < 0 || column < 0 || row >= this._cache.options.x || column >= this._cache.options.y)
            return null;
        var tCell = document.getElementById(this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
        var isFirst = !this._cache.start;
        if (isFirst)
            this._cache.start = new Date();
        if (!tCell.className || !tCell.className.startsWith("ali-state-active-t "))
            tCell.className = "ali-state-active-t";
        if (this._cache.opened.some(function (value, index, array) {
            return value === row * _this._cache.options.y + column;
        }))
            return this.isMine(row, column);
        this._cache.opened.push(row * this._cache.options.y + column);
        if (this.isMine(row, column)) {
            if (isFirst && new Date().getTime() - this._cache.start.getTime() < 1000) {
                this.start(this._cache.options);
                return this.open(row, column);
            }
            tCell.innerHTML = "X";
            this._fail();
            return false;
        }
        var rows = [row];
        if (row > 0)
            rows.push(row - 1);
        if (row < this._cache.options.x)
            rows.push(row + 1);
        var columns = [column];
        if (column > 0)
            columns.push(column - 1);
        if (column < this._cache.options.y)
            columns.push(column + 1);
        var num = (this.isMine(row - 1, column - 1) ? 1 : 0)
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
        if (this._cache.opened.length >= this._cache.options.x * this._cache.options.y - this._cache.options.count)
            this._success();
        if (num === 0) {
            this._openRound(row, column);
        }
        return true;
    };
    Minesweeper.prototype._cell = function (row, column) {
        var _this = this;
        var tCell = document.createElement("td");
        tCell.id = this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString();
        tCell.innerHTML = "&nbsp;";
        tCell.addEventListener("click", function (ev) {
            _this.open(row, column);
        });
        return tCell;
    };
    Minesweeper.prototype._fail = function () {
        var _this = this;
        this._cache.end = true;
        var costing = this._costing();
        this._cache.start = undefined;
        this._cache.mines.forEach(function (value, index, array) {
            var total = _this._cache.options.x * _this._cache.options.y;
            var column = value % _this._cache.options.y;
            var row = (value - column) / _this._cache.options.y;
            var tCell = document.getElementById(_this._cache.element.id + "_table_b_r" + row.toString() + "_c" + column.toString());
            if (!!tCell) {
                tCell.innerHTML = "X";
                tCell.className = tCell.className === "ali-state-active-t" ? "ali-state-active-t ali-x-num-err" : "ali-x-num-err";
            }
        });
        alert("Game over. Better luck next time!\nCosting " + costing + ".");
    };
    Minesweeper.prototype._success = function () {
        this._cache.end = true;
        var costing = this._costing();
        this._cache.start = undefined;
        alert("Congratulations!\nCosting " + costing + ".");
    };
    Minesweeper.prototype._costing = function () {
        if (!this._cache.start)
            return "unknown";
        var sec = Math.floor((new Date().getTime() - this._cache.start.getTime()) / 1000);
        if (sec < 10)
            return "0:0" + sec;
        if (sec < 60)
            return "0:" + sec;
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        if (min < 60)
            return min + ":" + (sec < 10 ? "0" : "") + sec;
        var h = Math.floor(min / 60);
        if (h > 100)
            return "too many days";
        min = min % 60;
        return h + ":" + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
        ;
    };
    Minesweeper.prototype._openRound = function (row, column) {
        this.open(row - 1, column - 1);
        this.open(row - 1, column);
        this.open(row - 1, column + 1);
        this.open(row, column - 1);
        this.open(row, column + 1);
        this.open(row + 1, column - 1);
        this.open(row + 1, column);
        this.open(row + 1, column + 1);
    };
    return Minesweeper;
}());
/**
  * Generates an array of random number by given scope.
  * @param total  The maxinum number.
  * @param count  The count of random numbers.
  */
function randomNumbers(total, count) {
    var mines = [];
    var mineStart = 0;
    for (var i = 0; i < count; i++) {
        var random = Math.random() * (total - count - mineStart + i) / Math.sqrt(Math.sqrt(total));
        if (random < 1)
            random = 1;
        mineStart = parseInt(random.toFixed()) + mineStart;
        mines.push(mineStart);
    }
    return mines;
}
//# sourceMappingURL=index.js.map