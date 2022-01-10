import { api } from 'src/boot/axios';
import { IMapUserPosition } from './types';
/**
 * @class MapService
 */
export class MapService
{
    private BASE_PATH = '/api/map';
    /**
     * Creates user position
     * @param _pos IMapUserPosition
     */
    createUserPosition (_pos: { position: IMapUserPosition; title: string }) { return api.post<IMapUserPosition>(`${this.BASE_PATH}/user-positions`, _pos) }
    /**
     * getUserPositions
     */
    getUserPositions () { return api.get<IMapUserPosition[]>(`${this.BASE_PATH}/user-positions`) }
}