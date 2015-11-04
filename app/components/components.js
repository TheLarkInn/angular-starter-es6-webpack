import homeComponent from './home/home';
import heroComponent from './hero/hero';

export default app => {
  INCLUDE_ALL_MODULES([homeComponent, heroComponent], app);
}
