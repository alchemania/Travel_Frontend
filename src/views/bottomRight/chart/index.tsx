import {defineComponent, reactive, onMounted} from 'vue'
import Draw from './draw'
import {api_hotel_all} from "@/utils/request";
import axios from "axios";


// @ts-ignore
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        const cdata = reactive({
            timeline: [],
            ap: [],
            ap5: [],
            ar: [],
            ar5: []
        })

        // methods
        const setData = res => {
            cdata.timeline = res.timeline
            cdata.ap = res.ap
            cdata.ap5 = res.ap5
            cdata.ar = res.ar
            cdata.ar5 = res.ar5
            console.log(cdata)
        }

        // 生命周期
        onMounted(() => {
            // @ts-ignore
            axios.post(api_hotel_all).then(res => {
                console.log(res.data)
                setData(res.data)
            })
        })

        return () => {
            return <div>
                <Draw cdata={cdata}/>
            </div>
        }
    }
});