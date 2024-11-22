import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service redux;

  count = this.redux.selector(this, state => state.counter.value);
}
