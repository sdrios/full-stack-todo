$(document).ready(function () {

    requestAllTodos();

    $("#add-todo").click(function (e) {
        let todoInput = $('#todo-input').val();
        console.log(todoInput);

        if (todoInput == '') {
            alert('Please enter text');
        }
        else {
            $.post('/api/todos', { 'todo': todoInput });
            requestAllTodos();
        }
    });

});

function toggleEdit(id) {
    console.log("clicked:" + id)
    if ($(`#element-${id}`).attr('contenteditable') === 'false') {
        $(`#element-${id}`).attr('contenteditable', 'true');
        $(`#toggle-edit-button-${id}`).html("Save");
        console.log("EDIT MODE")
    }
    else {
        $(`#element-${id}`).attr('contenteditable', 'false');
        $(`#toggle-edit-button-${id}`).html("Edit");
        updateTodo(id);
        console.log("SAVED");
    }
};

function deleteTodo(id) {
    console.log(id);
    $.ajax({
        url: "/api/todos/" + id,
        type: 'DELETE',
        success: function () {
            console.log('successful');
            requestAllTodos();
        }
    });
};

function requestAllTodos() {
    $.get("/api/todos", function (data) {
        $('#todo-display').html(renderTodos(data));
        //console.log(renderTodos(data));
    });
};

function updateTodo(id) {
    let data = $(`#element-${id}`).text();
  
      $.ajax({
        url: "/api/todos/" + id,
        type: 'PUT',
        data: `{'todo':${data}}`,
        success: function () {
            console.log('successful');
            console.log("UDPATED");
            requestAllTodos();
        }
    });

};

function renderTodos(data) {
    let htmlRender = '<ol>';
    data.forEach(element => {
        htmlRender += `<li><span contenteditable="false" id="element-${element.id}">${element.todo}</span><button id="delete-button" onclick="deleteTodo(${element.id})" data-todoId="${element.id}">Delete</button><button id="toggle-edit-button-${element.id}" onclick="toggleEdit(${element.id})">Edit</button></li>`;
    })
    htmlRender += '</ol>';
    return htmlRender;
}

