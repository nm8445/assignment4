"use strict";
class ProjectLoader {
    initialProjects;
    additionalProjects;
    constructor() {
        this.initialProjects = [
            {
                image: './pictures/tic.png',
                title: 'Project 1: Tic-Tac-Toe',
                description: 'Engage in the classic Tic Tac Toe game. Simple, fun, and perfect for quick strategic plays.'
            },
            {
                image: './pictures/board.jpg',
                title: 'Project 2: Chess',
                description: 'Experience the grandeur of Chess in a digital format, complete with smart AI opponents.'
            },
            {
                image: './pictures/Minecraft.jpg',
                title: 'Project 3: Minecraft',
                description: 'Explore and build in a Minecraft-like blocky landscape, where creativity meets adventure.'
            }
        ];
        this.additionalProjects = [
            {
                image: './pictures/cod.jpg',
                title: 'Project 4: Call Of Duty',
                description: 'A fast-paced first-person shooter game inspired by Call of Duty, focusing on quick reflexes and strategic gameplay.'
            },
            {
                image: './pictures/Dead-by-Daylight.jpg',
                title: 'Project 5: Dead By Daylight',
                description: 'Navigate a thrilling survival horror scenario inspired by Dead by Daylight, balancing stealth and boldness.'
            },
            {
                image: './pictures/card.png',
                title: 'Project 6: Black Jack',
                description: 'Engage in the timeless card game of Blackjack, featuring a sleek design and intuitive gameplay for all skill levels.'
            }
        ];
    }
    createProjectCards(projects, projectsContainer) {
        projects.forEach(project => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-4';
            const projectCard = document.createElement('div');
            projectCard.className = 'card';
            projectCard.innerHTML = `
        <img class="card-img-top" src="${project.image}" alt="${project.title}">
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
        </div>
      `;
            colDiv.appendChild(projectCard);
            projectsContainer.appendChild(colDiv);
        });
    }
    setupLoadMoreButton() {
        const loadMoreButton = document.getElementById('load-more');
        const projectsContainer = document.getElementById('projects-container');
        loadMoreButton?.addEventListener('click', () => {
            if (projectsContainer) {
                this.createProjectCards(this.additionalProjects, projectsContainer);
                loadMoreButton.style.display = 'none';
            }
        });
    }
    start() {
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            this.createProjectCards(this.initialProjects, projectsContainer);
            this.setupLoadMoreButton();
        }
    }
}
window.addEventListener("load", () => {
    const projectLoader = new ProjectLoader();
    projectLoader.start();
});
//# sourceMappingURL=Main.js.map