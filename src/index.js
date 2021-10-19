import List from '@components/List'
import ListScroll from '@components/ListScroll'
import pagination from '@scripts/pagination'

import loadingDirective from '@scripts/directives/loading'

let anfoUI = {
    install( app, {
        loadingIcon,
        listPagination,
        listDataMapper,
        listScrollDataMapper,
    } = {} ){
        function component(name, com){
            app.component(`anfo-${name}`, com)
        }
        component('list', List)
        component('list-scroll', ListScroll)

        app.use(loadingDirective, { loadingIcon })
        
        app.config.globalProperties.$anfoUI = anfoUI
        app.config.globalProperties.$anfoUIListPagination = listPagination
        
        // modify args
        anfoUI.createListContext = (...rest)=>{
            let args = rest?.[0] || {}
            args.dataMapper = args.dataMapper || listDataMapper
            return pagination.createListContext(args, rest.slice(1))
        }
        anfoUI.createListScrollContext = (...rest)=>{
            let args = rest?.[0] || {}
            args.dataMapper = args.dataMapper || listScrollDataMapper
            return pagination.createListScrollContext(args, rest.slice(1))
        }
    },

    List,
    ListScroll,
    ...pagination,
}

export default anfoUI