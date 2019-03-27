import { UserState } from './user';
import { AppState } from './app-state';
// This contains the entire state of the system
export class State {
  user: UserState;
  app: AppState;
  message: string;
}
