function criarQuadro(){
    const quadros = JSON.parse(localStorage.getItem("quadros")) || [];
    const nome = document.getElementById('nomeQuadro').value;
    if(nome === ""){
        alert("A area não pode estar vazia");
        return;
    }
    for(let i = 0; i < quadros.length; i++){
        if(quadros[i].toString() === nome){
            alert("Já existe um quadro com este nome");
            return;
        }
    }
        quadros.push(nome);
    localStorage.setItem("quadros", JSON.stringify(quadros));
    alert("Novo quadro criado");
}

function botaoNovoQuadro(){
    console.log("clickado");
    const doc = document.getElementById("novoQuadro");

        if(doc.style.display === 'none'){
            doc.style.display = 'flex';
            console.log(" Visivel");
            
        } else if(doc.style.display === "flex"){
            doc.style.display = "none";
            console.log("'invisivel'");
        }
}


    function adicionarTask(){
        const novaTask = document.createElement('div');
        novaTask.className = 'task';
        novaTask.innerHTML = `
            <div class="taskHead" contenteditable="true" oninput="saveData()">Nova Task
                <span class="deleteTask" onclick="removerTask(this)">X</span>
            </div>
            <div class="taskBody" contenteditable="true" oninput="saveData()">Descrição da nova task</div>`;
        document.getElementById('teste').insertAdjacentElement('beforebegin', novaTask);

        saveData();
    }
    document.querySelectorAll('.taskHead, .taskBody').forEach(element => {
        element.setAttribute('contenteditable', 'true');
    });

    function removerTask(element) {
        // Remove a task correspondente
        const task = element.closest('.task');
        task.remove();

        // Atualiza o localStorage
        saveData();
    }

    function saveData() {
        // Seleciona todas as tasks existentes
        const tasks = document.querySelectorAll('.task');
        const taskData = [];

        // Itera sobre as tasks e coleta os dados
        tasks.forEach(task => {
            const taskHead = task.querySelector('.taskHead');
            const taskBody = task.querySelector('.taskBody').innerText;
            // Remove temporariamente o botão "X" para salvar apenas o texto
            const deleteButton = taskHead.querySelector('.deleteTask');
            if (deleteButton) deleteButton.remove();

            const taskHeadText = taskHead.innerText.trim();

            // Adiciona os dados da task ao array
            taskData.push({ title: taskHeadText, description: taskBody });

            // Reinsere o botão "X" no DOM
            if (deleteButton) taskHead.appendChild(deleteButton);
        });

        // Salva os dados no localStorage
        localStorage.setItem('tasks', JSON.stringify(taskData));
    }

    // Carrega as tasks salvas no localStorage ao carregar a página
    window.onload = function () {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            const novaTask = document.createElement('div');
            novaTask.className = 'task';
            novaTask.innerHTML = `
                <div class="taskHead" contenteditable="true" oninput="saveData()">
                    ${task.title}
                    <span class="deleteTask" onclick="removerTask(this)">X</span>
                </div>
                <div class="taskBody" contenteditable="true" oninput="saveData()">${task.description}</div>
            `;
            document.getElementById('teste').insertAdjacentElement('beforebegin', novaTask);
        });
    };
    
