export default function(cmpConfig){
    let arr = [];
    cmpConfig.props.components.forEach((cmp)=>{
        arr.push(cmp.sourcePaht);
    });
    return arr;
}