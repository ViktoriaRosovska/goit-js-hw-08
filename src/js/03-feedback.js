import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector("input"),
    message: document.querySelector("textarea"),
    formBtn: document.querySelector("form button")
} 
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener("input", throttle(onFormInput, 500));
refs.form.addEventListener("submit", onFormSubmit);

saveFormData();

function saveFormData() {

    if (formData) {
        refs.email.value = formData.email ||'';
        refs.message.value = formData.message || '';
    }
}
function onFormSubmit(e) {

    e.preventDefault();
    if ((refs.email.value === "") || (refs.message.value === "")) {
       return alert('Fill all fields of form, please')
    }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
    e.currentTarget.reset();
}

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}



// ------------------------------Change theme, form and button style-------------------------------------
const checkboxLightTheme = document.querySelector('#theme__light');
const checkboxDarkTheme = document.querySelector('#theme__dark');

const theme = {
    light: "lightBlue",
    dark: "#1B586B"
}
if (localStorage.getItem('theme') === null) {
    document.body.style.color = "black";
    checkboxLightTheme.checked = true;
    localStorage.setItem('theme', theme.light);
}

document.body.style.backgroundColor = localStorage.getItem('theme');

if (localStorage.getItem('theme') === theme.light) {
    checkboxLightTheme.checked = true;
    document.body.style.color = "black";
} else if (localStorage.getItem('theme') === theme.dark) {
    checkboxDarkTheme.checked = true;
    document.body.style.color = "white";
}     
 
checkboxLightTheme.addEventListener('change', (e) => {
    if (e.currentTarget.checked) {
        document.body.style.backgroundColor = theme.light;
         document.body.style.color = "black";
        localStorage.setItem('theme', theme.light);
        checkboxDarkTheme.checked = false;
    }
})

checkboxDarkTheme.addEventListener('change', (e) => {
    if (e.currentTarget.checked) {
        document.body.style.backgroundColor = theme.dark;
        localStorage.setItem('theme', theme.dark);
        document.body.style.color = "white";
        checkboxLightTheme.checked = false;
    } 
})

refs.message.classList.add("shadow");
refs.email.classList.add("shadow");

refs.formBtn.addEventListener('click', (e) => {
    e.target.classList.toggle("btnShadow");
    setTimeout(onChangeColorBtn, 300);
});

function onChangeColorBtn() {
    refs.formBtn.classList.toggle("btnShadow");
}