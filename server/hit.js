'use strict';
// Intersect the shot with the player's standing hit box, including head height.
function playerHit(from,dir,pos,range){let near=0,far=range;const bounds=[[pos[0]-.55,pos[0]+.55],[pos[1]+.1,pos[1]+2.05],[pos[2]-.55,pos[2]+.55]];for(let i=0;i<3;i++){const [min,max]=bounds[i];if(Math.abs(dir[i])<1e-8){if(from[i]<min||from[i]>max)return null}else{let a=(min-from[i])/dir[i],b=(max-from[i])/dir[i];if(a>b)[a,b]=[b,a];near=Math.max(near,a);far=Math.min(far,b);if(near>far)return null}}const point=from.map((v,i)=>v+dir[i]*near);return{distance:near,point,head:point[1]>=pos[1]+1.6}}
module.exports={playerHit};
