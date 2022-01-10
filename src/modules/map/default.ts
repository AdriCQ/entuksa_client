import { IMapUserPosition } from './types';

export function FakeMapPositions (): IMapUserPosition[]
{
  const resp: IMapUserPosition[] = [];
  for (let i = 0; i < 5; i++)
  {
    resp.push({
      id: i,
      position: {
        address: 'Address Positoin',
        coordinate: {
          lat: 0,
          lng: 0
        },
      },
      title: `Map Title-${i}`,
    })
  }
  return resp;
}