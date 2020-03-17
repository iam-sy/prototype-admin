import constants from '../../common/config';
import instance from '@/utils/extensions/axios';

export function uploadImage(simplemde, params) {
    let makeRequest = params => {
        return instance.post('/api/upload', params);
    };
    let requests = params.map(makeRequest);
    instance.spread = callback => {
        return arr => {
            return callback.apply(null, arr);
        };
    };
    Promise.all(requests).then(
        instance.spread((...resps) => {
            for (let i = 0; i < resps.length; i++) {
                let { status, data } = resps[i];
                const resData = data.data;
                if (status !== 200) {
                    continue;
                }
                let url = `![](${constants.apiAdress}/uploads/${resData.filename})`;
                let content = simplemde.value();
                simplemde.value(content + url + '\n');
            }
        }),
    );
}
