export default function(cmpConfig){
    return (cmpConfig.props.voteOption || []).map(item => item.photoUrl);
}