//DEFINICION MODELO DE DATOS
interface Task {
    id: number;
    title: string;
    completed: boolean;
    assignedTo: string;
}

// CONSUMO DE API
class TaskService {
    private mockTasks: Task[] = [
        { id: 1, title: "Configurar repositorio Git", completed: true, assignedTo: "Adrian" },
        { id: 2, title: "Integrar firmas XAdES-BES", completed: false, assignedTo: "Adrian" },
        { id: 3, title: "Diseñar vistas de MENTOR", completed: false, assignedTo: "Nicole" }
    ];

    //Simula una peticion GET
    async getTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
             
                //Simulacion con exito
                if (Math.random() > 0.1) {
                    resolve([...this.mockTasks]);
                } else {
                    reject(new Error("Error de conexión con el servidor."));
                }
            }, 1000); 
        });
    }
}