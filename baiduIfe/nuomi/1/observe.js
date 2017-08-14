// class Dep {
//   constructor() {
//     this.subs = []
//   }
//   addSub(sub){
//     this.subs.push(sub)
//   }
//   notify(){
//     this.subs.forEach(sub=>sub.update())
//   }
// }
class Message{
    constructor(){
        this.subs = [];
    }

    addSub(sub){
        this.subs.push(sub);
    }

    notify(){
        this.subs.forEach(sub => sub.update())
    }
}

function Observe(data) {
    if (typeof data !== 'object')
        console.log("pass object"); 

    this.data = data;
    createObject(this.data, data);
}

Observe.prototype.$watch = function(p, func){
    let reDepth = 1;
    let propertyChainArray = p.split('.');
    let depth = propertyChainArray.length;
    redefineProperty(depth, this.data, propertyChainArray, func, reDepth);
}

function watchProperty(depth, tar, p, func, reDepth){
    for(let pName in tar){
        if(depth > reDepth) {
            watchProperty(depth, tar[pName], p, func, reDepth + 1);
        } else{
            if(pName === p[reDepth - 1]){
                createProperty(tar, pName, tar[pName], func);
            }
        }
    }
}

function createObject(tar, data) {
    for (let key in data) {
        if(!data.hasOwnProperty(key)) return;
        if(typeof data[key] === 'object') {
            new Observe(data[key]);
        }
        createProperty(tar, key, data[key]);
    }
}

function createProperty(tar, key, val, callback){
    let m = new Message();
    Object.defineProperty(tar, key,  {
        get() {
            console.log(`access ${key}`)
            return val; 
        }, 
        set(v) {
            if(val === v) return;
            if (typeof v === 'object'){
                new Observe(v)
            }
            if(callback) callback(v);
            m.notify();
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

let s = new Observe(obj)

s.$watch('c.d', function(a){
    console.log(`重新设置参数, 值为${a}`);
})

// 观察者构造函数
// function Observer(data) {
//     this.data = data;
//     this.walk(data)
// }

// let p = Observer.prototype;

// // 此函数用于深层次遍历对象的各个属性
// // 采用的是递归的思路
// // 因为我们要为对象的每一个属性绑定getter和setter
// p.walk = function (obj) {
//     let val;
//     for (let key in obj) {
//         // 这里为什么要用hasOwnProperty进行过滤呢？
//         // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
//         // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
//         if (obj.hasOwnProperty(key)) {
//             val = obj[key];

//             // 这里进行判断，如果还没有遍历到最底层，继续new Observer
//             if (typeof val === 'object') {
//                 new Observer(val);
//             }

//             this.convert(key, val);
//         }
//     }
// };

// p.convert = function (key, val) {
//     Object.defineProperty(this.data, key, {
//         enumerable: true,
//         configurable: true,
//         get: function () {
//             console.log('你访问了' + key);
//             return val
//         },
//         set: function (newVal) {
//             console.log('你设置了' + key);
//             console.log('新的' + key + ' = ' + newVal)
//             if (newVal === val) return;
//             val = newVal
//         }
//     })
// };

// let data = {
//     user: {
//         name: "liangshaofeng",
//         age: "24"
//     },
//     address: {
//         city: "beijing"
//     }
// };

// let app = new Observer(data);
