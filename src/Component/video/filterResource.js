export default function(cmpConfig){
    let arr = [];
    cmpConfig.props.arrResources.forEach(({uuid,name,url})=>{
        arr.push({
            uuid,name,url
        });
    });
    return arr;
}