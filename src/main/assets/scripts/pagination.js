import { reactive, computed } from "vue"

export default {
    pageData({
        api,
        pageSize = 10,
        dataMapper = res=>res,
        // (reset: boolean, d: array)
        setter
    } = {}){
        let noMoreData = false
        let page = 1
        return async function(options, ...rest){
            let { reset = false, page:_page, pageSize:_pageSize } = options || {}
            let callApi = (...rest)=>{
                let ret = api?.(...rest)
                if(!(ret instanceof Promise)){
                    return Promise.resolve(ret)
                }else{
                    return ret
                }
            }
            if(_page){
                return callApi({page: _page++, pageSize: _pageSize || pageSize}, ...rest).then(res=>{
                    let d = dataMapper(res)
                    if(typeof setter === 'function'){
                        setter.call(this, reset, d)
                    }
                })
            }else{
                if(reset){
                    page = 1
                    noMoreData = false
                }
                if(!noMoreData){
                    return callApi({page: page++, pageSize}, ...rest).then(res=>{
                        let d = dataMapper(res)
                        if(d.length < pageSize){
                            noMoreData = true
                            console.debug('no more data')
                        }
                        if(typeof setter === 'function'){
                            setter.call(this, reset, d, noMoreData)
                        }
                        return {
                            data: d,
                            noMoreData,
                            reset
                        }
                    })
                }else{
                    return {
                        data: [],
                        noMoreData,
                        reset,
                    }
                }
            }
        }
    },

    // 滚动
    createListScrollContext({condition = {}, props = {}, api, pageDataProps = {}, dataMapper = d=>d,
        afterMerge = d=>d,
        afterFetch = d=>d} = {}){
        let data = reactive({
            datas: [],
            total: 0,
            pageSize: 20,
            noMoreData: false,
            isLoading: false,
            ...props,
        })

        let _refreshDatas = this.pageData({
            api: pageParams=>api({
                ...pageParams,
                ...(()=>condition instanceof Function?condition():condition)()
            }),
            pageSize: data.pageSize,
            dataMapper,
            setter(reset, d, noMoreData){
                d = afterFetch?.(d)
                if(reset){
                    data.datas = d
                }else{
                    data.datas.push(...d)
                }
                data.noMoreData = noMoreData
                data.datas = afterMerge?.(data.datas)
            },
            ...pageDataProps,
        })

        let refreshDatas = (...rest)=>{
            data.isLoading = true
            return _refreshDatas(...rest).finally(()=>{
                data.isLoading = false
            })
        }

        return {
            data,
            refreshDatas,
            // handleAfterMerge(){
            //     if(afterMerge instanceof Function){
            //         data.datas = afterMerge(data.datas)
            //     }
            // }
        }
    },

    // 非滚动
    createListContext({condition = {}, props = {}, api, dataMapper = d=>({total: d?.total, data: d?.data})} = {}){
        let data = reactive({
            datas: [],
            total: 0,
            page: 1,
            pageSize: 20,
            isLoading: false,
            ...props
        })
        let refreshDatas = ()=>{
            data.isLoading = true
            let apiRet = api({
                page: data.page,
                pageSize: data.pageSize,
                ...(()=>condition instanceof Function?condition():condition)(),
            })
            if(!(apiRet instanceof Promise)){
                apiRet = Promise.resolve(apiRet)
            }
            return apiRet.finally(()=>data.isLoading = false)
                .then(dataMapper).then(res=>{
                    data.datas = res.data
                    data.total = res.total
                    return res
                })
        }

        return {
            data,
            refreshDatas,
            totalPage: computed(()=>Math.ceil(data.total / data.pageSize)),
        }
    },
}