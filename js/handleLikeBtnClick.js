export function handleLikeBtnClick(evt){
    const target = evt.target;
    if(!target.classList.contains('like-btn')) return;

    target.classList.toggle('like-btn_pressed');
}