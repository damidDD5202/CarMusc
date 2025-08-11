import { addAnswerQuestion, deleteQuestion, getQuestions } from "../../server/api.js";
import { openModal } from "../modal.js";


const user = JSON.parse(localStorage.getItem('user'));

document.addEventListener('DOMContentLoaded', async function(){
    try{
        const dataQuestion = await getQuestions();
         
        answerQuestion = user?.role == 'admin' ? dataQuestion : filterForUser(dataQuestion);

    }catch(error){
        answerQuestion = answerDataDefault;
    }

    createOrShowAnswer();
})

function filterForUser(data) {
    return data.filter(question => question.answer !== undefined);
}


const answerDataDefault = [
    {
        id: 1,
        question: 'How long does it take to completely wrap a car in film?',
        answer: null
    },
    {
        id: 2,
        question: 'Is it possible to remove the protective film without damaging the factory paint?',
        answer: `Yes, if the film is removed by professionals! \n • Modern materials (for example, XPEL) are removed without leaving any traces, even after 5+ years of use. \n • We use a heat gun and special solutions for gentle detachment. \n • Important: Do not attempt to remove the film yourself — the risk of damaging the paintwork is higher if the film is removed incorrectly.`
    },
    {
        id: 3,
        question: 'Is it possible to remove the protective film without damaging the factory paint?',
        answer: null
    },
    {
        id: 4,
        question: 'Why is ceramic coating better than wax or polishing?',
        answer: null
    }
]

let answerQuestion = [];
let answer = [];
let pages = [];

let lastActiveBox = null;
let lastActivePage = null;

let currentPage = 1;
let itemOnPage = 3;
let countPage = 0;

const imageArrow = '../../assets/icons/arrow.svg';
const nullAnswer = 'There is still no answer to this question';

const answerBox = document.getElementsByClassName('answer-box')[0];
const paggination = document.getElementsByClassName('number-paggination')[0];

function createContainer(content){
    const container = document.createElement('div');
    container.className = 'answer-container';

    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container-text';
    
    const question = document.createElement('p');
    question.className = 'text-demi-s24-h30-l5';
    question.textContent = content.question;

    const image = document.createElement('img');
    image.src = imageArrow;

    let answerOrNot = content.answer ?? nullAnswer;

    const answer = document.createElement('p');
    answer.className = 'text-demi-s20-h30-l5';
    answer.textContent = answerOrNot;

    answerContainer.appendChild(question);
    answerContainer.appendChild(image);

    container.appendChild(answerContainer);
    container.appendChild(answer);

    const inputAnswer = document.createElement('input');
    inputAnswer.placeholder = 'answer';
    inputAnswer.setAttribute('data-i18n-common', `modal.placeholder.answer`);

    const description = document.createElement('p');
    description.classList.add('text-demi-s20-l5');
    description.classList.add('desc');

    if(!content.answer && user?.role == 'admin'){
        const button = document.createElement('button');
        button.className = 'half';
        button.id = `asnwer${content.id}`

        const textButton = document.createElement('p');
        textButton.className = 'text-medium-30';
        textButton.textContent = 'Give an answer';

        const background = document.createElement('span');
        
        button.appendChild(textButton);
        button.appendChild(background);

        button.addEventListener('click', async function(){
            async function myUpdate(){
                try{
                    addAnswerQuestion(content.id, inputAnswer.value);
                    window.location.reload();
                }catch(error){
                    console.log(error);
                }
            }

            openModal('Add answer', 'title.addAnswer', inputAnswer, () => myUpdate());
        })

        container.appendChild(button);
    }

    if(user?.role == 'admin'){
        const button = document.createElement('button');
        button.className = 'half';

        const textButton = document.createElement('p');
        textButton.className = 'text-medium-30';
        textButton.textContent = 'Delete question';

        const background = document.createElement('span');
        
        button.appendChild(textButton);
        button.appendChild(background);

        button.addEventListener('click', async function(){
            async function myUpdate(){
                try{
                    deleteQuestion(content.id);
                    window.location.reload();
                }catch(error){
                    console.log(error);
                }
            }
            description.textContent = 'Do you really want to delete the question?';
            description.setAttribute('data-i18n-common', `modal.description.deleteQuestion`);

            openModal('Delete question', 'title.deleteQuestion', description, () => myUpdate());
        })


        container.appendChild(button);
    }

    container.addEventListener('click', () => {
        if (lastActiveBox) {
            lastActiveBox.classList.remove('active');
        }

        if(lastActiveBox != container){
            lastActiveBox = container;
            container.classList.add('active'); 
        }else{
            lastActiveBox = null;
        }
    });


    return container;
}

