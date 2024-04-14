/*
Header Comments:
Name: Jaden Parris, Nathaniel Mais
Student ID: 100774161 and 100843860
Date of completion: February 24th, 2024
*/

// Define a TypeScript interface for Project
interface Project {
    image: string;
    title: string;
    description: string;
}

// Class to load and manage project cards
class ProjectLoader {
    private initialProjects: Project[]; // Array to hold initial set of projects
    private additionalProjects: Project[]; // Array to hold additional projects

    constructor() {
        // Initialize with given projects
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

    // Method to dynamically create and append project cards to a given container
    public createProjectCards(projects: Project[], projectsContainer: HTMLElement): void {
        projects.forEach(project => {
            const colDiv: HTMLElement = document.createElement('div');
            colDiv.className = 'col-md-4 mb-4';

            const projectCard: HTMLElement = document.createElement('div');
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

    // Setup the 'Load More' button functionality
    public setupLoadMoreButton(): void {
        const loadMoreButton: HTMLButtonElement | null = document.getElementById('load-more') as HTMLButtonElement;
        const projectsContainer: HTMLElement | null = document.getElementById('projects-container');

        loadMoreButton?.addEventListener('click', () => {
            if (projectsContainer) {
                this.createProjectCards(this.additionalProjects, projectsContainer);
                loadMoreButton.style.display = 'none';
            }
        });
    }

    // Initialize the project loader functionality
    public start(): void {
        const projectsContainer: HTMLElement | null = document.getElementById('projects-container');

        if (projectsContainer) {
            this.createProjectCards(this.initialProjects, projectsContainer);
            this.setupLoadMoreButton();
        }
    }
}

// When the window loads, create an instance of ProjectLoader and call the start method
window.addEventListener("load", () => {
    const projectLoader: ProjectLoader = new ProjectLoader();
    projectLoader.start();
});
