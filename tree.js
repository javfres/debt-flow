

class VValue {
    
    constructor(){
        this.value = null;
    }
    
    set(value){
        this.value = value;
    }
    
    get(){
        return this.value;
    }
    
}



class Vertice {
    
    constructor(name){
        this.name = name;
        this.value = null;
    }
    
    setValue(value){
        this.value = value;
    }
    
    getValue(){
        return this.value;
    }
    
}


class Node {
    
    constructor(name){
        this.name = name;
        this.vertices = [];
    }
    
    addVertice(name){
        
        let v = this.getVertice(name);
        if(v) return v;
        
        v = new Vertice(name);
        this.vertices.push(v); 
        
        return v;
    }
    
    
    getVertice(name){
        for(let i=0; i<this.vertices.length; i++){
            let vertice = this.vertices[i];
            if(vertice.name === name) return vertice;
        }
        return null;
    }
    
}


class Tree {
    
    constructor(){
        this.nodes = [];
    }
    
    addNode(name){
        let node = this.getNode(name);
        if(node) return node;
        node = new Node(name);
        this.nodes.push(node);
        return node;
    }
    
    getNode(name){
        for(let i=0; i<this.nodes.length; i++){
            let node = this.nodes[i];
            if(node.name === name) return node;
        }
        return null;
    }
    
    
    set(a,b,value){
        
        let na = this.addNode(a);        
        let va = na.addVertice(b);
        let vva = va.getValue();

        let vvv = vva ? vva : new VValue();
        
        va.setValue(vvv);
        
        vvv.set(value);
    }
    
    get(a,b){
        let na = this.addNode(a);
        let v = na.getVertice(b);
        if(!v) return null;
        
        let vv = v.getValue();
                
        return vv.get();
    }
    
    
    map(fn){
        
        this.nodes.map(n => {
            n.vertices.map(v => {
                fn(n.name, v.name, v.value.get(), v.value);
            });
        });
        
    }
    
    
}






module.exports = Tree;
