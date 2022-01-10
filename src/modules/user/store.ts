import { reactive, ref, InjectionKey } from 'vue';
import { UserServices } from './service';
import { IUserProfile, IUserStorage, IAuthSignInReq, IAuthRes } from './types';
import { PlatformInstance } from 'src/helpers';
import { IMapUserPosition } from '../map/types';
import { MapService } from '../map/service';
/**
 * STORAGE_KEY
 */
const STORAGE_KEY = 'storage/users';
/**
 * UserStore
 */
export class UserStore
{
    private services = UserServices();
    private $mapServices = new MapService();
    /**
     * Properties
     */
    private _profile = reactive<IUserProfile>({
        id: 0,
        createdAt: '',
        upadateAt: '',
        name: '',
        lastName: '',
        email: '',
        mobilePhone: '',
        password: '',
        roles: []
    });;
    private _authToken = ref<string | null>(null);
    private _mapPositions = ref<IMapUserPosition[]>([]);
    /**
     * Auth Token Getter & Setter
     */
    get authToken () { return this._authToken.value; }
    set authToken (newAuthToken: string | null) { this._authToken.value = newAuthToken; }
    /**
     * Is Auth
     */
    get isAuth () { return this._authToken ? true : false }
    /**
     * Gets & Sets map positions
     */
    get mapPositions () { return this._mapPositions.value; }
    set mapPositions (_p: IMapUserPosition[]) { this._mapPositions.value = _p; }
    /**
     * Profile Getter & Setter
     */
    get profile () { return this._profile; }
    set profile (newUser: IUserProfile) { this._profile = newUser; }
    /**
     * Load From storage
     */
    async load ()
    {
        try
        {
            const get = await PlatformInstance.StorageGet<IUserStorage>(STORAGE_KEY);
            if (get)
            {
                this.authToken = get.authToken;
                this.profile = get.profile;
            }
        } catch (error) { throw error; }
    }
    /**
     * Loads map positions
     * @returns  
     */
    async loadMapPositions ()
    {
        try
        {
            const resp = await this.$mapServices.getUserPositions();
            this.mapPositions = resp.data;
            return this.mapPositions;
        } catch (error) { throw error; }
    }
    /**
     * saveOnStorage
     */
    async save ()
    {
        try
        {
            await PlatformInstance.StorageSet<IUserStorage>({
                key: STORAGE_KEY,
                value: {
                    authToken: this.authToken,
                    profile: this.profile
                }
            });
        } catch (error) { throw error; }
    }
    /**
     * singIn
     * @param _p 
     * @returns 
     */
    async singIn (_p: IAuthSignInReq): Promise<IAuthRes>
    {
        try
        {
            const data = (await this.services.signIn(_p)).data;
            this._authToken.value = data.token;
            this._profile = data.user;
            await this.save();
            return data;
        } catch (error)
        {
            throw error;
        }
    }
}
/**
 * 
 */
export const userStore = new UserStore();
/**
 * 
 */
export const userInjectionKey: InjectionKey<UserStore> = Symbol('User');