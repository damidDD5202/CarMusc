import { addQuestion } from "../server/api.js";
import { openModal } from "./modal.js";

const allowedPaths = ['/index.html', '/contacts.html', '/FAQ.html']; // Укажите пути, на которых должен работать скрипт

const currentPath = window.location.pathname;

if (allowedPaths.includes(currentPath)) {
    const user = JSON.parse(localStorage.getItem('user'));

    const textarea = document.querySelector('#questionText');
    const sendButton = document.querySelector('#sendQuestion')

    const description = document.createElement('p');
    description.classList.add('text-demi-s20-l5');
    description.classList.add('desc');
    description.textContent = 'Log in to post a question';

    sendButton.addEventListener('click', async function(){
        if(!user){
            openModal('Error question', description, async () => {
                console.log('Need authorization!')
            });

            return;
        }

        const quest= textarea.value;

        if(quest.length < 10 || quest.length > 500){
            alert('Количество символов в вопросе должны быть от 10 до 500');
        }else{
            await addQuestion(quest);
            textarea.value = '';
            window.location.reload();
        }
    })
}

                