import Sign from "../sign/signature.vue"
import AutoSign from "../sign/autoSign.vue"

const install = (Vue) => {
    Vue.component(Sign.name, Sign)
    Vue.component(AutoSign.name, AutoSign)
}

export default install