import { defer } from "react-router-dom";
import { proxy } from "valtio";

const state = proxy({});

const actions = {
    init: async () => {
        return defer({});
    },
};

export default {
    state,
    ...actions,
};
