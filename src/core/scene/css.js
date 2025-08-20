import { UIElement } from "ziko";
import * as THREE from "three"
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { TGLScene } from "./gl.js";
import { ui3 } from "../object-3d/index"
import { TglObject3D } from "../object-3d/tgl-object3d.js";
class TGLSceneCss extends TGLScene{
    constructor(w,h){
        super(w,h)
        this.sceneCss=new THREE.Scene();
        this.rendererCss=new CSS3DRenderer();
        this.rendererCss.domElement.appendChild(this.rendererGl.domElement );
        this.rendererTarget=this.rendererCss;
        this.canvas.setTarget(this.element)
        this.element.appendChild(this.rendererCss.domElement);
        this.canvas.style({
            position:"absolute"
        })
        this.useOrbitControls()
        this.cache.controls.orbit.onChange(()=>{this.renderGl().renderCss()});
        this.cache.type="css";
    }
    renderCss(){
        this.rendererCss.render(this.sceneCss,this.camera.currentCamera);
        return this;
    }
    maintain(renderGl=true,renderCss=true){
        this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
        this.camera.currentCamera.updateProjectionMatrix();
        this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
        this.rendererCss.setSize(this.element.clientWidth,this.element.clientHeight);
        for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
        this.length = this.items.length;
        if(renderGl)this.renderGl()
        if(renderCss)this.renderCss()
        return this;
    }
    add(...obj){
        let rerenderGl=false;
        let rerenderCss=false;
        obj=obj.map(n=>n instanceof UIElement? ui3 (n):n)
		obj.map(n=>{
			if(n instanceof TglObject3D){
                if(n.cache.type==="gl"){
                    this.sceneGl.add(n.element);
                    rerenderGl=true;
                }
                else if(n.cache.type==="css"){
                    this.sceneCss.add(n.element); 
                    rerenderCss=true
                }            
                this.items.push(n);
                n.parent=this;  
			}
		});
        this.maintain(rerenderGl,rerenderCss);
		return this;
	}
    remove(...obj){
        if(obj.length==0){
            if(this.Target.children.length) this.Target.removeChild(this.element);
          }
        else{
        let rerenderGl=false;
        let rerenderCss=false;
		obj.map((n,i)=>{
            if(n.cache.type==="gl"){
                rerenderGl=true;
                this.sceneGl.remove(obj[i].element);
            }
            else if(n.cache.type==="css"){
                rerenderCss=true;
                this?.sceneCss?.remove(obj[i].element);
            }
        });
        this.items=this.items.filter(n=>!obj.includes(n));
        this.maintain(rerenderGl,rerenderCss);
    }
		return this;
    }
}

const SceneCss=(w,h)=>new TGLSceneCss(w,h)
export{
    TGLSceneCss,
    SceneCss
}