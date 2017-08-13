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

function Observe(data) {
    if (typeof data !== 'object')
        console.log("pass object"); 

    this.data = data;
    createObject(this.data, data);
    // walk(data);
    // function walk(data){
    //     Object.keys(data).forEach(key => convert(key, data[key]));
    // }

    // function convert(key, val){
    //     defineReactive(data, key, val);
    // }

    // function defineReactive(data, key, val){
    //     let dep = new Dep();
    //     let cObj = observe(val);
    //     Object.defineProperty(obj, key, {
    //         enumerable: true,
    //         configurable: true,
    //         get:() => {
    //             console.log(`access ${key}`);
    //             return val;
    //         },
    //         set: v => {
    //             cObj = observe(newval);
    //             dep.notify();
    //         }
    //     })
    // }

    // function observe(val, vm){
    //     if(!val || typeof val !== 'object'){
    //         return;
    //     }
    //     return new Observe(val);
    // }
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

function createProperty(tar, key, val){
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
            val = v;
            console.log(`set${key}, newValue:${val}`)
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
