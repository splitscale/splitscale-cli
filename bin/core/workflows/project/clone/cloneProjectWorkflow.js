export class CloneProjectWorkflow {
    constructor(projectRepository, gitService, promptService, outputDirectory) {
        this.projectRepository = projectRepository;
        this.gitService = gitService;
        this.promptService = promptService;
        this.outputDirectory = outputDirectory;
    }
    async start() {
        const projects = await this.projectRepository.getAllProjects();
        const selectedProjects = await this.promptService.selectProjects(projects);
        const confirmed = await this.promptService.confirmSelection(`Are you sure you want to clone ${selectedProjects.length} projects?`);
        if (confirmed) {
            console.log('Cloning selected projects...');
            try {
                await this.gitService.cloneProjects(selectedProjects, this.outputDirectory);
            }
            catch (error) {
                console.warn(`Failed to clone projects using isomorphic-git: ${error}`);
                console.log('Trying to clone projects using the CLI...');
                this.gitService.cloneProjectsUsingCli(selectedProjects, this.outputDirectory);
            }
            console.log('Cloning completed.');
        }
        else {
            console.log('Aborting cloning process.');
        }
    }
}
