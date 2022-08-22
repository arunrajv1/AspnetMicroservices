import { Action } from "../actions/index";
import { ActionType } from "../action-types/index";

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionType.STORE:
      return {};
    default:
      return {};
  }
};

export default reducer;
