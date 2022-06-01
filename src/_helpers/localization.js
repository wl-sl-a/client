export function changeMenu(){
    {localStorage.getItem('language') == 'uk'? document.getElementById('owners').innerText = 'Клієнти': 'Clients'}
}