/**
 * @enum ROUTE_NAME
 */
export enum ROUTE_NAME
{
  AUTH_LOGIN = 'auth.login',
  AUTH_PASSWORD_RECOVER = 'auth.pwd-recover',
  AUTH_PASSWORD_RESET = 'auth.pwd-reset',
  AUTH_REGISTER = 'auth.register',
  MAIN_HOME = 'main.home',
  // SHOP routes
  SHOP_STORE = 'shop.store',
  SHOP_OFFER = 'shop.offer',
  // User Routes
  USER_PROFILE = 'user.profile',

}
/**
 * @const CAROUSEL_BREAKPOINTS
 */
export const CAROUSEL_BREAKPOINTS = {
  // 320px and up
  320: {
    itemsToShow: 2,
    snapAlign: 'start'
  },
  480: {
    itemsToShow: 3,
    snapAlign: 'start'
  },
  640: {
    itemsToShow: 4,
    snapAlign: 'start'
  },
  // 800: {
  //   itemsToShow: 5,
  //   snapAlign: 'start'
  // },
  // 1024: {
  //   itemsToShow: 6,
  //   snapAlign: 'start'
  // }
};