function createPaggination(){
    paggination.style.display = 'flex';
    paggination.innerHTML = '';
    
    if(pages.length == 0){
        for(let i = 0; i < countPage; i++){
            const page = document.createElement('button');
            page.className = 'number-paggination-item';
            if(i == 0){
                page.className = 'number-paggination-item active';
                lastActivePage = page;
            }

            const itemText = document.createElement('p');
            itemText.className = 'text-demi-s20-l5';
            itemText.textContent = i + 1;

            page.appendChild(itemText);

            page.addEventListener('click', () => {
                currentPage = i + 1;
                
                lastActivePage.className = 'number-paggination-item';
                page.className = 'number-paggination-item active';

                lastActivePage = page;

                if (lastActiveBox) {
                    lastActiveBox.classList.remove('active');
                    lastActiveBox = null;
                }

                createOrShowAnswer();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                if(countPage > 4) createPaggination();
            })

            pages.push(page);
        }
    }

    if(countPage > 1 && countPage < 5){
        for(let i = 0; i < countPage; i++){
            paggination.appendChild(pages[i]);
        }
    }

    if(countPage > 4){
        paggination.appendChild(pages[0]);

        if(currentPage - 1 == 1 || currentPage == 1){
            paggination.appendChild(pages[1]);
            paggination.appendChild(pages[2]);

            createFree();
        }else{
            if(currentPage + 2 == pages.length || currentPage + 1 == pages.length || currentPage == pages.length){
                createFree();

                paggination.appendChild(pages[pages.length - 3]);
                paggination.appendChild(pages[pages.length - 2]);
            }else{
                createPageActive();
            }
        }   
    
        paggination.appendChild(pages[pages.length - 1]);
    }
}

function createFree(){
    let middleItem = document.createElement('p');
    middleItem.className = 'text-demi-s20-l5';
    middleItem.textContent = '...';

    paggination.appendChild(middleItem);
}

function createPageActive(){
    let middle = countPage / 2  < currentPage ? true : false;

    if(middle) createFree();

    for(let i = -1; i < 1; i++){
        paggination.appendChild(pages[currentPage + i]);
    }

    if(!middle) createFree();
}

function createOrShowAnswer(){
    answerBox.innerHTML = '';

    if(answer.length == 0 || answer.length < answerQuestion.length){
        for(let i = 0; i < answerQuestion.length; i++){
            answer.push(createContainer(answerQuestion[i]));
        }

        countPage = answer.length / itemOnPage;

        if(countPage > 1) createPaggination();
    }

    const startIndex = itemOnPage * currentPage - itemOnPage;
    const endIndex = itemOnPage * currentPage;

    const limitedEndIndex = Math.min(endIndex, answer.length);

    if(answer.length == 0){
        const noServicesMessage = document.createElement('p');
        noServicesMessage.className = 'text-demi-32-l5 no-services-message';
        noServicesMessage.textContent = 'No question available at the moment.';

        answerBox.appendChild(noServicesMessage);
    }else{
        for(let i = startIndex; i < limitedEndIndex; i++){
            answerBox.appendChild(answer[i]);
        }
    }
    

}

function addPage(){

}