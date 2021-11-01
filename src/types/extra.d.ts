/**
 * Data Base Properties
 */
export interface DataBase
{
  id: number,
  createdAt: string,
  upadateAt: string
}

/**
 * Services Extra Types
 */

export interface ErrorData
{
  error: string,
  message: string
  statusCode: number
}
/**
 * Ionly id
 * @template T 
 */
export interface IOnlyId<T = number>
{
  id: T;
}