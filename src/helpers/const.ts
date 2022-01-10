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
    // MAP
    MAP_MY_LOCATIONS = 'map.my-locations',
    // SHOP routes
    SHOP_CART = 'shop.cart',
    SHOP_CHECKOUT = 'shop.checkout',
    SHOP_OFFER = 'shop.offer',
    SHOP_STORE = 'shop.store',
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

export const CFG_COORDINATES = {
    ABREUS: {
        lat: 22.28056, lng: -80.56778
    }, AGUADA: {
        lat: 22.38472, lng: -80.84611
    }, CIENFUEGOS: {
        lat: 22.14583, lng: -80.43639
    }, CRUCES: {
        lat: 22.34222, lng: -80.27611
    }, CUMANAYAGUA: {
        lat: 22.15250, lng: -80.20111
    }, LAJAS: {
        lat: 22.41639, lng: -80.29056
    }, PALMIRA: {
        lat: 22.241354, lng: -80.392777
    }, RODAS: {
        lat: 22.34278, lng: -80.55528
    },
}
