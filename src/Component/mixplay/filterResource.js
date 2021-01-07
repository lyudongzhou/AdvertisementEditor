export default function(cmpConfig){
    let arr = [];
    cmpConfig.props.components.forEach((cmp)=>{
        arr.push(cmp.resUrl);
    });
    return arr;
}