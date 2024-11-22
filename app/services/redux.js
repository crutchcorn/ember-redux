import Service from '@ember/service';
import { store } from '../store';
import { createSubscription } from './redux-utils/Subscription';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

const refEquality = (a, b) => a === b;

class State {
  @tracked value;
  constructor(val) {
    this.value = val;
  }
}

export default class ReduxService extends Service {
  store = store;
  dispatch = store.dispatch;

  subscription = createSubscription(store);

  constructor(props) {
    super(props);

    this.subscription.onStateChange = this.subscription.notifyNestedSubs;
    this.subscription.trySubscribe();
  }

  willDestroy() {
    this.subscription.tryUnsubscribe();
    this.subscription.onStateChange = undefined;
  }

  selector(componentThis, selector, equalityFnOrOptions = {}) {
    const { equalityFn = refEquality } =
      typeof equalityFnOrOptions === 'function'
        ? { equalityFn: equalityFnOrOptions }
        : equalityFnOrOptions;

    const selectedState = new State(selector(store.getState()));

    const unsubscribe = this.subscription.addNestedSub(() => {
      const data = selector(store.getState());
      if (equalityFn(selectedState.value, data)) {
        return;
      }

      selectedState.value = data;
    });

    registerDestructor(componentThis, () => {
      unsubscribe();
    });

    return selectedState;
  }
}
