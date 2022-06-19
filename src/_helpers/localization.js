export function changeMenu(){
    {localStorage.getItem('language') == 'uk'? document.getElementById('home').innerText = 'Домашня': 'Home'}
    {localStorage.getItem('language') == 'uk'? document.getElementById('owners').innerText = 'Власники': 'Owners'}
    {localStorage.getItem('language') == 'uk'? document.getElementById('doctors').innerText = 'Лікарі': 'Doctors'}
    {localStorage.getItem('language') == 'uk'? document.getElementById('services').innerText = 'Послуги': 'Services'}
    {localStorage.getItem('language') == 'uk'? document.getElementById('appointments').innerText = 'Записи на прийом': 'Appointments'}
    {localStorage.getItem('language') == 'uk'? document.getElementById('logout').innerText = 'Вийти': 'Logout'}
}