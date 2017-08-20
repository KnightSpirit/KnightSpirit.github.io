class Vue{
    constructor(option){
        this.el = option.el;
        this.data = option.data;
        this.setValueToDom();
    }

    setValueToDom(){
        let sign = this.el.charAt(0);
        let targetDom = document.getElementById(this.el.substring(1));
        let t = targetDom.innerHTML;
        let pattern = /\{\{(.*)?\}\}/g;
        let matches = t.match(pattern);
        console.log(matches);
        for(let i = 0; i < matches.length; i ++){
            let property = matches[i].replace(/[\{\}]/g, '');
            let val = this.getHtmlExpressionValue(property.split("."), property.split(".").length, this.data);
            targetDom.innerHTML = targetDom.innerHTML.replace(matches[i], val);
        }
    }

    getHtmlExpressionValue(propChain, totalDepth, data, depth = 0){
        if(totalDepth === depth + 1){
            return data[propChain[depth]];
        } else{
           return this.getHtmlExpressionValue(propChain, totalDepth, data[propChain[depth]], depth + 1);
        }
    }
}

let v = new Vue({
    el :'#app',
    data:{
        user:{
            name:'aaa',
            age:12
        }
    }
});