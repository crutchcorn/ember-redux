import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { increment } from '../store/counter-slice';

export default class DashboardController extends Controller {
  @service redux;

  count = this.redux.selector(this, (state) => state.counter.value);

  addOne = () => this.redux.dispatch(increment());
}
