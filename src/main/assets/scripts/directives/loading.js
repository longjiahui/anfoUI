// import Antd from 'ant-design-vue'
// import { LoadingOutlined } from '@ant-design/icons-vue';

import { createApp, ref, Transition } from 'vue'
import shortid from 'shortid'

let apps = {}

function getApp(el){
    let id = el.dataset?.loadingAppId
    return {...apps[id], id}
}

function initPositionStyle(el){
    let style = window.getComputedStyle(el)
    let position = style?.position
    let needRelativePosition = true
    if(['fixed', 'absolute', 'sticky', 'relative'].includes(position)){
        needRelativePosition = false
    }
    if(needRelativePosition){
        el.style.position = 'relative'
    }
}

export default {
    install(app, { loadingIcon } = {}){
        app.directive('loading', {
            mounted(el, isLoading){
                let visible = ref(!!isLoading?.value)
                let id = shortid.generate()
                el.setAttribute('data-loading-app-id', id)

                // 如果el没有relative 给加上
                initPositionStyle(el)

                let div = document.createElement('div')
                div.id = id
                let app = createApp({
                    render: ()=><Transition name="fade" appear>
                        { visible.value && (
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, .9)',
                            top: 0,
                            left: 0,
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}>
                                {/* <a-spin indicator={<loadingIcon style={{fontSize: '24px'}} spin />}></a-spin> */}
                                {loadingIcon && <loadingIcon />}
                            </div> 
                        </div>) || null }
                    </Transition>
                })
                el.appendChild(div)
                // app.use(Antd)
                app.mount(div)
                apps[id] = {
                    app,
                    visible
                }
            },
            updated(el, isLoading){
                let { app, visible} = getApp(el)
                visible.value = isLoading?.value === false?false:true
                // isLoading是true,则让el不能被鼠标事件响应
                // el.style.pointerEvents = 'none'
            },
            beforeUnmount(el){
                let { app, visible, id } = getApp(el)
                app?.unmount()
                delete apps[id]
            }
        })
    }
}