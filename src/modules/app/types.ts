export interface IAppLeftDrawerConfig
{
  mini: boolean;
}
/**
 * Iapp block config
 */
export interface IAppBlockConfig
{
  title?: string;
  displayDense?: boolean;
  showTitle?: boolean;
  ratio?: number;
  more?: boolean;
  slidesToShow?: number;
  vendor?: boolean;
  loading?: boolean;
  displayOnly?: 'MOBILE' | 'DESKTOP';
}