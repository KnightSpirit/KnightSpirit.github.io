let Vue = require('vue')
class Event{
    constructor(){
        this.event = {};
    }

    on(attr, callback){
        if(this.event[attr]){
            this.event[attr].push(callback);
        } else{
            this.event[attr] = [callback];
        }
    }

    emit(attr, bubble, ...args){
        if (this.event[attr]){
            if(!bubble){
                this.event[attr][this.event[attr].length - 1]();
                return;
            }
            this.event[attr].forEach(item =>{
                item(...args);
            })
        }
    }
}

function Observe(data, eventBus) {
    if (typeof data !== 'object')
        console.log("pass object"); 

    this.data = data;
    this.eventBus = !eventBus ? new Event() : eventBus;
    createObject(this.data, data, this.eventBus);
}

Observe.prototype.$watch = function(p, func){
    setSonPropertyEvent(p, this.data, this.eventBus, func);
}

function setSonPropertyEvent(pName, parent, eventBus, func){
    for (let obj in parent){
        if(parent.hasOwnProperty(obj)){
            if(pName === obj){
                eventBus.on(pName, func);
                if(typeof parent[obj] === 'object'){
                    for(let son in parent[pName]){
                        setSonPropertyEvent(son, parent[pName], eventBus, func);
                    }
                } 
            } 
        }
    }
}

// function watchProperty(depth, tar, p, func, reDepth){
//     for(let pName in tar){
//         if(depth > reDepth) {
//             watchProperty(depth, tar[pName], p, func, reDepth + 1);
//         } else{
//             if(pName === p[reDepth - 1]){
//                 createProperty(tar, pName, tar[pName], func);
//             }
//         }
//     }
// }

function createObject(tar, data, observe) {
    for (let key in data) {
        if(!data.hasOwnProperty(key)) return;
        if(typeof data[key] === 'object') {
            new Observe(data[key], observe);
        }
        createProperty(tar, key, data[key], observe);
    }
}

function createProperty(tar, key, val, observe){
    Object.defineProperty(tar, key,  {
        get() {
            return val; 
        }, 
        set(v) {
            if(val === v) return;
            if (typeof v === 'object'){
                new Observe(v)
            }
            observe.emit(key, false, v);
            val = v;
        }
    });
}


let obj = {
 a: 1,
 b: 2,
 c: {
     d: 3,
     e: 4
 }
}

// let s = new Observe(obj)

// s.$watch('c', a =>{
//     console.log(`重新设置参数, 值为${a}`);
// })
// s.$watch('d', a =>{
//     console.log(`重新设置内部参数, 值为${a}`);
// })



