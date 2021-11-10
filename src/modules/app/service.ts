import { api } from 'src/boot/axios';
import { IAppResponseSetup } from './types';
/**
 * AppService
 */
export function AppService ()
{
  const setup = () => api.get<IAppResponseSetup>('/application/setup');

  return {
    setup
  }
}