# Ember 3.24 <-> Redux Demo

This PR showcases a Redux service to glue framework-agnostic Redux and Redux Toolkit code into Ember:

```javascript
// app/controllers/application.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { increment } from '../store/counter-slice';

export default class DashboardController extends Controller {
  @service redux;

  count = this.redux.selector(this, (state) => state.counter.value);

  addOne = () => this.redux.dispatch(increment());
}
```

```javascript
// counter-slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

## Usecase

By using Redux as the central store for an Ember app, you can glue the code into React or other supported frameworks and have a single store for multiple frameworks for a migration away from Ember.

## Demo Site

To see a quick demo of the counter working, you can go to:

[https://crutchcorn.github.io/ember-redux/](https://crutchcorn.github.io/ember-redux/)

## Local Execution

To run this demo:

- `npm install`
- `npm run start`
- Open [http://localhost:4200/ember-redux/](http://localhost:4200/ember-redux/) in your browser
