export default class Component {
    $target;
    $props;
    $state; 
    
    constructor ($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
    }

    setup(){}

    mounted(){}

    template(){ return '';}

    render(){
        this.$target.innerHTML = this.template();
        this.mounted();
    }

    setEvent(){}
    
    setState(newState){
        this.$state = { ...this.$state, ...newState };
        this.render();
    }

    //이벤트 버블링 추상화
    addEvent(type, selector, callback){
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);

        this.$target.addEventListener(type, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
        })
    }

}