var cell = [];
var chess_piece = [];
var add_seq = [];
var seq_size = 0;
var end_game_shown = false;
var state = 0;
var clicked_row=-1,clicked_col=-1;
var op_type = "none";
var disable_move = [0,0];

function end_game() {
  document.getElementById("end_game_screen").style.display = "block";
}

function closewindow() {
  document.getElementById("end_game_screen").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("end_game_screen")) {
    document.getElementById("end_game_screen").style.display = "none";
  }
}

function start_game() {
    game_area.start();
    for(var i = 0;i < 9;i++){
        var row = [];
        for(var j = 0;j < 9;j++){
            row.push(new board_cell(45, 45, "#9e998b", j*60+5, i*60+5));
        }
        cell.push(row);
    }
    for(var i = 0;i < 9;i++){
        var chess_row = [];
        for(var j = 0;j < 9;j++){
            chess_row.push(new chess(35,35,"red", j*60+10, i*60+10, "image"));
        }
        chess_piece.push(chess_row);
    }

    //real game part:  getting the start position of things and so
    for(var i = 0;i < 9;i++){
        for(var j = 0;j < 9;j++){
            let btn = document.createElement("button");
                btn.innerHTML = ("(").concat((i+1).toString(),", ",(j+1).toString(),")");
                btn.className = "button";
                btn.dataset.cr = i + 1;
                btn.dataset.cc = j + 1;
                btn.onclick = function () {
                    if(clicked_col != -1){
                        cell[clicked_row-1][clicked_col-1].chosen = false;
                    }
                    clicked_col = btn.dataset.cc;
                    clicked_row = btn.dataset.cr;
                    cell[clicked_row-1][clicked_col-1].chosen = true;
                    document.getElementById("show_choice").innerHTML =  ("Chosen cell: ").concat("(",(clicked_row).toString(),", ",(clicked_col).toString(),")")
                };
                document.getElementById("right_side").appendChild(btn);
        }
        document.getElementById("right_side").appendChild(document.createElement("BR"));
    }
    var show_choice = document.createElement("P");
    show_choice.innerHTML = "Chosen cell: None";
    show_choice.setAttribute("id","show_choice");
    document.getElementById("right_side").appendChild(show_choice);

    var show_op_choice = document.createElement("P");
    show_op_choice.innerHTML = "Chosen operation: None";
    show_op_choice.setAttribute("id","show_op");
    document.getElementById("right_side").appendChild(show_op_choice);

    let upbtn = document.createElement("button");
        upbtn.innerHTML = "Change to UP";
        upbtn.className = "sbigbutton";
        upbtn.onclick = function () {
            op_type = "up";
            document.getElementById("show_op").innerHTML = ("Chosen operation: ").concat(upbtn.innerHTML);
        };
    document.getElementById("right_side").appendChild(upbtn);
    let downbtn = document.createElement("button");
        downbtn.innerHTML = "Change to DOWN";
        downbtn.className = "sbigbutton";
        downbtn.onclick = function () {
            op_type = "down";
            document.getElementById("show_op").innerHTML = ("Chosen operation: Change to DOWN");
        };
    document.getElementById("right_side").appendChild(downbtn);
    let leftbtn = document.createElement("button");
        leftbtn.innerHTML = "Change to LEFT";
        leftbtn.className = "sbigbutton";
        leftbtn.onclick = function () {
            op_type = "left";
            document.getElementById("show_op").innerHTML = ("Chosen operation: Change to LEFT");
        };
    document.getElementById("right_side").appendChild(leftbtn);
    let rightbtn = document.createElement("button");
        rightbtn.innerHTML = "Change to RIGHT";
        rightbtn.className = "sbigbutton";
        rightbtn.onclick = function () {
            op_type = "right";
            document.getElementById("show_op").innerHTML = ("Chosen operation: Change to RIGHT");
        };
    document.getElementById("right_side").appendChild(rightbtn);
    let addbtn = document.createElement("button");
        addbtn.innerHTML = "ADD a piece";
        addbtn.className = "sbigbutton";
        addbtn.onclick = function () {
            op_type = "add";
            document.getElementById("show_op").innerHTML = ("Chosen operation: ADD a piece");
        };
    document.getElementById("right_side").appendChild(addbtn);
    let idlebtn = document.createElement("button");
        idlebtn.innerHTML = "Do nothing (IDLE)";
        idlebtn.className = "bigbutton";
        idlebtn.onclick = function () {
            op_type = "idle";
            document.getElementById("show_op").innerHTML = ("Chosen operation: Do nothing (IDLE)");
        };
    document.getElementById("right_side").appendChild(idlebtn);
    let btn = document.createElement("button");
        btn.innerHTML = "Submit";
        btn.className = "bigbutton";
        btn.onclick = function () {
            do_game_round();
            //window.alert(("(").concat((clicked_row).toString(),", ",(clicked_col).toString(),")"));
        };
    document.getElementById("right_side").appendChild(btn);
    disable_op();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function disable_all(){
    document.querySelectorAll(".button").forEach(e => e.disabled = true);
    document.querySelectorAll(".bigbutton").forEach(e => e.disabled = true);
    document.querySelectorAll(".sbigbutton").forEach(e => e.disabled = true);
}

function enable_all(){
    document.querySelectorAll(".button").forEach(e => e.disabled = false);
    document.querySelectorAll(".bigbutton").forEach(e => e.disabled = false);
    document.querySelectorAll(".sbigbutton").forEach(e => e.disabled = false);
}

function disable_op(){
    document.querySelectorAll(".sbigbutton").forEach(e => e.disabled = true);
}

function enable_op(){
    document.querySelectorAll(".sbigbutton").forEach(e => e.disabled = false);
}

function do_game_round(){
    if(state == 0){
        if(clicked_row != 1){
            window.alert("please choose a cell on the first row");
        }
        else{
            state++;
            add_seq.push([clicked_row-1,clicked_col-1]);
            seq_size++;
            cell[clicked_row-1][clicked_col-1].to_red();
            chess_piece[clicked_row-1][clicked_col-1].appear = true;
            chess_piece[clicked_row-1][clicked_col-1].color = "red";
            chess_piece[clicked_row-1][clicked_col-1].direction = "down";
            document.getElementById("instruction").innerHTML = "Player 2 choose a cell on first row (row,column) as starting chess piece";
            document.getElementById("show_choice").innerHTML = "Chosen cell: None";
            document.getElementById("show_op").innerHTML = ("Chosen operation: None");
            op_type = "none";
            cell[clicked_row-1][clicked_col-1].chosen = false;
            clicked_col = -1, clicked_row = -1;
        }
    }
    else if(state == 1){
        if(clicked_row != 9){
            window.alert("please choose a cell on the last row");
        }
        else{
            state++;
            add_seq.push([clicked_row-1,clicked_col-1]);
            seq_size++;
            cell[clicked_row-1][clicked_col-1].to_blue();
            chess_piece[clicked_row-1][clicked_col-1].appear = true;
            chess_piece[clicked_row-1][clicked_col-1].color = "blue";
            chess_piece[clicked_row-1][clicked_col-1].direction = "up";
            document.getElementById("instruction").innerHTML = "Player 1 choose a cell for the operation";
            document.getElementById("show_choice").innerHTML = "Chosen cell: None";
            document.getElementById("show_op").innerHTML = ("Chosen operation: None");
            op_type = "none";
            cell[clicked_row-1][clicked_col-1].chosen = false;
            clicked_col = -1,clicked_row = -1;
            enable_op();
        }
    }
    else if(state == 2){
        if(disable_move[0] > 0){
            disable_move[0]--;
        }
        if(op_type == "none"){
            window.alert("please choose an operation");
        }
        else if(op_type == "idle"){
            state++;
            document.getElementById("instruction").innerHTML = "Player 2 choose a cell for the operation";
            document.getElementById("show_choice").innerHTML = "Chosen cell: None";
            document.getElementById("show_op").innerHTML = ("Chosen operation: None");
            op_type = "none";
            if(clicked_row != -1) cell[clicked_row-1][clicked_col-1].chosen = false;
            clicked_col = -1,clicked_row = -1;
            if(disable_move[1] == 1){
                disable_op();
                document.getElementById("instruction").innerHTML = "Player 2 added chess piece in previous round, so player 2 must idle this round";
            }
            else{
                enable_op();
            }
        }
        else if(clicked_col == -1){
            window.alert("please choose a cell");
        }
        else if(op_type == "add"){
            let cr = clicked_row-1, cc = clicked_col-1;
            if(cell[cr][cc].colorcode != "R"){
                window.alert("the cell is not red");
            }
            else if(chess_piece[cr][cc].appear == true){
                window.alert("the cell is occupied by another chess piece");
            }
            else{
                disable_move[0] = 1;
                chess_piece[cr][cc].to_red();
                chess_piece[cr][cc].direction = "down";
                chess_piece[cr][cc].appear = true;
                state++;
                add_seq.push([cr,cc]);
                seq_size++;
                document.getElementById("instruction").innerHTML = "Player 2 choose a cell for the operation";
                document.getElementById("show_choice").innerHTML = "Chosen cell: None";
                document.getElementById("show_op").innerHTML = ("Chosen operation: None");
                op_type = "none";
                cell[clicked_row-1][clicked_col-1].chosen = false;
                clicked_col = -1,clicked_row = -1;
                if(disable_move[1] == 1){
                    document.getElementById("instruction").innerHTML = "Player 2 added chess piece in previous round, so player 2 must idle this round";
                    disable_op();
                }
                else{
                    enable_op();
                }
            }
        }
        else{
            let cr = clicked_row-1, cc = clicked_col-1;
            if(chess_piece[cr][cc].appear == true && chess_piece[cr][cc].color == "red"){
                chess_piece[cr][cc].direction = op_type;
                state++;
                document.getElementById("instruction").innerHTML = "Player 2 choose a cell for the operation";
                document.getElementById("show_choice").innerHTML = "Chosen cell: None";
                document.getElementById("show_op").innerHTML = ("Chosen operation: None");
                op_type = "none";
                cell[clicked_row-1][clicked_col-1].chosen = false;
                clicked_col = -1,clicked_row = -1;
                if(disable_move[1] == 1){
                    document.getElementById("instruction").innerHTML = "Player 2 added chess piece in previous round, so player 2 must idle this round";
                    disable_op();
                }
                else{
                    enable_op();
                }
            }
            else{
                window.alert("there is no red chess piece on the cell");
            }
        }
    }
    else if(state == 3){
        if(disable_move[1] == 1){
            disable_op();
        }
        else{
            enable_op();
        }
        if(disable_move[1] > 0) disable_move[1]--;
        if(op_type == "none"){
            window.alert("please choose an operation");
        }
        else if(op_type == "idle"){
            state++;
        }
        else if(clicked_col == -1){
            window.alert("please choose a cell");
        }
        else if(op_type == "add"){
            let cr = clicked_row-1, cc = clicked_col-1;
            if(cell[cr][cc].colorcode != "B"){
                window.alert("the cell is not blue");
            }
            else if(chess_piece[cr][cc].appear == true){
                window.alert("the cell is occupied by another chess piece");
            }
            else{
                state++;
                disable_move[1] = 1;
                add_seq.push([cr,cc]);
                seq_size++;
                chess_piece[cr][cc].to_blue();
                chess_piece[cr][cc].direction = "up";
                chess_piece[cr][cc].appear = true;
            }
        }
        else{
            let cr = clicked_row-1, cc = clicked_col-1;
            if(chess_piece[cr][cc].appear == true && chess_piece[cr][cc].color == "blue"){
                chess_piece[cr][cc].direction = op_type;
                state++;
            }
            else{
                window.alert("there is no blue chess piece on the cell");
            }
        }
    }
    if(state==4){
        document.getElementById("instruction").innerHTML = "Chess pieces moving...";
        document.getElementById("show_choice").innerHTML = "Chosen cell: None";
        document.getElementById("show_op").innerHTML = ("Chosen operation: None");
        op_type = "none";
        if(clicked_col != -1) cell[clicked_row-1][clicked_col-1].chosen = false;
        clicked_col = -1,clicked_row = -1;
        disable_all();
        move_chess();
        enable_all();
        document.getElementById("instruction").innerHTML = "Player 1 choose a cell for operation";
        document.getElementById("show_choice").innerHTML = "Chosen cell: None";
        state=2;
        if(disable_move[0] == 1){
            document.getElementById("instruction").innerHTML = "Player 1 added chess piece in prev round, so player 1 must idle this round";
            disable_op();
        }
        else{
            enable_op();
        }
    }
}

async function move_chess(){
    for(var i = 0; i < seq_size; i++){
        let cr = add_seq[i][0],cc = add_seq[i][1];
        if(chess_piece[cr][cc].direction == "up"){
            if(cr != 0 && chess_piece[cr-1][cc].appear == false){
                chess_piece[cr-1][cc].color = chess_piece[cr][cc].color;
                chess_piece[cr-1][cc].direction = chess_piece[cr][cc].direction
                chess_piece[cr-1][cc].appear = true;
                chess_piece[cr][cc].appear = false;
                if(chess_piece[cr][cc].color == "red"){
                    cell[cr-1][cc].to_red();
                }
                else{
                    cell[cr-1][cc].to_blue();
                }
                add_seq[i][0]--;
                await sleep(1000);
            }
        }
        else if(chess_piece[cr][cc].direction == "down"){
            if(cr != 8 && chess_piece[cr+1][cc].appear == false){
                chess_piece[cr+1][cc].color = chess_piece[cr][cc].color;
                chess_piece[cr+1][cc].direction = chess_piece[cr][cc].direction
                chess_piece[cr+1][cc].appear = true;
                chess_piece[cr][cc].appear = false;
                if(chess_piece[cr][cc].color == "red"){
                    cell[cr+1][cc].to_red();
                }
                else{
                    cell[cr+1][cc].to_blue();
                }
                add_seq[i][0]++;
                await sleep(1000);
            }
        }
        else if(chess_piece[cr][cc].direction == "left"){
            if(cc != 0 && chess_piece[cr][cc-1].appear == false){
                chess_piece[cr][cc-1].color = chess_piece[cr][cc].color;
                chess_piece[cr][cc-1].direction = chess_piece[cr][cc].direction
                chess_piece[cr][cc-1].appear = true;
                chess_piece[cr][cc].appear = false;
                if(chess_piece[cr][cc].color == "red"){
                    cell[cr][cc-1].to_red();
                }
                else{
                    cell[cr][cc-1].to_blue();
                }
                add_seq[i][1]--;
                await sleep(1000);
            }
        }
        else if(chess_piece[cr][cc].direction == "right"){
            if(cc != 8 && chess_piece[cr][cc+1].appear == false){
                chess_piece[cr][cc+1].color = chess_piece[cr][cc].color;
                chess_piece[cr][cc+1].direction = chess_piece[cr][cc].direction
                chess_piece[cr][cc+1].appear = true;
                chess_piece[cr][cc].appear = false;
                if(chess_piece[cr][cc].color == "red"){
                    cell[cr][cc+1].to_red();
                }
                else{
                    cell[cr][cc+1].to_blue();
                }
                add_seq[i][1]++;
                await sleep(1000);
            }
        }
    }
}

var game_area = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 540;
        this.canvas.height = 540;
        this.canvas.className = "gameArea";
        this.context = this.canvas.getContext("2d");
        document.getElementById("left_side").append(this.canvas);
        this.interval = setInterval(update_game_area, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function board_cell(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.chosen = false;
    this.colorcode = "N";

    this.update = function(){
        ctx = game_area.context;
        ctx.fillStyle = color;
        if(this.chosen){
            ctx.fillStyle = "#83eb7a";
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.to_red = function() {
        color = "#c78f8f";
        this.colorcode = "R";
    }

    this.to_blue = function() {
        color = "#90d4cc";
        this.colorcode = "B";
    }
}

function chess(width, height, color, x, y, type) {
    this.type = type
    this.appear = false;
    this.width = width;
    this.height = height;
    this.color = color
    this.x = x;
    this.y = y;
    this.direction = "up";
    if(type == "image"){
        this.image = new Image();
        this.image.src = this.direction.concat(this.color,"chess.png");
    }

    this.update = function(){
        ctx = game_area.context;
        if(this.appear){
            if(type == "image"){
                var new_image_name;
                new_image_name = this.direction.concat(this.color,"chess.png");
                this.image.src = new_image_name;
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
            } else{
                ctx.fillStyle = color;
                ctx.fillRect(this.x,this.y,this.width,this.height);
            }
        }
    }

    this.to_red = function() {
        color = "red";
    }

    this.to_blue = function() {
        color = "blue";
    }
}

function update_game_area(){
    game_area.clear();
    for(var i = 0;i < 9; i++){
        for(var j = 0;j < 9; j++){
            cell[i][j].update();
        }
    }
    for(var i = 0;i < 9; i++){
        for(var j = 0;j < 9; j++){
            chess_piece[i][j].update();
        }
    }
    var s1 = 0,s2 = 0;
    for(var i = 0;i < 9; i++){
        for(var j = 0;j < 9; j++){
            if(cell[i][j].colorcode == "R"){
                s1++;
            }
            else if(cell[i][j].colorcode == "B"){
                s2++;
            }
        }
    }
    document.getElementById("score").innerHTML = ("Score: [Player 1(Red): ").concat(s1.toString()," | Player 2(Blue): ",s2.toString(),"]");
    if(s1+s2 == 81){
        if(end_game_shown == false){
            end_game();
            var tmp = "Winner: Player 1 (Red)";
            if(s2 > s1){
                tmp = "Winner: Player 2 (Blue)";
            }
            document.getElementById("result").innerHTML = tmp;
        }
        end_game_shown = true;
    }
}

function turn_red(r, c){
    cell[r][c].to_red();
}

function turn_blue(r, c){
    cell[r][c].to_blue();
}
