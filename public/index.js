$(document).ready(function(){
  
    requestAllTodos();

    function requestAllTodos(){
        $.get("/api/todos", function(data){
            $('#todo-display').html(renderTodos(data));
            console.log(renderTodos(data));
        });
    };

    function renderTodos(data){
        let htmlRender = '<ol>';
        data.forEach(element => {
            htmlRender += `<li>${element.todo}<button id="delete-button" onclick="deleteTodo(${element.id})" data-todoId="${element.id}">Delete</button></li>`;
        })
        htmlRender +='</ol>';
        return htmlRender;
    }

$("#add-todo").click(function(e){
       let todoInput = $('#todo-input').val();
       console.log(todoInput);

       if (todoInput == ''){
           alert('Please enter text');
       }

    $.post('/api/todos', {'todo': todoInput});
       requestAllTodos();
});

});



function deleteTodo(id){  
    console.log(id);
    $.ajax({
        URL: "/api/todos/" + id,
        type: 'DELETE',
        success:function(){
            console.log('successful');
        }
    });
};

   

    // $.put("/api/todos/", function(data){
    //     $("#todo-display").html(data);
    // });

    // });