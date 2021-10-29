/**
 * Data Base Properties
 */
export interface DataBase {
  id: number | null,
  createdAt: string,
  upadateAt: string
}

/**
 * Services Extra Types
 */

export interface ErrorData {
  error: string,
  message: string
  statusCode: number
}