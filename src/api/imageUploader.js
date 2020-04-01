import constants from '../../common/config';
import { axiosApiAuth } from '@/utils/extensions/axios';

export function uploadImage(simplemde, params) {
    let makeRequest = params => {
        return axiosApiAuth.post('/api/upload', params);
    };
    let requests = params.map(makeRequest);
    axiosApiAuth.spread = callback => {
        return arr => {
            return callback.apply(null, arr);
        };
    };
    Promise.all(requests).then(
        axiosApiAuth.spread((...resps) => {
            for (let i = 0; i < resps.length; i++) {
                let { status, data } = resps[i];
                const resData = data.data;
                if (status !== 200) {
                    continue;
                }
                const path = resData.destination.replace('public/', '');
                let url = `![](${process.env.VUE_APP_API_ADDRESS}/${path}/${resData.filename})`;
                if (simplemde) {
                    let content = simplemde.value();
                    simplemde.value(content + url + '\n');
                }
            }
        }),
    );
}
