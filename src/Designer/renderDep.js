import {renderModules} from '../Render/store/index';

export default function handleRenderDep({store}) {
  // 处理store依赖
  Object.keys(renderModules).forEach(key => store.registerModule(key, renderModules[key]));
}