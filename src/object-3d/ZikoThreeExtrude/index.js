import { ZikoThreeMesh } from "../ZikoThreePrimitives/ZikoThreeMesh.js";
import { ZikoThreeGroupe } from "../ZikoThreeGroupe";
class ZikoThreeExtrude extends ZikoThreeMesh{
    constructor(shape,depth=5,bevelEnabled=false){
        super()
        this.element=new THREE.Mesh(
            new THREE.ExtrudeGeometry(shape, {
            depth,
            bevelEnabled
        }));
        Object.assign(this.cache,{
			type:"extrude"
		})
    }
    get type(){
		return "svg";
	}
}
class ZikoThreeExtrudeSvg extends ZikoThreeGroupe{
    constructor(svg,depth=5,bevelEnabled=false){
        super()
        this.add(...loadSVG(svg).map(n=>extrude3(n,depth,bevelEnabled)))
    }
    get type(){
		return "svg";
	}
}
const extrude3=(shape,depth=5,bevelEnabled=false)=>new ZikoThreeExtrude(shape,depth,bevelEnabled);
//const svg3=(svg,depth=5,bevelEnabled=false)=>groupe3(...loadSVG(svg).map(n=>extrude3(n,depth,bevelEnabled)))
const svg3=(svg,depth=5,bevelEnabled=false)=>new ZikoThreeExtrudeSvg(svg,depth,bevelEnabled)
export {
    extrude3,
    svg3
}