import { useCallback, useState } from "react"
import useMount from "./useMount"
//实现组件初始化发送请求，获取数据
//手动发送请求
interface IOptions{
    params:Record<string,string>;
    mauanl?:boolean;
    OnSuccess?:(res:unknown)=>void;
    OnError?:(err:unknown)=>void;
}
const useRequest = (
    service:(params:Record<string,string>)=>Promise<unknown>,
    options:IOptions
    )=>{
    const [data,setData] = useState<unknown>();
    const [loading,setLoading] = useState<boolean>(false);
    const init = useCallback(
    (curParams:Record<string,string>)=>{
        setLoading(true);
        return service(curParams)
        .then((res)=>{
            setData(res);
            setLoading(false);
            options.OnSuccess&&options.OnSuccess(res);
        })
        .catch((error)=>{
            setLoading(false);
            options.OnError&&options.OnError(error);
        });
    },
    [service]
    )
    useMount(()=>{
        if(!options.mauanl){
            init(options.params);
        }
    });
    const run = (runParams:Record<string,string>) => init(runParams);
    return {loading,data,run};
}

export default useRequest