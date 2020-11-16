const openCreateHockeypuckButton = document.getElementById('create_hockeypuck_open_button');
const create_hockeypuck_section = document.getElementById('create_hockeypuck');
const close_cross = document.getElementById('cross');

openCreateHockeypuckButton.addEventListener('click', ()=>{
    create_hockeypuck_section.classList.add('show');
})

close_cross.addEventListener('click', ()=>{
    create_hockeypuck_section.classList.remove('show');
})