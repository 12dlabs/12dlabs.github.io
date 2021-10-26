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
declare class Minesweeper {
    private _cache;
    /**
      * Initializes a new instance of the Minesweeper class.
      * @param id  The identifier of the element container to fill.
      */
    constructor(id: string | HTMLElement);
    /**
      * Gets all mines by an index array.
      */
    mines(): number[];
    /**
      * Start a new game.
      * @param options  The options.
      */
    start(options: OptionsContract): void;
    /**
      * Checks whether the specific cell is a mine.
      * @param row  The row index.
      * @param column  The column index.
      */
    isMine(row: number, column: number): boolean;
    /**
      * Opens a cell.
      * @param row  The row index.
      * @param column  The column index.
      */
    open(row: number, column: number): boolean;
    private _cell;
    private _fail;
    private _success;
    private _costing;
    private _openRound;
}
/**
  * Generates an array of random number by given scope.
  * @param total  The maxinum number.
  * @param count  The count of random numbers.
  */
declare function randomNumbers(total: number, count: number): number[];
